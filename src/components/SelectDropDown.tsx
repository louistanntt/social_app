import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { IconProps } from 'react-native-vector-icons/Icon';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';

type SelectDropdownProps = {
  data: any;
  onSelect: () => void;
  defaultButtonText: string;
  buttonTextAfterSelection: string;
  rowTextForSelection?: () => void;
  defaultValue: string;
  defaultValueByIndex: any;
  disabled: boolean;
  buttonStyle: StyleProp<ViewStyle>;
  buttonTextStyle: StyleProp<TextStyle>;
  renderCustomizedButtonChild?: () => void;
  renderDropdownIcon: () => void;
  renderSelectedIcon: () => void;
  dropdownIconPosition?: 'left';
  statusBarTranslucent?: boolean | undefined;
  dropdownStyle: StyleProp<ViewStyle>;
  dropdownOverlayColor: any;
  rowStyle: StyleProp<ViewStyle>;
  rowTextStyle: StyleProp<TextStyle>;
  renderCustomizedRowChild?: () => void;
};

const SelectDropdown = (props: SelectDropdownProps, ref: any) => {
  const {
    data,
    onSelect,
    defaultButtonText,
    buttonTextAfterSelection,
    rowTextForSelection,
    defaultValue,
    defaultValueByIndex,
    disabled,
    buttonStyle,
    buttonTextStyle,
    renderCustomizedButtonChild,
    renderDropdownIcon,
    renderSelectedIcon,
    dropdownIconPosition,
    statusBarTranslucent,
    dropdownStyle,
    dropdownOverlayColor,

    rowStyle,
    rowTextStyle,
    renderCustomizedRowChild,
  } = props;

  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    },
    openDropdown: () => {
      openDropdown();
    },
    closeDropdown: () => {
      closeDropdown();
    },
  }));

  const { windowWidth, windowHeight } = useDeviceInfo();
  const DROPDOWN_MAX_HEIGHT = windowHeight * 0.4;

  const calculateDropdownHeight = () => {
    if (dropdownStyle && dropdownStyle?.height) {
      return dropdownStyle?.height;
    } else {
      if (!data || data.length === 0) {
        return 150;
      } else {
        if (rowStyle && rowStyle?.height) {
          const height = rowStyle?.height * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        } else {
          const height = 50 * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        }
      }
    }
  };

  const DropdownButton = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [dropdownPX, setDropdownPX] = useState(0);
  const [dropdownPY, setDropdownPY] = useState(0);
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return calculateDropdownHeight();
  });
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);
  const [index, setIndex] = useState(-1);
  const dropDownFlatListRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) {
      reset();
      if (defaultValueByIndex && data && data[defaultValueByIndex]) {
        setDefault(defaultValueByIndex);
      }
      if (defaultValue && data && findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
  }, [data]);
  useEffect(() => {
    if (
      defaultValueByIndex != null &&
      defaultValueByIndex !== undefined &&
      data &&
      data[defaultValueByIndex]
    ) {
      setDefault(defaultValueByIndex);
    }
  }, [defaultValueByIndex]);
  useEffect(() => {
    if (defaultValue && data) {
      if (findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
  }, [defaultValue]);
  useEffect(() => {
    setDropdownHEIGHT(calculateDropdownHeight());
  }, [dropdownStyle, data]);

  const openDropdown = () => {
    DropdownButton.current.measure((fx, fy, w, h, px, py) => {
      if (height - 18 < py + h + dropdownHEIGHT) {
        setDropdownPX(px);
        setDropdownPY(py - 2 - dropdownHEIGHT);
      } else {
        setDropdownPX(px);
        setDropdownPY(py + h + 2);
      }
      setDropdownWIDTH(dropdownStyle?.width || w);
    });
    setIsVisible(true);
  };
  const closeDropdown = () => {
    setIsVisible(false);
  };
  const reset = () => {
    setSelectedItem(null);
    setIndex(-1);
  };
  const setDefault = (index: number) => {
    setSelectedItem(data[index]);
    setIndex(index);
  };
  const findIndexInArr = (obj: object, arr: any[]) => {
    if (typeof obj === 'object') {
      var defaultValueIndex = -1;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (_.isEqual(element, defaultValue)) {
          defaultValueIndex = index;
        }
        if (index === arr.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
    } else {
      var defaultValueIndex = -1;
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element === defaultValue) {
          defaultValueIndex = index;
        }
        if (index === arr.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
    }
  };

  const _renderFlatListItem = ({ item, index }) => {
    const checkItem = (condition, valueItem) => {
      if (condition === 'checkedItem') {
        return valueItem === selectedItem?.value;
      }
      if (condition === 'lastItem') {
        return valueItem === data?.length - 1;
      }
      return false;
    };
    return (
      <TouchableOpacity
        style={[
          styles.dropdownRow,
          rowStyle,
          !checkItem('lastItem', index) && { borderBottomColor: '#C5C5C5', borderBottomWidth: 1 },
        ]}
        onPress={() => {
          closeDropdown();
          onSelect(item, index);
          setSelectedItem(item);
          setIndex(index);
        }}
      >
        {renderCustomizedRowChild ? (
          <View style={[styles.dropdownCustomizedRowParent]}>
            {renderCustomizedRowChild(
              rowTextForSelection?: () => void ? rowTextForSelection(item, index) : item,
              index,
            )}
          </View>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={[styles.dropdownRowText, rowTextStyle]}
            >
              {rowTextForSelection ? rowTextForSelection(item, index) : item}
            </Text>
            {checkItem('checkedItem', item?.value) && renderSelectedIcon()}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderDropdown = () => {
    return (
      isVisible && (
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="none"
          transparent={true}
          statusBarTranslucent={statusBarTranslucent ? statusBarTranslucent : false}
          visible={isVisible}
          // style={[styles.dropdownOverlay]}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.dropdownOverlay,
              !!dropdownOverlayColor && { backgroundColor: dropdownOverlayColor },
            ]}
            onPress={() => closeDropdown()}
          />
          <View
            style={[
              styles.dropdownOverlayView,
              styles.shadow,
              dropdownStyle,
              styles.dropdownOverlayViewForce,
              //   styles.dropdownOverlayViewForceRTL,
            ]}
          >
            {!data || data.length === 0 ? (
              <View style={[styles.dropdownActivityIndicatorView]}>
                <ActivityIndicator size="small" color={'#999999'} />
              </View>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                ref={ref => (dropDownFlatListRef.current = ref)}
                renderItem={_renderFlatListItem}
                getItemLayout={(data, index) => ({
                  index,
                  length: data.length,
                  offset: rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
                })}
                onLayout={() => {
                  if (index >= 3 && dropDownFlatListRef) {
                    dropDownFlatListRef.current.scrollToOffset({
                      offset: rowStyle && rowStyle.height ? rowStyle.height * index : 50 * index,
                      animated: true,
                    });
                  }
                }}
              />
            )}
          </View>
        </Modal>
      )
    );
  };

  const styles = StyleSheet.create({
    dropdownButton: {
      flexDirection: dropdownIconPosition === 'left' ? 'row' : 'row-reverse'?: 'left',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      // width: width / 2,
      height: 50,
      paddingHorizontal: 8,
      overflow: 'hidden',
    },
    dropdownButtonText: {
      flex: 1,
      fontSize: 14,
      color: '#000000',
      textAlign: 'center',
      marginHorizontal: 8,
    },
    dropdownCustomizedButtonParent: {
      flex: 1,
      // marginHorizontal: 8,
      overflow: 'hidden',
    },
    dropdownOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    dropdownOverlayView: {
      backgroundColor: '#EFEFEF',
    },
    dropdownOverlayViewForce: {
      position: 'absolute',
      top: dropdownPY,
      height: dropdownHEIGHT,
      width: dropdownWIDTH,
      borderTopWidth: 0,
      overflow: 'hidden',
    },
    //   dropdownOverlayViewForceRTL: I18nManager.isRTL ? { right: dropdownPX } : { left: dropdownPX },
    dropdownActivityIndicatorView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownRow: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdownRowText: {
      flex: 9,
      fontSize: 14,
      color: '#000000',
      textAlign: 'center',
      marginHorizontal: 8,
    },
    dropdownCustomizedRowParent: {
      flex: 1,
      // marginHorizontal: 8,
      overflow: 'hidden',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      ref={DropdownButton}
      activeOpacity={0.5}
      style={[styles.dropdownButton, buttonStyle]}
      onPress={() => openDropdown()}
    >
      {renderDropdown()}
      {renderDropdownIcon && renderDropdownIcon()}
      {renderCustomizedButtonChild ? (
        <View style={[styles.dropdownCustomizedButtonParent]}>
          {renderCustomizedButtonChild(selectedItem, index)}
        </View>
      ) : (
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={[styles.dropdownButtonText, buttonTextStyle]}
        >
          {selectedItem
            ? buttonTextAfterSelection
              ? buttonTextAfterSelection(selectedItem, index)
              : selectedItem
            : defaultButtonText
            ? defaultButtonText
            : 'Select an option.'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef((props, ref) => SelectDropdown(props, ref));
