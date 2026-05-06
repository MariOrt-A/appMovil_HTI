import { useColorScheme } from 'react-native';

export interface ThemeColors {
  background: string;
  text: string;
  card: string;
  border: string;
  primary: string;
  secondary: string;
}

export const lightTheme: ThemeColors = {
  background: '#f5f5f5',
  text: '#1a1a1a',
  card: '#ffffff',
  border: '#e0e0e0',
  primary: '#4CAF50',
  secondary: '#2196F3',
};

export const darkTheme: ThemeColors = {
  background: '#121212',
  text: '#ffffff',
  card: '#1e1e1e',
  border: '#333333',
  primary: '#66BB6A',
  secondary: '#42A5F5',
};

export const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  return { colors, isDark: colorScheme === 'dark' };
};