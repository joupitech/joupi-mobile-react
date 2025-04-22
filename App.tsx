import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/services/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { colors } from './src/styles/theme';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
} 