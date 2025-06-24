/// Create custom useEffect 
/// useEffect -> side effect
/// when this component render? 1. mount 2. update 3. unmount

/// form
// case1. useEffect(() => {}); // when rendering

// case2. useEffect(() => {}, []); // when mount

// case3. useEffect(() => {}, [value]); // when value update

// case4. useEffect(() => {
//  animation();
//  subscription();
//  return () => {
//    animation.cancel();
//    subscription.unsubscribe();
//  }
// }, []); // when unmount

export const useCustomEffect = <T>(callback: () => void, dependencies?: T[]) => {
  let init = true;
  let prevDependencies: T[] = [];
  
  if (dependencies) {
    if (dependencies.length === 0) {
      if (init) {
        // case2
        init = false;
        callback();
      }
    } else {
      // case3
      for (let i = 0; i < dependencies.length; i++) {
        if (dependencies[i] !== prevDependencies[i]) {
          prevDependencies = dependencies;
          callback();
          break;
        }
      }
    }
  } else {
    // case1
    callback();
  }

  // if (unmount) {
  //   const result = callback();
  //   return result;
  // }
};