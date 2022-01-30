import React from 'react';
// import { StyleProp, ViewStyle } from 'react-native';
// import Toast, { ToastConfig } from 'react-native-toast-message';

// export default function ToastSettings() {
//   const toastStyle: StyleProp<ViewStyle> = {
//     height: '100%',
//     marginHorizontal: 15,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 5,
//     alignSelf: 'center',
//   };

//   const toastConfig: ToastConfig = {
//     success: ({ text1, props, ...rest }) => (
//       <Button opacity={0.9} onPress={() => Toast.hide()} style={{ width: '100%' }}>
//         <Block middle center style={[toastStyle, { backgroundColor: '#4285f4' }]}>
//           <Text center color="white" style={{ zIndex: 3 }}>
//             {text1}
//           </Text>
//         </Block>
//       </Button>
//     ),
//     error: ({ text1, props, ...rest }) => (
//       <Button
//         opacity={0.9}
//         onPress={() => {
//           Toast.hide();
//           dispatch(act.general.setReFetch(true));
//         }}
//         style={{ width: '100%' }}
//       >
//         <Block middle center style={[toastStyle, { backgroundColor: '#ff3547' }]}>
//           <Text center color="white" style={{ zIndex: 3 }}>
//             {text1}
//           </Text>
//         </Block>
//       </Button>
//     ),
//     info: ({ text1, props, ...rest }) => (
//       <Button opacity={0.9} onPress={() => Toast.hide()} style={{ width: '100%' }}>
//         <Block middle center style={[toastStyle, { backgroundColor: '#ffa000' }]}>
//           <Text center color="white" style={{ zIndex: 3 }}>
//             {text1}
//           </Text>
//         </Block>
//       </Button>
//     ),
//     notify: ({ text1, text2, props, ...rest }) => (
//       <Button
//         opacity={1}
//         onPress={() => {
//           Toast.hide();
//           if (APP_NAME === 'back_office') {
//             dispatch(act.general.setNotifyInApp({ ...notifyInApp, active: true }));
//           }
//         }}
//         style={{ width: '100%' }}
//       >
//         <Block
//           shadow
//           style={[
//             {
//               backgroundColor: 'rgba(250, 250, 250, .97)',
//               width: width - 20 <= 400 ? width - 20 : 380,
//               borderRadius: 20,
//               marginLeft: 10,
//               marginTop: -5,
//             },
//           ]}
//         >
//           <Block row middle space="between" paddingVertical={7} paddingHorizontal={10}>
//             <Block row middle>
//               <Image
//                 source={require('../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
//                 pure
//                 style={{ width: 24, height: 24 }}
//               />
//               <Text style={{ marginLeft: 5 }}>{appNameString}</Text>
//             </Block>
//             <Text color={$gray2} size={12}>
//               {i18n.t('NOW')}
//             </Text>
//           </Block>
//           <Block style={{ padding: 13, paddingTop: 0 }}>
//             <Text weight="bold" color="black" size={15} style={{ zIndex: 3, marginBottom: 3 }}>
//               {text1}
//             </Text>
//             <Text style={{ zIndex: 3 }}>{text2}</Text>
//           </Block>
//         </Block>
//       </Button>
//     ),
//   };

//   return (
//     <Toast
//       topOffset={isIphoneX() ? statusBarHeight + 10 : 20}
//       config={toastConfig}
//       ref={ref => Toast.setRef(ref)}
//     />
//   );
// }
