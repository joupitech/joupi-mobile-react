import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps,
  View
} from 'react-native';
import { colors, typography, buttons } from '../styles/theme';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  loading = false, 
  disabled = false, 
  style, 
  ...props 
}) => {
  // Determine styles based on variant
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primaryButton,
    variant === 'secondary' && styles.secondaryButton,
    variant === 'outline' && styles.outlineButton,
    disabled && styles.disabledButton,
    style
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'outline' && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={buttonStyles}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator 
            color={variant === 'outline' ? colors.primary : colors.white} 
            size="small" 
          />
        ) : (
          <Text style={textStyles}>{title}</Text>
        )}
      </TouchableOpacity>
      {/* Duolingo-style bottom shadow */}
      {!disabled && variant !== 'outline' && (
        <View 
          style={[
            styles.buttonShadow,
            variant === 'primary' && styles.primaryShadow,
            variant === 'secondary' && styles.secondaryShadow,
          ]} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    height: buttons.height,
    borderRadius: buttons.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderBottomWidth: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
    borderBottomWidth: 0,
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.l,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.textDark,
  },
  outlineText: {
    color: colors.primary,
  },
  disabledText: {
    color: colors.gray,
  },
  buttonShadow: {
    height: 6,
    borderBottomLeftRadius: buttons.borderRadius,
    borderBottomRightRadius: buttons.borderRadius,
    marginTop: -5,
    zIndex: -1,
  },
  primaryShadow: {
    backgroundColor: colors.primaryDark,
  },
  secondaryShadow: {
    backgroundColor: '#E5B100', // Darker version of yellow
  },
});

export default Button; 