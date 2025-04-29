import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  DerivedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import type { Cards } from '../components';
import { Card, StyleGuide } from '../components';

const { width } = Dimensions.get('window');
const origin = -(width / 2 - StyleGuide.spacing * 2);
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StyleGuide.spacing * 4,
  },
});

interface AnimatedCardProps {
  transition: DerivedValue<any>;
  index: number;
  card: Cards;
}

export const AnimatedCard = ({
  card,
  transition,
  index,
}: AnimatedCardProps) => {
  // If un-toggled, rotation is 0
  //- If Toggled, card Index -1 * 180degrees / 6.... Index of 0 = rotation of -40degrees and so on
  //const rotation = transition ? ((index - 1) * Math.PI) / 6 : 0;
  const style = useAnimatedStyle(() => {
    const rotate = interpolate(
      transition.value,
      [0, 1],
      [0, ((index - 1) * Math.PI) / 6],
    );
    return {
      transform: [
        { translateX: origin },
        { rotate: `${rotate}rad` },
        { translateX: -origin },
      ],
    };
  });
  return (
    <Animated.View key={card} style={[styles.overlay, style]}>
      <Card {...{ card }} />
    </Animated.View>
  );
};
