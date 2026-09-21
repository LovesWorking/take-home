import { colors, spacing } from '@take-home/shared';
import { ActivityIndicator } from 'react-native';

export function LoadingState() {
  return <ActivityIndicator style={{ marginTop: spacing.xxl }} color={colors.primary} />;
}
