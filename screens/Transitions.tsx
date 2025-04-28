import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, StyleGuide, cards } from '../components';

import { AnimatedCard } from '../components/AnimatedCard';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: 'flex-end',
  },
});

export const Transitions = () => {
  const [toggled, setToggle] = useState<boolean>(false);
  // Created Shared Animation value that depends on react State above
  const isToggled = useSharedValue<number>(0);

  // Side Effect on each render that only runs when toggled or isToggled changes
  useEffect(() => {
    // When we toggle the state, also set the animation value to play our animation
    isToggled.value = toggled ? 1 : 0;
  }, [toggled, isToggled]);

  // Create a new animation value based on other animation values using useDerivedValue
  //--Aka, our spring transition animation is dependent on the value of isToggled.
  const transition = useDerivedValue(() => {
    return withSpring(isToggled.value);
  });

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
