import React, { memo, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { moderateScale, verticalScale } from '../utilities/functions/scaling';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import { Button } from '../components';
import { AntIcon } from '../components/Icons';
import moment, { Moment } from 'moment';
import { getMonthAndYear } from '../utilities/functions/date';
import colors from '../config/colors';
import { useTranslation } from 'react-i18next';

type DatePickerProps = {
  date: Moment;
  setDate: Dispatch<SetStateAction<Moment>>;
  show: boolean;
  setShow: (e: any) => void;
};

const DatePicker = (props: DatePickerProps) => {
  const { windowHeight, windowWidth } = useDeviceInfo(true);
  const { date, setDate, show, setShow } = props;
  const { t } = useTranslation(['date']);

  const [days, setDays] = useState<any>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  useEffect(() => {
    setCurrentDate(moment(date));
  }, [date]);

  useEffect(() => {
    const thisDate = getDayOfThisMonth();
    const afterDate = getDayOfNextMonth();
    const beforeDate = getDayOfLastMonth(afterDate.length + thisDate.length);

    setDays([...beforeDate, ...thisDate, ...afterDate]);
  }, [currentDate]);

  const getDayOfThisMonth = () => {
    let thisMonth = [];

    const dayInMonth = moment(currentDate).daysInMonth();

    for (let i = 1; i < dayInMonth + 1; i++) {
      let m: string | number = currentDate.month() + 1;
      m = m > 9 ? m : `0${m}`;
      const d = i < 10 ? `0${i}` : i;
      thisMonth.push(`${moment(currentDate).year()}-${m}-${d}`);
    }

    return thisMonth;
  };

  const getDayOfNextMonth = () => {
    let after = [];
    const cd = currentDate;
    const dayInMonth = moment(cd).daysInMonth();

    const nextMonth = moment(currentDate).add('1', 'month');

    let weekDayOfLastDay: number | Moment = currentDate.date(dayInMonth);
    weekDayOfLastDay = moment(weekDayOfLastDay).day();

    const lastDay = 6 - weekDayOfLastDay;

    for (let i = 1; i < lastDay + 1; i++) {
      const d = i < 10 ? `0${i}` : i;

      let mNext: string | number = nextMonth.month() + 1;
      mNext = mNext > 9 ? mNext : `0${mNext}`;
      after.push(`${nextMonth.year()}-${mNext}-${d}`);
    }

    return after;
  };

  const getDayOfLastMonth = (total: any) => {
    const lastMonth = moment(currentDate).subtract(1, 'month');
    const beforeDay = lastMonth.daysInMonth() - (42 - total);
    let before = [];

    for (let i = beforeDay + 1; i < lastMonth.daysInMonth() + 1; i++) {
      const d = i < 10 ? '0' + i : i;
      let mLast: string | number = lastMonth.month() + 1;
      mLast = mLast > 9 ? mLast : `0${mLast}`;
      before.push(`${lastMonth.year()}-${mLast}-${d}`);
    }

    return before;
  };

  const checkFuture = (item: any) => {
    if (moment() >= moment(item)) {
      return false;
    }
    return true;
  };

  const checkToday = (item: any) => {
    if (moment().format('YYYY-MM-DD') === moment(item).format('YYYY-MM-DD')) {
      return true;
    }

    return false;
  };

  const checkSelectedDate = (item: any) => {
    if (moment(date).format('YYYY-MM-DD') === moment(item).format('YYYY-MM-DD')) {
      return true;
    }

    return false;
  };

  const _renderWeekDay = () => {
    const weeks = [0, 1, 2, 3, 4, 5, 6];

    const week = new Array(7);
    week[0] = t('SUNDAY');
    week[1] = t('MONDAY');
    week[2] = t('TUESDAY');
    week[3] = t('WEDNESDAY');
    week[4] = t('THURSDAY');
    week[5] = t('FRIDAY');
    week[6] = t('SATURDAY');

    return weeks.map(item => (
      <View
        key={item}
        style={{
          flex: 1,
          paddingBottom: 5,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.grayLight }}>{week[item]}</Text>
      </View>
    ));
  };

  const _renderItem = ({ item }: any) => (
    <Button
      key={item}
      onPress={() => {
        if (checkFuture(item)) return;
        setDate(moment(item));
        console.log('a');
        setShow(false);
      }}
      style={[styles.dayItem, { height: (450 - 60 - 30) / 7 }]}
    >
      <Text
        style={[
          styles.dayItemText,
          checkToday(item) && styles.today,
          checkSelectedDate(item) && styles.selectedDate,
          { color: checkFuture(item) ? colors.lightGray : 'black' },
        ]}
      >
        {moment(item).date()}
      </Text>
    </Button>
  );

  if (!show) {
    return <View />;
  }

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
        }}
        style={[
          styles.overlay,
          {
            width: windowWidth + 40,
            height: windowHeight + 40,
          },
        ]}
      />
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          maxWidth: 400,
          maxHeight: 450,
          zIndex: 2,
          width: '100%',
          height: '100%',
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#e1e1e1',
            height: verticalScale(60),
          }}
        >
          <Button
            style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setCurrentDate(moment(currentDate).subtract(1, 'month'))}
          >
            <AntIcon name="left" size={20} color="black" />
          </Button>
          <Button onPress={() => console.log('ok')}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
              {getMonthAndYear(currentDate)}
            </Text>
          </Button>
          <Button
            style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => setCurrentDate(moment(currentDate).add(1, 'month'))}
          >
            <AntIcon name="right" size={20} color="black" />
          </Button>
        </View>
        <View style={{ flex: 1, paddingTop: 20 }}>
          <View style={{ height: 30, flexDirection: 'row' }}>{_renderWeekDay()}</View>
          <FlatList
            style={{ flex: 1 }}
            data={days}
            extraData={days}
            scrollEnabled={false}
            keyExtractor={item => `day-${item}`}
            numColumns={7}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            renderItem={_renderItem}
          />
        </View>
      </View>
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
    padding: moderateScale(20),
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1,
    position: 'absolute',
    left: -20,
    top: -20,
  },
  dayItem: {
    alignItems: 'center',
    paddingHorizontal: 2,
    overflow: 'hidden',
    flex: 1,
  },
  dayItemText: {
    height: 24,
    width: 24,
    lineHeight: 24,
    borderRadius: 24 / 2,
    overflow: 'hidden',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 3,
    fontWeight: '500',
  },
  today: {
    backgroundColor: colors.lightSecondary,
    width: 24,
  },
  selectedDate: {
    backgroundColor: colors.primary,
    width: 24,
    color: 'white',
  },
});

export default memo(DatePicker);
