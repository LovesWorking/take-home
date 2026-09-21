import { ActivityIndicator } from 'react-native';
import { useTheme } from '@/theme/use-theme';

export function LoadingState() {
  const { colors, spacing } = useTheme();
  return <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.primary} />;
}
