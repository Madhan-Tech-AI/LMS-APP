import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { testConnection } from '../lib/testConnection';

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    testConnection();
    setShowContent(true);
    const timer = setTimeout(() => {
      router.push('/role-selection');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/736x/21/99/09/219909939e543b3022ca5c926a7c0d78.jpg' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02462D',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});