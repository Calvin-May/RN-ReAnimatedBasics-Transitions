import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import type { WithTimingConfig } from 'react-native-reanimated';

const useTransition = (
  animationValue: SharedValue<number>,
  config?: WithTimingConfig,
) => {
  const transition = useDerivedValue(() => {
    return withTiming(animationValue.value, config);
  });

  return transition;
};

export { useTransition };
