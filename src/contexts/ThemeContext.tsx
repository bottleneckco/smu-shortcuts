import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ThemeProvider as ThemeProviderDefault } from 'styled-components';

import { DARK_THEME, LIGHT_THEME } from '../theme';

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
  componentMounted: boolean;
}

const ThemeProvider = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {
    return;
  },
  componentMounted: false,
});

export const ThemeContext: React.FC = (props) => {
  const { children } = props;
  const [userPreferences, setUserPreferences] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setUserPreferences(localTheme);
    } else {
      setUserPreferences('light');
    }
    setComponentMounted(true);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('theme', userPreferences);
  }, [userPreferences]);

  const theme = useMemo(() => {
    switch (userPreferences) {
      // case 'auto':
      //   break;
      case 'dark':
        return 'dark';
      default:
        return 'light';
    }
  }, [userPreferences]);

  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      setUserPreferences('dark');
    } else {
      setUserPreferences('light');
    }
  }, [theme]);

  const currentTheme = useMemo(() => {
    if (theme === 'dark') {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }, [theme]);

  const sharedState = useMemo(
    () => ({ componentMounted, theme, toggleTheme }),
    [componentMounted, theme, toggleTheme]
  );

  return (
    <ThemeProvider.Provider value={sharedState}>
      <ThemeProviderDefault theme={currentTheme}>
        {children}
      </ThemeProviderDefault>
    </ThemeProvider.Provider>
  );
};

export const useDarkMode = (): ThemeContextProps => {
  return useContext(ThemeProvider);
};
