import * as React from "react";

export interface CommonControlledStateProps<T, Rest extends unknown[] = unknown[]> {
	value?: T;
	defaultValue?: T;
	onChange?: (value: T, ...args: Rest) => void;
}

export function useControlledState<T, Rest extends unknown[] = unknown[]>(
	props: CommonControlledStateProps<T, Rest> & { defaultValue: T },
): readonly [T, (next: T, ...args: Rest) => void];
export function useControlledState<T, Rest extends unknown[] = unknown[]>(
	props: CommonControlledStateProps<T, Rest>,
): readonly [T | undefined, (next: T, ...args: Rest) => void];
export function useControlledState<T, Rest extends unknown[] = unknown[]>(
	props: CommonControlledStateProps<T, Rest>,
): readonly [T | undefined, (next: T, ...args: Rest) => void] {
	const { value, defaultValue, onChange } = props;

	const [state, setInternalState] = React.useState<T | undefined>(
		value !== undefined ? value : defaultValue,
	);

	React.useEffect(() => {
		if (value !== undefined) setInternalState(value);
	}, [value]);

	const setState = React.useCallback(
		(next: T, ...args: Rest) => {
			setInternalState(next);
			onChange?.(next, ...args);
		},
		[onChange],
	);

	return [state, setState] as const;
}
