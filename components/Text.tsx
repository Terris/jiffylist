import { ReactNode } from 'react';
import { Text as PrimitiveText, TextProps as PrimitiveTextProps, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface TextProps extends PrimitiveTextProps {
  children: ReactNode;
  bold?: boolean;
  italic?: boolean;
  color?: string;
}

function Text({ children, bold, italic, color, style }: TextProps) {
  return (
    <PrimitiveText
      style={[
        bold && italic
          ? styles.boldItalicText
          : bold
          ? styles.boldText
          : italic
          ? styles.italicText
          : styles.text,
        { color: color ?? colors.black },
        style,
      ]}
    >
      {children}
    </PrimitiveText>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans_400Regular',
    fontWeight: '400',
  },
  italicText: {
    fontFamily: 'OpenSans_400Regular_Italic',
    fontWeight: '400',
  },
  boldText: {
    fontFamily: 'OpenSans_700Bold',
    fontWeight: '700',
  },
  boldItalicText: {
    fontFamily: 'OpenSans_700Bold_Italic',
    fontWeight: '700',
  },
});

export default Text;
