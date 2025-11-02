import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { AppText } from '../../components/app_texts/app_text';
import ArrowRightIcon from '../../components/app_icons/arrow_icons/arrow_right';
import CheckedIcon from '../../components/app_icons/checked_icons/checked_icon';
import { SearchIcon } from '../../components/app_icons/search_icons/search_icon';
import { useTheme } from '../../contexts/ThemeProvider';
import { RADIUS, SPACING } from '../../constants/spacing_and_radius';
import { CURRENCIES } from '../../constants/data';

interface Step3CurrencyProps {
  selectedCurrency: string;
  onSelectCurrency: (code: string) => void;
}

const Step3Currency: React.FC<Step3CurrencyProps> = ({
  selectedCurrency,
  onSelectCurrency,
}) => {
  const { colors, theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedData = CURRENCIES.find(c => c.code === selectedCurrency);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return CURRENCIES;
    const q = searchQuery.toLowerCase();
    return CURRENCIES.filter(
      c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <>
      <View style={styles.container}>
        <AppText style={[styles.stepCount, { color: colors.textSecondary }]}>
          Step 3 / 3
        </AppText>
        <AppText style={[styles.title, { color: colors.text }]}>
          Choose your currency
        </AppText>
        <AppText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Select the currency you’d like to use primarily.
        </AppText>

        <TouchableOpacity
          style={[
            styles.currencyInput,
            { backgroundColor: colors.background, borderColor: colors.border },
          ]}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <AppText style={styles.flag}>{selectedData?.flag ?? 'Flag'}</AppText>
          <View style={{ flex: 1 }}>
            <AppText style={[styles.currencyText, { color: colors.text }]}>
              {selectedCurrency}
            </AppText>
          </View>
          <ArrowRightIcon size={14} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <BlurView
          style={styles.blur}
          blurType={theme === 'light' ? 'light' : 'dark'}
          blurAmount={10}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.blur} />
          </TouchableWithoutFeedback>

          <View style={[styles.modal, { backgroundColor: colors.background }]}>
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                },
              ]}
            >
              <SearchIcon size={16} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search currency..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <AppText
                    style={{ color: colors.textSecondary, fontSize: 18 }}
                  >
                    ×
                  </AppText>
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filtered}
              keyExtractor={item => item.code}
              renderItem={({ item }) => {
                const isSelected = selectedCurrency === item.code;
                return (
                  <TouchableOpacity
                    style={[
                      styles.currencyOption,
                      {
                        backgroundColor: isSelected
                          ? colors.surface
                          : 'transparent',
                        borderColor: isSelected
                          ? colors.primary
                          : 'transparent',
                        borderWidth: isSelected ? 1 : 0,
                        borderRadius: RADIUS.md,
                      },
                    ]}
                    onPress={() => {
                      onSelectCurrency(item.code);
                      setModalVisible(false);
                      setSearchQuery('');
                    }}
                    activeOpacity={0.7}
                  >
                    <AppText style={styles.flag}>{item.flag}</AppText>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <AppText
                        style={[
                          styles.currencyName,
                          {
                            color: colors.text,
                            fontWeight: isSelected ? '600' : '400',
                          },
                        ]}
                      >
                        {item.name}
                      </AppText>
                      <AppText
                        style={[
                          styles.country,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {item.country}
                      </AppText>
                    </View>
                    <View style={styles.rightSection}>
                      <AppText
                        style={[
                          styles.abbrev,
                          {
                            color: isSelected
                              ? colors.primary
                              : colors.textSecondary,
                            fontWeight: isSelected ? '600' : '400',
                          },
                        ]}
                      >
                        {item.code}
                      </AppText>
                      {isSelected && (
                        <CheckedIcon
                          size={18}
                          color={colors.primary}
                          style={{ marginTop: 4 }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={{ height: SPACING.sm }} />
              )}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: SPACING.xxl }}
            />
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default Step3Currency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.xxxl,
  },
  stepCount: { fontSize: 12, fontWeight: '500', marginBottom: SPACING.xxl },
  title: { fontSize: 22, fontWeight: '700', marginBottom: SPACING.sm },
  subtitle: { fontSize: 15, marginBottom: SPACING.xl },
  currencyInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    gap: 10,
  },
  flag: { fontSize: 24 },
  currencyText: { fontSize: 16, fontWeight: '600' },
  currencyNameText: { fontSize: 13, marginTop: 2 },
  blur: { flex: 1, justifyContent: 'flex-end' },
  modal: {
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: SPACING.xxl,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginBottom: SPACING.lg,
  },
  searchInput: { flex: 1, marginLeft: SPACING.sm, fontSize: 15 },
  currencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
  },
  currencyName: { fontSize: 16 },
  country: { fontSize: 13, marginTop: 2 },
  abbrev: { fontSize: 14, fontWeight: '600', textAlign: 'right' },
  rightSection: { alignItems: 'flex-end', minWidth: 60 },
});
