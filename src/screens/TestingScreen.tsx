import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheet, Button, Toast, DatePicker, Modalize, PieTesting } from '../components';
import FloatingButton from '../components/FloatingButton';
import { AntIcon } from '../components/Icons';
import colors from '../config/colors'
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import  PieChart  from '../components/Chart/PieChart'

interface TestingScreenProps {}

const TestingScreen: React.FC<TestingScreenProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());

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
    },
    {
        key: 2,
        amount: 50,
        svg: { fill: '#9900cc' }
    },
    {
        key: 3,
        amount: 40,
        svg: { fill: '#c61aff' }
    },
    {
        key: 4,
        amount: 95,
        svg: { fill: '#d966ff' }
    },
    {
        key: 5,
        amount: 35,
        svg: { fill: '#ecb3ff' }
    }
]

      const Labels = ({ slices, height, width }: any) => {
        return slices.map((slice: any, index: number) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                </Text>
            )
        })
    }

  return (
    <View
      style={styles.container}
      // onTouchEnd={() => {
      //   if (show) {
      //     setShow(false);
      //   }
      // }}
    >
      <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} />
      <PieChart 
        style={{ height: 200 }}
        valueAccessor={({ item }) => item.amount}
        data={data}
        spacing={0}
        // outerRadius={'95%'}
      >
          <Labels/>
      </PieChart>
      {/* <PieTesting /> */}
      <BottomSheet
        show={show}
        setShow={setShow}
        onOpen={() => console.log('opening')}
        onClose={() => {
          // setShow(false);
          console.log('closing');
        }}
      >
        <Text>This is Bottom Sheet</Text>
      </BottomSheet>
      {/* <DatePicker date={date} setDate={setDate} show={show} setShow={setShow} /> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  button: {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default TestingScreen;
