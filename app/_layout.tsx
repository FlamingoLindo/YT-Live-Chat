import { baseColors } from '@/consts/colors';
import { useTheme } from '@/hooks/useTheme';
import { Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function StackLayout() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? baseColors.darkBg : baseColors.lightBg;

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <SafeAreaProvider>
        <StatusBar 
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={bgColor}
          translucent={false}
        />
        <Stack 
          screenOptions={{
            headerShown: false,
          }} 
        />
      </SafeAreaProvider>
    </View>
  );
}