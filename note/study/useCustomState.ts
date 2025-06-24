// const [state, setState] = useState(initValue);

// realtime state update -> rendering(component)
// state update -> component re-rendering

export const useCustomState = <T>(initValue: T) => {
  let state = initValue;

  const getState = () => state;

  const setState = (newState: T) => {
    state = newState;
  }

  return [getState, setState];
}
