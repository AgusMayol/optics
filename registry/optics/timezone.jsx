"use client";

import * as React from "react";
import ms from "ms";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/registry/optics/tooltip";
import { Button } from "@/registry/optics/button";
import { cn } from '@/registry/optics/lib/utils';

// Constantes de tiempo calculadas una vez para evitar recálculos
const ONE_SECOND = ms("1s");
const ONE_MINUTE = ms("1m");
const ONE_HOUR = ms("1h");
const ONE_DAY = ms("1d");

function Timezone({
	timestamp,
	asChild = false,
	children,
	className,
	side,
	sideOffset,
	...props
}) {
	const [userTimezone, setUserTimezone] = React.useState(null);
	const [formattedUserTime, setFormattedUserTime] = React.useState("");
	const [formattedUtcTime, setFormattedUtcTime] = React.useState("");
	const [relativeTime, setRelativeTime] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);
	const [copiedButton, setCopiedButton] = React.useState(null);
	const [isExiting, setIsExiting] = React.useState(false);

	// Memoizar los formatters para evitar recrearlos en cada render
	const utcFormatter = React.useMemo(
		() =>
			new Intl.DateTimeFormat("en-US", {
				timeZone: "UTC",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}),
		[],
	);

	const userFormatter = React.useMemo(
		() =>
			userTimezone
				? new Intl.DateTimeFormat("en-US", {
						timeZone: userTimezone,
						year: "numeric",
						month: "short",
						day: "numeric",
						hour: "numeric",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					})
				: null,
		[userTimezone],
	);

	React.useEffect(() => {
		// Obtener el huso horario del usuario de manera no invasiva
		if (typeof window !== "undefined") {
			const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			setUserTimezone(timeZone);
		}
	}, []);

	// Función para actualizar los valores de tiempo
	const updateTimeValues = React.useCallback(() => {
		if (!timestamp || !userTimezone || !userFormatter) return;

		// Convertir timestamp a Date
		// Acepta: string ISO (timestampz), número en milisegundos, o número en segundos
		let date;
		if (typeof timestamp === "string") {
			// String ISO (timestampz) o timestamp en string
			date = new Date(timestamp);
		} else if (typeof timestamp === "number") {
			// Si es menor a 1e12, asumimos que está en segundos y lo convertimos a milisegundos
			// Si es mayor o igual, asumimos que ya está en milisegundos
			date = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
		} else {
			date = new Date(timestamp);
		}

		// Validar que la fecha sea válida
		if (isNaN(date.getTime())) {
			setFormattedUserTime("Invalid date");
			setFormattedUtcTime("Invalid date");
			setRelativeTime("Invalid date");
			return;
		}

		// Formatear fecha en UTC
		setFormattedUtcTime(utcFormatter.format(date));

		// Formatear fecha en la zona horaria del usuario
		setFormattedUserTime(userFormatter.format(date));

		// Calcular tiempo relativo usando constantes precalculadas
		const now = new Date();
		const diffInMs = date.getTime() - now.getTime();
		const absDiffInMs = Math.abs(diffInMs);
		const isPast = diffInMs < 0;
		const direction = isPast ? "ago" : "in";

		let relative;

		// Si está dentro de los minutos (< 1 hora), mostrar minutos y segundos
		if (absDiffInMs < ONE_HOUR) {
			const minutes = Math.floor(absDiffInMs / ONE_MINUTE);
			const remainingMs = absDiffInMs % ONE_MINUTE;
			const seconds = Math.floor(remainingMs / ONE_SECOND);

			if (seconds > 0 && minutes > 0) {
				// Mostrar minutos y segundos
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				const secondsStr = ms(seconds * ONE_SECOND, { long: true });
				relative = `${minutesStr} ${secondsStr} ${direction}`;
			} else if (minutes > 0) {
				// Solo minutos
				relative = `${ms(minutes * ONE_MINUTE, { long: true })} ${direction}`;
			} else {
				// Solo segundos
				relative = `${ms(absDiffInMs, { long: true })} ${direction}`;
			}
		}
		// Si está dentro de las horas (< 24 horas), mostrar horas y minutos
		else if (absDiffInMs < ONE_DAY) {
			const hours = Math.floor(absDiffInMs / ONE_HOUR);
			const remainingMs = absDiffInMs % ONE_HOUR;
			const minutes = Math.floor(remainingMs / ONE_MINUTE);

			if (minutes > 0) {
				// Mostrar horas y minutos
				const hoursStr = ms(hours * ONE_HOUR, { long: true });
				const minutesStr = ms(minutes * ONE_MINUTE, { long: true });
				relative = `${hoursStr} ${minutesStr} ${direction}`;
			} else {
				// Solo horas
				relative = `${ms(hours * ONE_HOUR, { long: true })} ${direction}`;
			}
		}
		// Para otros casos, usar el string completo de ms
		else {
			relative = `${ms(absDiffInMs, { long: true })} ${direction}`;
		}

		setRelativeTime(relative);
	}, [timestamp, userTimezone, userFormatter, utcFormatter]);

	// Actualizar cuando cambian timestamp o userTimezone
	React.useEffect(() => {
		updateTimeValues();
	}, [updateTimeValues]);

	// Actualizar en tiempo real mientras el tooltip esté abierto
	React.useEffect(() => {
		if (!isOpen) return;

		// Actualizar inmediatamente
		updateTimeValues();

		// Configurar intervalo para actualizar cada segundo
		const interval = setInterval(() => {
			updateTimeValues();
		}, 1000);

		// Limpiar intervalo cuando el tooltip se cierre
		return () => {
			clearInterval(interval);
		};
	}, [isOpen, updateTimeValues]);

	// Función para copiar al portapapeles
	const copyToClipboard = React.useCallback(async (text, buttonId) => {
		if (
			!text ||
			text === "—" ||
			text === "Invalid date" ||
			text === "Loading..."
		) {
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			setIsExiting(false);
			setCopiedButton(buttonId);
			// Iniciar animación de salida después de 1.5 segundos
			setTimeout(() => {
				setIsExiting(true);
				// Resetear el estado después de la animación de salida (300ms)
				setTimeout(() => {
					setCopiedButton(null);
					setIsExiting(false);
				}, 300);
			}, 1500);
		} catch (err) {
			console.error("Error al copiar al portapapeles:", err);
		}
	}, []);

	return (
		<TooltipProvider>
			<Tooltip open={isOpen} onOpenChange={setIsOpen}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className={cn(className, "p-1")}
					side={side}
					sideOffset={sideOffset}
					{...props}
				>
					<div className="w-full flex flex-col gap-0.5 py-0 ">
						<Button
							variant="ghost"
							size="sm"
							className="font-normal"
							animation="colors"
							onClick={() => copyToClipboard(formattedUserTime, "user")}
						>
							<div className="w-full flex text-center justify-start gap-2 text-xs">
								<div className="text-start text-muted-foreground w-40">
									{userTimezone || "Loading..."}
								</div>
								<p
									className={cn(
										"tabular-nums font-mono transition-all duration-300",
										copiedButton === "user"
											? isExiting
												? "opacity-0 scale-95"
												: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
											: "opacity-100 scale-100",
									)}
								>
									{copiedButton === "user"
										? "Copied!"
										: formattedUserTime || "—"}
								</p>
							</div>
						</Button>

						<Button
							variant="ghost"
							size="sm"
							className="font-normal"
							animation="colors"
							onClick={() => copyToClipboard(formattedUtcTime, "utc")}
						>
							<div className="w-full flex text-center justify-start gap-2 text-xs">
								<div className="text-start text-muted-foreground w-40">UTC</div>
								<p
									className={cn(
										"tabular-nums font-mono transition-all duration-300",
										copiedButton === "utc"
											? isExiting
												? "opacity-0 scale-95"
												: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
											: "opacity-100 scale-100",
									)}
								>
									{copiedButton === "utc" ? "Copied!" : formattedUtcTime || "—"}
								</p>
							</div>
						</Button>

						<Button
							variant="ghost"
							size="sm"
							className="font-normal z-10"
							animation="colors"
							onClick={() => copyToClipboard(relativeTime, "relative")}
						>
							<div className="w-full flex text-center justify-start gap-2 text-xs">
								<div className="text-start text-muted-foreground w-40">
									Relative
								</div>
								<p
									className={cn(
										"tabular-nums font-mono transition-all duration-300",
										copiedButton === "relative"
											? isExiting
												? "opacity-0 scale-95"
												: "opacity-100 scale-100 animate-in fade-in-0 zoom-in-95"
											: "opacity-100 scale-100",
									)}
								>
									{copiedButton === "relative"
										? "Copied!"
										: relativeTime || "—"}
								</p>
							</div>
						</Button>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export { Timezone };
