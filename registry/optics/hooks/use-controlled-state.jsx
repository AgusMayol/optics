import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useControlledState(props) {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState(value !== undefined ? value : (defaultValue));

  React.useEffect(() => {
    if (value !== undefined) setInternalState(value);
  }, [value]);

  const setState = React.useCallback((next, ...args) => {
    setInternalState(next);
    onChange?.(next, ...args);
  }, [onChange]);

  return [state, setState];
}
