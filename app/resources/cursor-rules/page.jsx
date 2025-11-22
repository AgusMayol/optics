"use client";
import { Button } from "@/registry/agusmayol/button";
import { cn } from "@/lib/utils";

import { ArrowLeft, Sparkle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GridContainer, GridRow, GridItem } from "@/registry/agusmayol/grid";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/registry/agusmayol/card";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/registry/agusmayol/accordion";
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from "@/registry/agusmayol/code-block";

export default function Page() {
	const code = [
		{
			language: "mdc",
			filename: "general.mdc",
			code: '---\ndescription: Reglas generales para todos los prompts\nglobs: *\nalwaysApply: true\n---\n# Reglas Generales\n\n## Principios de Trabajo\n- Tus respuestas serán siempre en español, mientras que el código será escrito en inglés o en idioma del proyecto.\n- El código escrito y los archivos serán siempre en JavaScript, y nunca en TypeScript (A no ser que el usuario lo indique explícitamente)\n- Siempre seguir los requerimientos del usuario al pie de la letra.\n- Pensar paso a paso: describir el plan en pseudocódigo antes de codificar.\n- Confirmar el enfoque antes de escribir código.\n- El código debe estar completo, finalizado, sin TODOs ni piezas faltantes.\n- Usar nombres claros, en camelCase para variables y funciones.\n- Preferir código legible y mantenible por sobre el rendimiento.\n- Minimizar la prosa. El foco está en el código.\n- Nombrar archivos nuevos en kebab-case.\n- Usar `const` para valores fijos y `let` si hay dudas. Nunca usar `var`.\n- El contenido visible por el usuario debe estar adaptado al idioma del proyecto (ej. español para Argentina).\n\n## Buenas Prácticas\n- Usar principios DRY (Don\'t Repeat Yourself).\n- Minimizar uso innecesario de variables.\n- Dividir componentes grandes en mini-componentes reutilizables.\n- Siempre prever errores de ejecución y errores humanos (capa 8).\n- Incorporar medidas de ciberseguridad tanto en frontend como backend.\n- Si no se conoce la respuesta, decirlo sin adivinar.\n\n## Paquetes y Dependencias\n- Siempre usar **Bun** como manejador de paquetes preferido.\n\n## Accesibilidad\n- Implementar features de accesibilidad (ej: `tabindex`, `aria-label`, `onKeyDown`).\n\n## NUNCA NUNCA\n- Nunca inicies un servidor dev o build a no ser que el usuario te lo haya pedido implicitamente.\n- Nunca ejecutes npm run dev, npm start, o el equivalente a cualquier comando "start" o "build". El servidor de desarrollo ya se encuentra ejecutandose en el ordenador del usuario que hace la consulta; correr otro servidor ya sea dev o build podría romper el servidor de desarrollo.',
		},
		{
			language: "mdc",
			filename: "frontend.mdc",
			code: "---\ndescription: Reglas para el desarrollo Frontend\nglobs: *.js, *.jsx, *.ts, *.tsx\nalwaysApply: false\n---\n# Reglas de Frontend\n\n## Lenguajes y Frameworks\n- Experto en ReactJS, NextJS, JavaScript, HTML, CSS, TailwindCSS, Shadcn, Radix.\n- Usar solo JavaScript salvo que el usuario indique TypeScript.\n- Priorizar el uso de TailwindCSS para el estilado. No usar archivos CSS separados.\n- Para condicionales de clases usar `class:` en lugar de operador ternario.\n\n## Estructura de Código\n- Usar `const` arrow functions para definir funciones (`const handleClick = () => {}`).\n- Usar nombres descriptivos pero breves para funciones y estados.\n- Los handlers deben tener prefijo `handle` (ej: `handleClick`, `handleSubmit`).\n- Optimizar el uso de `useState` para minimizarlo.\n- Usar `useEffect` con validaciones y condiciones específicas.\n- Validar siempre `window` antes de usarlo en apps con SSR (ej. Next.js).\n\n## Estándares React\n- Usar `async/await` y manejar errores con `try/catch`.\n- En errores, notificar al usuario con **sonner** u otro sistema de alertas.\n- Usar early returns para simplificar la lógica de componentes.\n- Dividir el componente en varios más pequeños si crece mucho.\n- Mantener el código lo más limpio y funcional posible.\n\n## UI/UX\n- Preferir el uso de Radix y Shadcn para componentes accesibles y personalizables.\n- Asegurarse de que los textos, botones y flujos sean intuitivos y localizados.\n- Prever errores del usuario y guiarlo con mensajes claros.",
		},
		{
			language: "mdc",
			filename: "backend.mdc",
			code: "---\ndescription: Reglas para el desarrollo Backend\nglobs: *.js, *.jsx, *.ts, *.tsx\nalwaysApply: false\n---\n# Reglas de Backend\n\n## Principios Generales\n- Manejar todos los errores posibles con `try/catch`.\n- Validar siempre los datos entrantes y salientes.\n- Usar middlewares para control de errores y seguridad.\n- Seguir principios KISS (Keep It Simple, Stupid) y SOLID cuando corresponda.\n- No exponer datos sensibles por defecto (ej. passwords, tokens, etc).\n- Deshabilitar headers innecesarios para evitar filtración de tecnología.\n\n## Seguridad\n- Sanitizar siempre inputs del usuario.\n- Validar la autenticación y autorización antes de cada operación crítica.\n- Prevenir ataques comunes (XSS, CSRF, SQL Injection, etc.).\n- Usar HTTPS obligatorio y CORS controlado.\n- Evitar `console.log` en producción, preferir sistemas de logs robustos.\n\n## Buenas Prácticas\n- Mantener funciones puras siempre que sea posible.\n- Documentar endpoints y sus respuestas esperadas.\n- Usar códigos de estado HTTP correctamente.\n- Si un endpoint puede fallar, documentar claramente los posibles errores.\n\n## Estructura\n- Dividir lógicamente el código: controladores, servicios, middlewares, rutas.\n- Separar lógica de negocio del controlador.\n- Usar nombres de funciones descriptivos y concisos.",
		},
		{
			language: "mdc",
			filename: "use-bun-instead-of-node-vite-npm-pnpm.mdc",
			code: '---\ndescription: Use Bun instead of Node.js, npm, pnpm, or vite.\nglobs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"\nalwaysApply: false\n---\n\nDefault to using Bun instead of Node.js.\n\n- Use `bun <file>` instead of `node <file>` or `ts-node <file>`\n- Use `bun test` instead of `jest` or `vitest`\n- Use `bun dev` instead of `npm run dev`\n- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`\n- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`\n- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`\n- Bun automatically loads .env, so don\'t use dotenv.\n\n## Testing\n\nUse `bun test` to run tests.',
		},
	];

	return (
		<main className="min-h-[calc(100vh-128px)] screen flex flex-col flex-1 gap-8 bg-background rounded-b-3xl lg:rounded-bl-none">
			<div className="flex flex-col gap-4 p-6 lg:p-12 pb-0">
				<h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
					Cursor Rules
				</h1>
				<p className="text-muted-foreground text-base lg:text-xl">
					A set of rules that can be used to make Cursor more efficient.
				</p>
			</div>
			<div className="flex flex-col flex-1 gap-8 p-6 lg:p-12 bg-background">
				{code.map((itemCode, index) => (
					<Card className="pt-0 pb-0 bg-background" key={itemCode.filename}>
						<CardFooter className="px-0 py-0 bg-background rounded-xl">
							{/* Component Code */}
							<Accordion type={"single"} collapsible className="w-full">
								<AccordionItem
									value={itemCode.filename}
									className="rounded-b-xl"
								>
									<AccordionTrigger
										className="px-4 py-4 flex-row-reverse items-center justify-end [&>svg]:rotate-270 [&[data-state=open]>svg]:rotate-360 	hover:no-underline hover:cursor-pointer [data-state=open]:border-b rounded-none"
										showArrow
									>
										{itemCode.filename}
									</AccordionTrigger>
									<AccordionContent
										className="border-b-0 border-x-0 border-t pb-0 shadow-none"
										keepRendered
									>
										<CodeBlock
											data={code}
											defaultValue={itemCode.filename}
											className="border-none rounded-none rounded-b-xl shadow-none group"
										>
											<CodeBlockHeader className="border-0 absolute right-0 z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-150 ease-in-out bg-transparent">
												<CodeBlockCopyButton
													onCopy={() => console.log("Copied code to clipboard")}
													onError={() =>
														console.error("Failed to copy code to clipboard")
													}
												/>
											</CodeBlockHeader>
											<CodeBlockBody>
												{(item) => (
													<CodeBlockItem
														key={"codeblock-" + item.filename}
														value={item.filename}
													>
														<CodeBlockContent
															language={item.language}
															className="bg-sidebar"
														>
															{item.code}
														</CodeBlockContent>
													</CodeBlockItem>
												)}
											</CodeBlockBody>
										</CodeBlock>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
