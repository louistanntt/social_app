import React, {
  memo,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Text, FlatList } from 'react-native';
import moment, { Moment } from 'moment';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import { moderateScale, scale, verticalScale } from '../utilities/functions/scaling';
import { Button, BottomSheet } from '.';
// import { FlatList } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import colors from '../config/colors';

type DateTimePickerProps = {
  date?: Moment;
  setDate: (e: string) => void;
  show: boolean;
  setShow: (e: any) => void;
  type?: 'date' | 'time';
};

const yearData: number[] = [];
for (let i = 0; i < 65; i++) yearData.push(parseInt(moment().format('YYYY')) - i);

const itemHeight = Math.round(verticalScale(30));
const DateTimePicker = (props: DateTimePickerProps) => {
  const { date = moment(), setDate, show, setShow, type = 'date' } = props;
  const { windowHeight, windowWidth } = useDeviceInfo();
  const { t } = useTranslation(['date']);
  const dateRef = useRef<any>(null);

  const [dateNumeric, setDateNumeric] = useState<number>(0);
  const [monthNumeric, setMonthNumeric] = useState<number>(parseInt(moment(date).format('MM')) - 1);
  const [yearNumeric, setYearNumeric] = useState<number>(0);

  const [dateData, setDateData] = useState<Array<number>>([]);

  const monthData = [
    t('JANUARY'),
    t('FEBRUARY'),
    t('MARCH'),
    t('APRIL'),
    t('MAY'),
    t('JUNE'),
    t('JULY'),
    t('AUGUST'),
    t('SEPTEMBER'),
    t('OCTOBER'),
    t('NOVEMBER'),
    t('DECEMBER'),
  ];

  useEffect(() => {
    if (show) {
      setDateNumeric(parseInt(moment(date).format('DD')) - 1);
    }
  }, [date, show]);

  useEffect(() => {
    let daysInMonth = 0;
    const selectedMonth = `0${monthNumeric + 1}`.slice(-2);
    const monthInCurrentDate = moment(date).format('MM');
    if (date && selectedMonth === monthInCurrentDate) {
      daysInMonth = moment(date).daysInMonth();
      console.log('1 ', daysInMonth);
      for (let i = 1; i <= daysInMonth; i++) {
        dateData[i - 1] = i;
        setDateData(dateData.slice(0, daysInMonth));
      }
    } else {
      const selectedMonthYear = moment(`${yearData[yearNumeric]}-${selectedMonth}-01`);
      daysInMonth = moment(selectedMonthYear).daysInMonth();
      console.log('2 ', daysInMonth);
      for (let i = 1; i <= daysInMonth; i++) {
        dateData[i - 1] = i;
        setDateData(dateData.slice(0, daysInMonth));
      }
    }
  }, [monthNumeric]);

  const renderYear = useCallback(
    value => (
      <TouchableNativeFeedback onPress={() => setYearNumeric(value.index)}>
        <View style={styles.itemView}>
          <Text
            style={{
              fontSize: scale(14),
              color: value.index === yearNumeric ? colors.primary : colors.gray,
            }}
          >
            {value.item}
          </Text>
        </View>
      </TouchableNativeFeedback>
    ),
    [yearNumeric],
  );

  if (!show) {
    return <View />;
  }

  const _renderDatePicker = () => {
    return (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={yearData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderYear}
          snapToInterval={itemHeight}
        />
        <FlatList
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={monthData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableNativeFeedback onPress={() => setMonthNumeric(index)}>
              <View style={styles.itemView}>
                <Text
                  style={{
                    color: index === monthNumeric ? colors.primary : colors.gray,
                    fontSize: scale(14),
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
          snapToInterval={itemHeight}
        />
        <FlatList
          style={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={dateData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableNativeFeedback onPress={() => setDateNumeric(index)}>
              <View style={styles.itemView}>
                <Text
                  style={{
                    color: index === dateNumeric ? colors.primary : colors.gray,
                    fontSize: scale(14),
                  }}
                >
                  {item}
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}
          snapToInterval={itemHeight}
          ref={dateRef}
          onScrollToIndexFailed={() => {}}
        />
      </>
    );
  };

  const _renderTimePicker = () => {
    return <View></View>;
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth,
          height: windowHeight,
        },
      ]}
    >
      <Button
        onPress={() => {
          setShow(false);
          const parsedDate = `0${dateData[dateNumeric]}`.slice(-2);
          const parsedMonth = `0${monthNumeric + 1}`.slice(-2);

          setDate(
            moment(`${yearData[yearNumeric]}-${parsedMonth}-${parsedDate}`).format('YYYY/MM/DD'),
          );
        }}
        style={[
          styles.overlay,
          {
            width: windowWidth + 40,
            height: windowHeight + 40,
          },
        ]}
      />
      <BottomSheet
        style={{ zIndex: 1000 }}
        show={show}
        setShow={setShow}
        scrollable={false}
        stack={1.3}
        line={false}
      >
        <View style={[styles.content]}>
          {type === 'time' ? _renderTimePicker() : _renderDatePicker()}
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1,
    position: 'absolute',
    left: -20,
    top: -20,
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 2,
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  itemView: {
    height: itemHeight,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
});

export default memo(DateTimePicker);
