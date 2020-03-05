import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Button, Easing, ScrollView } from 'react-native';
// eslint-disable-next-line import/extensions
import useScroll from './hooks/useScroll';

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
  const [scrollStyle, onScroll] = useScroll(100, -200, '-30deg');

  const setFrame = (value: number): void => {
    Animated.timing(fadeAnim, {
      toValue: value,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };

  useEffect(() => {
    setFrame(1);    
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
      <ScrollView
        style={{ width: '100%' }}
        onScroll={onScroll}
      >
        <View style={styles.container}>
          <View style={{ height: 300 }} />
          <Animated.View style={otherStyles.animatedView}>
            <Animated.View style={scrollStyle}>
              <Text style={styles.content}>Ejemplo de contenido</Text>
            </Animated.View>
          </Animated.View>
          <View style={{ height: 100 }} />
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
          <View style={{ height: 600 }} />
        </View>
      </ScrollView>
    </View>
  );
}
