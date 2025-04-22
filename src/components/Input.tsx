import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps,
  TouchableOpacity
} from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  secureTextEntry = false,
  style, 
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const inputStyles = [
    styles.input,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    style
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor={colors.gray}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Text style={styles.eyeIconText}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
  },
  label: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.m,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    fontSize: typography.fontSize.m,
    fontFamily: typography.fontFamily.regular,
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  inputFocused: {
    borderColor: colors.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontSize: typography.fontSize.s,
    fontFamily: typography.fontFamily.medium,
    color: colors.error,
    marginTop: spacing.xs,
  },
  eyeIcon: {
    position: 'absolute',
    right: spacing.m,
    top: 0,
    height: '100%',
    justifyContent: 'center',
  },
  eyeIconText: {
    fontSize: typography.fontSize.l,
  },
});

export default Input; 