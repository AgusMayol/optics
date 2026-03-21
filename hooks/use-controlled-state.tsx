import * as React from "react";

type UseControlledStateProps<Value, Args extends unknown[] = []> = {
	value?: Value;
	defaultValue?: Value;
	onChange?: (next: Value, ...args: Args) => void;
};

export function useControlledState<Value, Args extends unknown[] = []>({
	value,
	defaultValue,
	onChange,
}: UseControlledStateProps<Value, Args>) {
	const isControlled = value !== undefined;
	const [uncontrolledState, setUncontrolledState] = React.useState<
		Value | undefined
	>(defaultValue);
	const state = isControlled ? value : uncontrolledState;

	const setState = React.useCallback(
		(next: Value, ...args: Args) => {
			if (!isControlled) {
				setUncontrolledState(next);
			}
			onChange?.(next, ...args);
		},
		[isControlled, onChange],
	);

	return [state, setState] as const;
}
