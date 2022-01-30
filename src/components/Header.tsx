import React, { memo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import colors from '../config/colors';

type HeaderProps = {
  leftComponent?: React.ReactNode;
  centerComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  leftContainerStyle?: StyleProp<ViewStyle>;
  centerContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
};

const Header = (props: HeaderProps) => {
  const {
    leftComponent,
    centerComponent,
    rightComponent,
    leftContainerStyle,
    centerContainerStyle,
    rightContainerStyle,
    style,
  } = props;
  return (
    <View style={[styles.header, style]}>
      <View
        style={[
          styles.container,
          { alignSelf: 'flex-start', justifyContent: 'flex-start', paddingLeft: 5 },
          leftContainerStyle,
        ]}
      >
        {leftComponent && leftComponent}
      </View>
      <View
        style={[
          styles.container,
          { alignSelf: 'center', justifyContent: 'center' },
          centerContainerStyle,
        ]}
      >
        {centerComponent && centerComponent}
      </View>
      <View
        style={[
          styles.container,
          { alignSelf: 'flex-end', justifyContent: 'flex-end', paddingRight: 5 },
          rightContainerStyle,
        ]}
      >
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    zIndex: 10,
    height: 50,
    backgroundColor: 'transparent',
    borderBottomWidth: 3,
    borderBottomColor: colors.test,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default memo(Header);
