import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import ArrowLeftIcon from '../../components/app_icons/arrow_icons/arrow_left';
import DarkModeIcon from '../../components/app_icons/theme_icons/dark_mode_icon';
import LightModeIcon from '../../components/app_icons/theme_icons/light_mode_icon';
import { useTheme } from '../../contexts/ThemeProvider';
import { RADIUS, SPACING } from '../../constants/spacing_and_radius';


interface HeaderProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ step, totalSteps, onBack }) => {
  const { colors, theme, toggleTheme } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[
          styles.backButton,
          { backgroundColor: colors.background, opacity: step === 1 ? 0.4 : 1 },
        ]}
        onPress={onBack}
        disabled={step === 1}
        activeOpacity={0.7}
      >
        <ArrowLeftIcon size={14} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.progressWrapper}>
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressStep,
                { backgroundColor: i < step ? colors.primary : colors.fadedWhite },
              ]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.themeButton}
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        {theme === 'light' ? (
          <DarkModeIcon size={18} color={colors.text} />
        ) : (
          <LightModeIcon size={28} color={colors.text} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: SPACING.huge,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  progressWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 140,
    gap: SPACING.sm,
  },
  progressStep: { flex: 1, height: 4, borderRadius: 50 },
  themeButton: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});