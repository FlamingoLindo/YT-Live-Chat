import { getThemeColors } from '@/consts/colors';
import { useColorScheme } from 'react-native';

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const colors = getThemeColors(isDarkMode);

  return { isDarkMode, colors };
};
