import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '../app_texts/app_text';
import { darkColors, lightColors } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/spacing_and_radius';

const { lg } = RADIUS;
const spacing = SPACING;

export interface PrimaryButtonProps {
  title: string | React.ReactNode;
  onPress?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  borderRadius?: number;
  testID?: string;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  theme?: 'light' | 'dark';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  outlined = false,
  borderRadius = lg,
  testID = 'button-wrapper',
  iconRight,
  style,
  theme = 'light',
}) => {
  const colors = theme === 'dark' ? darkColors : lightColors;
  const buttonDisabled = disabled || isLoading;

  return (
    <Pressable
      testID={testID}
      accessibilityState={{ disabled: buttonDisabled }}
      disabled={buttonDisabled}
      onPress={!buttonDisabled ? onPress : undefined}
      style={({ pressed }) => [
        styles.base,
        outlined
          ? { borderWidth: 1.5, borderColor: colors.primary }
          : { backgroundColor: colors.primary },
        buttonDisabled && styles.disabled,
        { borderRadius },
        pressed && !buttonDisabled && styles.pressed,
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator testID="activity-indicator" color={colors.surface} />
      ) : (
        <View style={styles.content}>
          {typeof title === 'string' ? (
            <AppText
              size={16}
              weight="medium"
              color={outlined ? colors.primary : colors.white}
            >
              {title}
            </AppText>
          ) : (
            title
          )}
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2], // spacing.sm = 8
  },
  iconRight: {
    marginLeft: spacing[2],
  },
});

export default PrimaryButton;
