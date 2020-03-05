import { Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState } from 'react';

const useScroll = (
  maxScrollValue = 100,
  endTranslateY = -200,
  endRotation = '-40deg',
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): [any, (ev: NativeSyntheticEvent<NativeScrollEvent>) => void] => {
  const [frame] = useState<Animated.Value>(new Animated.Value(1));

  const scrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const value = event.nativeEvent.contentOffset.y;
    if (value < maxScrollValue) {
      frame.setValue(1 - value / maxScrollValue);
    } else {
      frame.setValue(0);
    }
  };

  const style = {
    transform: [
      {
        translateY: frame.interpolate({
          inputRange: [0, 1],
          outputRange: [endTranslateY, 0],
        }),
      },
      {
        rotate: frame.interpolate({
          inputRange: [0, 1],
          outputRange: [endRotation, '0deg'],
        }),
      },
    ],
    opacity: frame.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [0, 1, 1],
    }),
  };

  return [style, scrollEvent];
};

export default useScroll;
