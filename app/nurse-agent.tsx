import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function VoiceAgent() {
  // States to track agent status
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  
  // Animated values for pulsing effect
  const pulseAnimation = new Animated.Value(1);
  
  // Toggle listening state
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setIsSpeaking(true);
    } else {
      setIsListening(true);
      setIsSpeaking(false);
    }
  };
  
  // Upload photo function
  const handleUploadPhoto = () => {
    console.log('Upload photo pressed');
    // Here you would implement photo upload logic
  };
  
  // Handle pulsing animation
  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isListening]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen 
        options={{
          title: 'Voice Assistant',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerShadowVisible: false,
        }}
      />
      
      <View style={styles.container}>
        {/* Status text */}
        <Text style={styles.statusText}>
          {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready'}
        </Text>
        
        {/* Voice visualization/button */}
        <View style={styles.voiceContainer}>
          <Animated.View 
            style={[
              styles.pulseCircle, 
              {
                transform: [{ scale: pulseAnimation }],
                backgroundColor: isListening ? '#4285F4' : isSpeaking ? '#34A853' : '#DADCE0',
              }
            ]} 
          />
          
          <TouchableOpacity 
            style={[
              styles.voiceButton,
              { backgroundColor: isListening ? '#4285F4' : '#FFFFFF' }
            ]} 
            onPress={toggleListening}
            activeOpacity={0.8}
          >
            <FontAwesome 
              name={isListening ? "stop" : "microphone"} 
              size={30} 
              color={isListening ? "#FFFFFF" : "#4285F4"} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Last conversation message */}
        {conversation.length > 0 && (
          <View style={styles.conversationContainer}>
            <Text style={styles.conversationText}>
              {conversation[conversation.length - 1]}
            </Text>
          </View>
        )}
        
        {/* Upload photo button */}
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleUploadPhoto}
          activeOpacity={0.8}
        >
          <MaterialIcons name="add-photo-alternate" size={28} color="#4285F4" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 40,
    color: '#5f6368',
  },
  voiceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.3,
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
  conversationContainer: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxWidth: 350,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  conversationText: {
    fontSize: 16,
    color: '#202124',
    lineHeight: 22,
  },
  uploadButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
