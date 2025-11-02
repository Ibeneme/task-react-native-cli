import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AppText } from '../../components/app_texts/app_text';
import CheckedIcon from '../../components/app_icons/checked_icons/checked_icon';
import UncheckedIcon from '../../components/app_icons/checked_icons/non_checked_icon';
import { useTheme } from '../../contexts/ThemeProvider';
import { RADIUS, SPACING } from '../../constants/spacing_and_radius';
import { GOALS } from '../../constants/data';

interface Step1GoalProps {
  selectedGoal: string | null;
  onSelectGoal: (id: string) => void;
}

const Step1Goal: React.FC<Step1GoalProps> = ({
  selectedGoal,
  onSelectGoal,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <AppText style={[styles.stepCount, { color: colors.textSecondary }]}>
        Step 1 / 3
      </AppText>
      <AppText style={[styles.title, { color: colors.text }]}>
        Tell us your goal
      </AppText>
      <AppText style={[styles.subtitle, { color: colors.textSecondary }]}>
        This will help us personalize your experience.
      </AppText>

      <View style={styles.goalsList}>
        {GOALS.map(goal => {
          const isSelected = selectedGoal === goal.id;
          return (
            <TouchableOpacity
              key={goal.id}
              style={[
                styles.goalItem,
                {
                  backgroundColor: isSelected
                    ? colors.surface
                    : colors.background,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onSelectGoal(goal.id)}
              activeOpacity={0.8}
            >
              {isSelected ? (
                <CheckedIcon size={20} color={colors.primary} />
              ) : (
                <UncheckedIcon size={20} color={colors.textSecondary} />
              )}
              <AppText
                style={[
                  styles.goalLabel,
                  { color: isSelected ? colors.primary : colors.text },
                ]}
              >
                {goal.label}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Step1Goal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  stepCount: { fontSize: 12, fontWeight: '500', marginBottom: SPACING.xxl },
  title: { fontSize: 22, fontWeight: '700', marginBottom: SPACING.sm },
  subtitle: { fontSize: 15, marginBottom: SPACING.xl },
  goalsList: { gap: SPACING.md },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    gap: SPACING.md,
  },
  goalLabel: { fontSize: 15, flex: 1 },
});
