import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';



const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately and auto-navigate after 5 seconds
    setShowContent(true);
    const timer = setTimeout(() => {
      router.push('/role-selection');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    router.push('/role-selection');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Video
        source={{ uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4' }}
        style={styles.backgroundVideo}
        shouldPlay
        isLooping
        isMuted
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        {showContent && (
          <View style={styles.content}>
            <Text style={styles.collegeName}>
              GOJAN SCHOOL OF BUSINESS
            </Text>
            <Text style={styles.collegeNameSecond}>
              AND TECHNOLOGY
            </Text>
            
            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.startButtonText}>Start</Text>
              <ChevronRight size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  collegeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  collegeNameSecond: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  startButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});