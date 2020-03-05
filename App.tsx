import React, { useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

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
  }
});

export default function App(): JSX.Element {
  const [fadeAnim] = useState<Animated.Value>(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.content}>Ejemplo de contenido</Text>
      </Animated.View>
    </View>
  );
}
