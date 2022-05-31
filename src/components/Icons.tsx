import React from 'react';
import { ColorValue } from 'react-native';
import Ant from 'react-native-vector-icons/AntDesign';
import En from 'react-native-vector-icons/Entypo';
import Fe from 'react-native-vector-icons/Feather';
import Fa from 'react-native-vector-icons/FontAwesome';
import Io from 'react-native-vector-icons/Ionicons';
import Md from 'react-native-vector-icons/MaterialCommunityIcons';
import Ma from 'react-native-vector-icons/MaterialIcons';

Ant.loadFont();
En.loadFont();
Fe.loadFont();
Fa.loadFont();
Io.loadFont();
Md.loadFont();
Ma.loadFont();

type IconProps = {
  name: string;
  size?: number;
  color?: ColorValue | number;
  children?: any;
};

const AntIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Ant name={name} color={color} size={size} />;
};

const EnIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <En name={name} color={color} size={size} />;
};

const FeIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Fe name={name} color={color} size={size} />;
};

const FaIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Fa name={name} color={color} size={size} />;
};

const IoIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Io name={name} color={color} size={size} />;
};

const MdIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Md name={name} color={color} size={size} />;
};

const MaIcon = (props: IconProps) => {
  const { name, color, size } = props;
  return <Ma name={name} color={color} size={size} />;
};

export { AntIcon, EnIcon, FeIcon, FaIcon, IoIcon, MdIcon, MaIcon };
