import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthContext } from '../services/AuthContext';
import { AuthStackParamList } from '../navigation/AppNavigator';
import Button from '../components/Button';
import Input from '../components/Input';
import { colors, spacing, typography } from '../styles/theme';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateInputs = () => {
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      await signIn(email, password);
      // If we reach here, login was successful and AppNavigator will redirect to Home
    } catch (error) {
      Alert.alert('Login Error', 'Incorrect email or password');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            {/* Replace with your logo */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>JOUPI</Text>
            </View>
            <Text style={styles.tagline}>Transform exercise into fun!</Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Email"
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />

            <Input
              label="Password"
              placeholder="Your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />

            <Button
              title="SIGN IN"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => {/* Implement password recovery */}}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register')}
              style={styles.registerButton}
            >
              <Text style={styles.registerButtonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.l,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  logoText: {
    color: colors.white,
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.extraBold,
  },
  tagline: {
    fontSize: typography.fontSize.l,
    fontFamily: typography.fontFamily.medium,
    color: colors.textDark,
    textAlign: 'center',
  },
  formContainer: {
    marginVertical: spacing.l,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: spacing.m,
  },
  forgotPasswordText: {
    color: colors.blue,
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.medium,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: spacing.l,
  },
  footerText: {
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.regular,
    color: colors.darkGray,
    marginBottom: spacing.s,
  },
  registerButton: {
    padding: spacing.s,
  },
  registerButtonText: {
    color: colors.blue,
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.bold,
  },
});

export default LoginScreen; 