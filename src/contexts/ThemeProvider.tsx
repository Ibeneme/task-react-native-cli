import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';
import { lightColors, darkColors, ThemeColors } from '../constants/colors';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = '@ui:theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = Appearance.getColorScheme() as Theme; 
  const [theme, setTheme] = useState<Theme>(systemTheme || 'light');

  const colors = theme === 'light' ? lightColors : darkColors;

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') {
          setTheme(saved);
        } else if (systemTheme) {
          setTheme(systemTheme);
        }
      } catch (e) {
        console.warn('Failed to load theme:', e);
      }
    })();
  }, [systemTheme]);

  // Automatically update if system theme changes (optional)
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(prev => {
        // Only change if user hasn’t manually overridden
        if (!prev) return colorScheme as Theme;
        return prev;
      });
    });

    return () => listener.remove();
  }, []);

  const saveTheme = useCallback(async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme:', e);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  }, [theme, saveTheme]);

  const setThemeValue = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
      saveTheme(newTheme);
    },
    [saveTheme],
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        setTheme: setThemeValue,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
