import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View, Button, Easing } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#000',
    color: '#ff3',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
});

export default function App(): JSX.Element {
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));
  const [rotateValue] = useState<Animated.Value>(new Animated.Value(0));

  const setFrame = (value: number): void => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  React.useEffect(() => {
    setFrame(1);
    Animated.timing(rotateValue, {
      toValue: 200,
      duration: 100000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);

  const otherStyles = {
    animatedView: {
      opacity: fadeAnim,
      transform: [
        {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-200, -150, 0],
          }),
        },
      ],
    },
  };

  return (
    <View style={styles.container}>
      <Animated.View style={otherStyles.animatedView}>
        <Animated.View
          style={{
            transform: [
              {
                translateX: fadeAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [-200, -150, 0],
                }),
                rotate: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['-40deg', '0deg'],
                }),
              },
            ],
          }}
        >
          <Text style={styles.content}>Ejemplo de contenido</Text>
        </Animated.View>
      </Animated.View>
      <Button
        title="Entra"
        onPress={(): void => {
          setFrame(1);
        }}
      />
      <Button
        title="Medio"
        onPress={(): void => {
          setFrame(0.5);
        }}
      />
      <Button
        title="Sal"
        onPress={(): void => {
          setFrame(0);
        }}
      />
    </View>
  );
}
