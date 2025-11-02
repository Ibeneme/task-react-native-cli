import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AppText } from '../../components/app_texts/app_text';
import { useTheme } from '../../contexts/ThemeProvider';
import { RADIUS, SPACING } from '../../constants/spacing_and_radius';


interface Step2UsernameProps {
  username: string;
  onChangeUsername: (text: string) => void;
}

const Step2Username: React.FC<Step2UsernameProps> = ({
  username,
  onChangeUsername,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <AppText style={[styles.stepCount, { color: colors.textSecondary }]}>
        Step 2 / 3
      </AppText>
      <AppText style={[styles.title, { color: colors.text }]}>
        Set up your profile
      </AppText>
      <AppText style={[styles.subtitle, { color: colors.textSecondary }]}>
        Choose a unique username to personalize your experience.
      </AppText>

      <View style={styles.inputContainer}>
        <AppText style={[styles.inputLabel, { color: colors.textSecondary }]}>
          Username
        </AppText>
        <View
          style={[
            styles.usernameInputWrapper,
            { borderColor: colors.border, backgroundColor: colors.background },
          ]}
        >
          <AppText style={[styles.atSymbol, { color: colors.textSecondary }]}>
            @
          </AppText>
          <TextInput
            style={[styles.usernameInput, { color: colors.text }]}
            value={username}
            onChangeText={onChangeUsername}
            placeholder="username"
            placeholderTextColor={colors.textSecondary}
            maxLength={15}
            autoCapitalize="none"
          />
        </View>
        <AppText style={[styles.charCount, { color: colors.textSecondary }]}>
          {username.length}/15
        </AppText>
      </View>
    </View>
  );
};

export default Step2Username;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  stepCount: { fontSize: 12, fontWeight: '500', marginBottom: SPACING.xxl },
  title: { fontSize: 22, fontWeight: '700', marginBottom: SPACING.sm },
  subtitle: { fontSize: 15, marginBottom: SPACING.xl },
  inputContainer: { marginTop: SPACING.xl },
  inputLabel: { marginBottom: SPACING.sm, fontSize: 14 },
  usernameInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  atSymbol: { fontSize: 16, marginRight: 4 },
  usernameInput: { flex: 1, fontSize: 16 },
  charCount: { alignSelf: 'flex-end', marginTop: 4, fontSize: 12 },
});
