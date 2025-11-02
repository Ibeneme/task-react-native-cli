import React from 'react';
import { Text, TextProps } from 'react-native';

export type FontWeight = 'regular' | 'medium' | 'bold';

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  weight?: FontWeight;
}

const fontMap: Record<FontWeight, string> = {
  regular: 'RethinkSans-Regular',
  medium: 'RethinkSans-Medium',
  bold: 'RethinkSans-Bold',
};

export const AppText: React.FC<AppTextProps> = ({
  children,
  size = 14,
  color = '#000',
  weight = 'regular',
  style,
  ...rest
}) => {
  return (
    <Text
      style={[
        {
          fontFamily: fontMap[weight],
          fontSize: size,
          color,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
