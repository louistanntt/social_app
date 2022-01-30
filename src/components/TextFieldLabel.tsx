import React, { useEffect, useMemo, useState, memo } from 'react';
// import {
//   Image,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   StyleSheet,
//   TextInputProps,
//   StyleProp,
//   ViewStyle,
//   TextStyle,
//   NativeSyntheticEvent,
//   TextInputFocusEventData,
//   KeyboardTypeOptions,
// } from 'react-native';
// import colors from '../congfig/colors';

// const ic_eye = require('./icon/eye.png');
// const ic_uneye = require('./icon/uneye.png');
// const ic_close = require('./icon/close.png');

// interface TextFieldLabelProps extends TextInputProps {
//   inputStyle?: StyleProp<TextStyle>;
//   labelStyle?: StyleProp<TextStyle>;
//   placeholderStyle?: StyleProp<TextStyle>;
//   iconStyle?: any;
//   textErrorStyle?: StyleProp<TextStyle>;
//   textError?: string;
//   label?: string;
//   showIcon?: boolean;
//   numeric?: boolean;
//   focusColor?: string;
//   onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
//   onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
//   renderRightIcon?: () => JSX.Element | null | undefined;
//   renderLeftIcon?: () => JSX.Element | null | undefined;
//   value: string;
//   defaultValue?: string;
//   style?: StyleProp<TextStyle>;
//   placeHolder?: string;
//   onChangeText?: (text: string) => void;
//   secureTextEntry?: any;
//   keyboardType?: KeyboardTypeOptions;
//   autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
//   editable?: boolean;
//   multiline?: boolean;
//   isFocus?: boolean;
// }

// const defaultProps = {
//   style: {},
//   value: '',
//   showIcon: true,
//   currency: false,
//   numeric: false,
// };

// const TextFieldLabel = (props: TextFieldLabelProps) => {
//   const {
//     style,
//     // inputStyle,
//     iconStyle,
//     // labelStyle,
//     // placeholderStyle = {},
//     // textErrorStyle,
//     value,
//     label,
//     secureTextEntry,
//     // placeholderTextColor = '#000',
//     // placeholder = '',
//     showIcon,
//     numeric,
//     // textError,
//     // focusColor,
//     // onFocus,
//     // onBlur,
//     onChangeText = (value: string) => {},
//     renderLeftIcon,
//     renderRightIcon,
//     multiline,
//     editable,
//     placeHolder,
//     keyboardType,
//     autoCapitalize,
//     defaultValue,
//     isFocus,
//   } = props;

//   const [text, setText] = useState<string>('');
//   const [onFocusState, setOnFocusState] = useState<boolean>(false);
//   const [textEntry, setTextEntry] = useState<boolean>(secureTextEntry ? true : false);

//   useEffect(() => {
//     if (value) {
//       if (numeric) {
//         setText(formatCurrency(value));
//       } else {
//         setText(value);
//       }
//     } else {
//       setText('');
//     }
//   }, [value]);

//   const formatCurrency = (num: string) => {
//     const values = num.toString().replace(/\D/g, '');
//     return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   };

//   const reConvertCurrency = (x: string) => {
//     let s;
//     s = x.split('.');
//     s = s.join('');
//     return s;
//   };

//   const onChange = (text: string) => {
//     if (numeric) {
//       setText(formatCurrency(text));
//       onChangeText(reConvertCurrency(text));
//     } else {
//       setText(text);
//       onChangeText(text);
//     }
//   };

//   const onChangeTextEntry = () => {
//     setTextEntry(!textEntry);
//   };

//   const _renderRightIcon = () => {
//     if (showIcon) {
//       if (renderRightIcon) {
//         return renderRightIcon();
//       }
//       if (text.length > 0) {
//         if (secureTextEntry) {
//           return (
//             <TouchableOpacity onPress={onChangeTextEntry}>
//               <Image source={textEntry ? ic_eye : ic_uneye} style={[styles.icon, iconStyle]} />
//             </TouchableOpacity>
//           );
//         } else {
//           return (
//             <TouchableOpacity onPress={() => onChange('')}>
//               <Image source={ic_close} style={[styles.icon, iconStyle]} />
//             </TouchableOpacity>
//           );
//         }
//       } else {
//         return null;
//       }
//     }
//     return null;
//   };

//   // const onFocusCustom = (e: any) => {
//   //   setIsFocus(true);
//   //   if (onFocus) {
//   //     onFocus(e);
//   //   }
//   // };

//   // const onBlurCustom = (e: any) => {
//   //   setIsFocus(false);
//   //   if (onBlur) {
//   //     onBlur(e);
//   //   }
//   // };

//   const colorFocus = useMemo(() => {
//     if (onFocusState && isFocus) {
//       return {
//         borderBottomColor: colors.primary,
//         borderTopColor: colors.primary,
//         borderLeftColor: colors.primary,
//         borderRightColor: colors.primary,
//       };
//     } else {
//       return {};
//     }
//   }, [isFocus]);

//   const styleLable: any = useMemo(() => {
//     if (isFocus || (text.length > 0 && label)) {
//       return {
//         top: 5,
//         color: isFocus ? colors.primary : null,
//         // ...labelStyle,
//       };
//     } else {
//       return {
//         position: 'absolute',
//         // ...placeholderStyle,
//       };
//     }
//   }, [isFocus, text]);

//   return (
//     <>
//       <View style={[styles.container, style, colorFocus]}>
//         <View style={[styles.textInput]}>
//           {renderLeftIcon?.()}
//           <View style={{ flex: 1, justifyContent: 'center' }}>
//             {label ? <Text style={[styles.label, styleLable]}>{label}</Text> : null}
//             <TextInput
//               {...props}
//               value={value}
//               defaultValue={defaultValue}
//               style={[
//                 styles.container,
//                 // style,
//                 // {
//                 //   borderColor: onFocusState ? colors.primary : colors.lightGray,
//                 //   borderWidth: 1,
//                 //   backgroundColor: editable ? colors.secondary : 'transparent',
//                 //   color: editable ? colors.gray : colors.white,
//                 // },
//               ]}
//               placeholderTextColor={colors.gray}
//               placeholder={placeHolder}
//               onChangeText={onChangeText}
//               secureTextEntry={secureTextEntry}
//               keyboardType={keyboardType}
//               autoCapitalize={autoCapitalize}
//               editable={editable}
//               onFocus={() => isFocus && setOnFocusState(true)}
//               onBlur={() => isFocus && setOnFocusState(false)}
//               multiline={multiline}
//             />
//           </View>
//           {_renderRightIcon()}
//         </View>
//       </View>
//       {/* {textError ? <Text style={[styles.textError, textErrorStyle]}>{textError}</Text> : null} */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     height: 60,
//   },
//   textInput: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   input: {
//     fontSize: 16,
//     paddingHorizontal: 0,
//     flex: 1,
//   },
//   label: {
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   icon: {
//     width: 20,
//     height: 20,
//   },
//   textError: {
//     color: 'red',
//     fontSize: 14,
//     marginTop: 10,
//   },
//   selectedItem: {
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 0.5,
//     borderColor: 'gray',
//     paddingHorizontal: 8,
//     marginTop: 12,
//     marginRight: 8,
//     flexDirection: 'row',
//   },
//   selectedTextItem: {
//     marginLeft: 5,
//     color: 'gray',
//     fontSize: 16,
//   },
// });

// export default memo(TextFieldLabel);
