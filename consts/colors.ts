export const baseColors = {
  darkBg: '#0f0f0f',
  darkBg2: '#1e1e1e',
  darkBg3: '#2e2e2e',
  darkBgAlt: '#2a2a2a',
  lightBg: '#ffffff',
  darkText: '#ffffff',
  lightText: '#000000',
  lightGray: '#e0e0e0',
  darkGray: '#7f7f7f',
};

export const superChatColors = {
  red: 'red',
  blue: 'blue',
  yellow: '#c8d600',
  green: 'green',
};

export const accentColors = {
  active: '#FF0000',
  success: 'green',
  warning: '#c8d600',
};

export const getThemeColors = (isDarkMode: boolean) => ({
  background: isDarkMode ? baseColors.darkBg3 : baseColors.lightBg,
  icon: isDarkMode ? baseColors.darkText : baseColors.lightText,
  text: isDarkMode ? baseColors.darkText : baseColors.lightText,
  separator: isDarkMode ? baseColors.darkBg : baseColors.lightBg,
  badge: isDarkMode ? baseColors.darkBg2 : baseColors.lightBg,
  active: accentColors.active,
});

export const getRandomSuperChatColor = (): string => {
  const colors = Object.values(superChatColors);
  return colors[Math.floor(Math.random() * colors.length)];
};
