import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, typography } from '../styles/theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>JOUPI</Text>
      </View>
      <Text style={styles.tagline}>Transform exercise into fun!</Text>
      <ActivityIndicator 
        size="large" 
        color={colors.primary} 
        style={styles.loader} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: colors.white,
    fontSize: 40,
    fontFamily: typography.fontFamily.extraBold,
  },
  tagline: {
    fontSize: typography.fontSize.l,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen; 