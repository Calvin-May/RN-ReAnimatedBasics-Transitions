import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, StyleGuide, cards } from '../components';

import { AnimatedCard } from '../components/AnimatedCard';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSpring } from '../hooks/animation/useSpring';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'flex-end',
  },
});

export const Transitions = () => {
  const [toggled, setToggle] = useState<boolean>(false);
  const transition = useSpring(toggled);

  return (
    <View style={styles.container}>
      {cards.slice(0, 3).map((card, index) => (
        <AnimatedCard key={card} {...{ index, card, transition }} />
      ))}
      <Button
        label={toggled ? 'Reset' : 'Start'}
        primary
        onPress={() => setToggle((prev) => !prev)}
      />
    </View>
  );
};
