import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask, 
  } from 'react-native-svg';
  
  import React, { memo } from 'react';
  import { View, StyleSheet } from 'react-native';


  const PieChart = () => {
    return (
        <View
          style={[
            // StyleSheet.absoluteFill,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
        >
          <Svg height="50%" width="50%" viewBox="0 0 100 100" style={{backgroundColor: 'red'}} fill='red'>
            {/* <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="blue"
              strokeWidth="2.5"
              fill="red"
            /> */}
          </Svg>
        </View>
      );
  }

export default memo(PieChart)