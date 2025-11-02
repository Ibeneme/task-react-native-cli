import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeProvider';
import Header from '../../components/custom_headers/Header';
import Step1Goal from '../../templates/auth/step_a';
import Step2Username from '../../templates/auth/step_b';
import Step3Currency from '../../templates/auth/step_c';
import PrimaryButton from '../../components/app_buttons/primary_button';

const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 48,
  pill: 999,
};

const OnboardingSteps = () => {
  const { colors } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const canContinue =
    (step === 1 && selectedGoal) ||
    (step === 2 && username.trim().length > 0) ||
    (step === 3 && selectedCurrency);

  return (
    <View
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
    >
      <Header step={step} totalSteps={totalSteps} onBack={handleBack} />

      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
        }}
      >
        {step === 1 && (
          <Step1Goal
            selectedGoal={selectedGoal}
            onSelectGoal={setSelectedGoal}
          />
        )}
        {step === 2 && (
          <Step2Username username={username} onChangeUsername={setUsername} />
        )}
        {step === 3 && (
          <Step3Currency
            selectedCurrency={selectedCurrency}
            onSelectCurrency={setSelectedCurrency}
          />
        )}
      </View>

      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <PrimaryButton
          title={step < totalSteps ? 'Continue' : 'Finish'}
          onPress={handleNext}
          disabled={!canContinue}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default OnboardingSteps;

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%', paddingTop: 48 },
  container: {
    position: 'absolute',
    bottom: SPACING.huge,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.xxl,
  },
  button: { borderRadius: RADIUS.pill, width: '100%' },
});
