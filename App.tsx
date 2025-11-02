import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ThemeProvider, useTheme } from './src/contexts/ThemeProvider';
import OnboardingSteps from './src/app/auth_pages/app';

const App = () => {
  return (
    <ThemeProvider>
      <OnboardingSteps />
    </ThemeProvider>
  );
};

export default App;
