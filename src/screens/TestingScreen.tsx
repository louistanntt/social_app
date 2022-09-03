import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheet, Button, Toast, DatePicker, Modalize, PieTesting, TestPie } from '../components';
import FloatingButton from '../components/FloatingButton';
import { AntIcon } from '../components/Icons';
import colors from '../config/colors'
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import  PieChart  from '../components/Chart/PieChart'
import Svg, { G, Path, Line, Circle } from 'react-native-svg'
import { Text as TextSVG } from 'react-native-svg'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


interface TestingScreenProps {}

const TestingScreen: React.FC<TestingScreenProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());
  const { statusBarHeight } = useDeviceInfo()
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  // const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  // const pieData = data
  //     .filter((value) => value > 0)
  //     .map((value, index) => ({
  //         value,
  //         svg: {
  //             fill: randomColor(),
  //             onPress: () => console.log('press', index),
  //         },
  //         key: `pie-${index}`,
  //     }))

  const data = [
    {
        key: 1,
        amount: 50,
        svg: { fill: '#600080' },
        arc: {
          cornerRadius: 5
        }
    },
    {
        key: 2,
        amount: 50,
        svg: { fill: '#9900cc' },
        arc: {
          cornerRadius: 5
        }
    },
    {
        key: 3,
        amount: 40,
        svg: { fill: '#c61aff' },
        arc: {
          cornerRadius: 5
        }
    },
    {
        key: 4,
        amount: 95,
        svg: { fill: '#d966ff',
        onPress: () => console.log('e'),
      },
      arc: {
        cornerRadius: 5
      }
    },
    {
        key: 5,
        amount: 35,
        svg: { fill: '#ecb3ff' },
        arc: {
          cornerRadius: 5
        }
    }
]


// const data2 = [
//   {
//       key: 1,
//       amount: 50,
//       svg: { fill: '#600080'},
//   },
//   {
//       key: 2,
//       amount: 50,
//       svg: { fill: '#9900cc' }
//   },
//   {
//       key: 3,
//       amount: 40,
//       svg: { fill: '#c61aff' }
//   },
//   {
//       key: 4,
//       amount: 95,
//       svg: { fill: '#d966ff' }
//   },
//   {
//       key: 5,
//       amount: 35,
//       svg: { fill: '#ecb3ff' }
//   }
// ]

// const Labels = ({ slices, height, width }: any) => {
//   return slices.map((slice: any, index: number) => {
//       const { labelCentroid, pieCentroid, data } = slice;
//       return (
//           <TextSVG
//               key={index}
//               x={pieCentroid[ 0 ]}
//               y={pieCentroid[ 1 ]}
//               fill={'white'}
//               textAnchor={'middle'}
//               alignmentBaseline={'middle'}
//               fontSize={24}
//               stroke={'black'}
//               strokeWidth={0.2}
//           >
//               {data.amount}
//           </TextSVG>
//       )
//   })
// }


    const Labels = ({ slices }: any) => {
      return slices.map((slice: any, index: number) => {
          const { labelCentroid, pieCentroid, data } = slice
          console.log(labelCentroid)
          return (
              <TextSVG
              key={index}
              x={labelCentroid[0]}
              y={labelCentroid[1]}
              fill={'white'}
              textAnchor={'middle'}
              alignmentBaseline={'middle'}
              fontSize={16}
              stroke={'black'}
              strokeWidth={0.2}
          >
              {data.amount}
          </TextSVG>
          )
      })
  }

  const width = useSharedValue(50);

  const fadeAnimation = useSharedValue(0)

  // const style = useAnimatedStyle(() => {
  //   return {
  //     width: withTiming(1, {
  //       duration: 500,
  //       easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  //     }),
  //   };
  // });

  return (
    <View
      style={{alignItems: 'center', flex: 1, paddingTop: statusBarHeight}}
      // style={styles.container}
      // onTouchEnd={() => {
      //   if (show) {
      //     setShow(false);
      //   }
      // }}
    >
      {/* <TestPie
        style={{ height: 200 }}
        valueAccessor={({ item }: any) => item.amount}
        data={data2}
        spacing={0}
        outerRadius={'95%'}
      >
        <Labels/>
      </TestPie> */}

      {/* <PieTesting /> */}
      {/* <DatePicker date={date} setDate={setDate} show={show} setShow={setShow} /> */}

      {/* <PieChart 
        style={{ height: 400, width: 400 }}
        valueAccessor={({ item }: any) => item.amount}
        data={data}
        spacing={0}
        // padAngle={0}
        // outerRadius={'95%'}
      >
          <Labels />
      </PieChart> */}

      <View style={{height: 50, backgroundColor: 'red', width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{color: 'black'}}>Header</Text>
        <Button title='filter' onPress={() => {}}/>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} />
        <BottomSheet
          show={show}
          setShow={setShow}
          onOpen={() => console.log('opening')}
          // topOffSet={700}
          onClose={() => {
            setShow(false);
            console.log('closing');
          }}
          enableSwipe={false}
          style={{paddingHorizontal: 0}}
        >
          <View style={{paddingHorizontal: 0, flex: 1}}>
            <Text>This is Bottom Sheet</Text>
            <Button title='Nhu cc' onPress={() => setShow(!show)} style={{height: 200,marginHorizontal: 15,}}/>
          </View>
        </BottomSheet>
      </View>

      {/* <Animated.View style={[styles.box, style]} />
      <Button onPress={() => (width.value = Math.random() * 300)} title="Hey" /> */}

    </View>
  );
};


const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1},
  button: {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    height: 100,
    backgroundColor: 'gray'
  
  }
});

export default TestingScreen;
