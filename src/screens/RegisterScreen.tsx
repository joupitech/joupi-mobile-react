import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
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

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const { signUp } = useContext(AuthContext);
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const validateInputs = () => {
    let isValid = true;
    
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
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

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;
    
    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert(
        'Account created successfully',
        'You can now log in with your credentials.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Registration Error', 'Could not create your account. Please try again.');
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Create your account</Text>
            <Text style={styles.headerSubtitle}>
              Join thousands of people who are already transforming physical activities into fun
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input
              label="Name"
              placeholder="Your full name"
              value={name}
              onChangeText={setName}
              error={nameError}
            />

            <Input
              label="Email"
              placeholder="Your best email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />

            <Input
              label="Password"
              placeholder="Create a strong password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmPasswordError}
            />

            <Button
              title="SIGN UP"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Use</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
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
  backButton: {
    marginBottom: spacing.m,
  },
  backButtonText: {
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.medium,
    color: colors.blue,
  },
  headerContainer: {
    marginBottom: spacing.xl,
  },
  headerTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.textDark,
    marginBottom: spacing.s,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.regular,
    color: colors.darkGray,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: spacing.l,
  },
  footerContainer: {
    marginTop: 'auto',
    paddingTop: spacing.l,
  },
  footerText: {
    fontSize: typography.fontSize.s,
    fontFamily: typography.fontFamily.regular,
    color: colors.darkGray,
    textAlign: 'center',
  },
  linkText: {
    color: colors.blue,
    fontFamily: typography.fontFamily.medium,
  },
});

export default RegisterScreen; 