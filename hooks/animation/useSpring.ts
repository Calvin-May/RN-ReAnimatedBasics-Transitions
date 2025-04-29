import { useEffect } from 'react';
import {
  useSharedValue,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import type { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

const useSpring = (state: number | boolean, config?: SpringConfig) => {
  // Created Shared Animation value that depends on react State above
  const animationValue = useSharedValue<number>(0);

  // Side Effect on each render that only runs when toggled or isToggled changes
  useEffect(() => {
    // When we toggle the state, also set the animation value to play our animation
    animationValue.value = typeof state === 'number' ? state : state ? 1 : 0;
  }, [state, animationValue]);

  // Create a new animation value based on other animation values using useDerivedValue
  //--Aka, our spring transition animation is dependent on the value of isToggled.
  const transition = useDerivedValue(() => {
    return withSpring(animationValue.value, config);
  });

  return transition;
};

export { useSpring };
