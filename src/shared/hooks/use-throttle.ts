"use client";

import { useRef } from "react";

export const useThrottle = (callback: () => void, delay: number = 1000) => {
  const lastExecutionTime = useRef<number>(Date.now());

  return () => {
    const timeElapsed = Date.now() - lastExecutionTime.current;

    if (timeElapsed < delay) return;

    callback();

    lastExecutionTime.current = Date.now();
  };
};
