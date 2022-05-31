import React, { memo, useState } from 'react'
import { View, Platform, StyleProp, ViewStyle } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Svg, { G, Path } from 'react-native-svg'

interface InfoProps  {
    width: number, 
    height: number
}

interface IProps {
    data: any [],
    dataPoints: any,
    innerRadius: number | string,
    outerRadius: number | string,
    labelRadius: number | string,
    padAngle: number,
    animate: boolean,
    animationDuration: Function,
    style: StyleProp<any>,
    sort: (a: any, b: any) => void,
    valueAccessor: (e: any) => void,         
    children: any,
    startAngle: number,
    endAngle: number,
}

const PieChart = (props: any) => {
    const {
        data,
        dataPoints,
        innerRadius = '50%',
        outerRadius,
        labelRadius,
        padAngle = 0.05,
        animate,
        animationDuration,
        style,
        sort,
        valueAccessor,
        children,
        startAngle = 0,
        endAngle = Math.PI * 2,
    } = props

    const [info, setInfo] = useState<InfoProps>({
        height: 100,
        width: 100
    }) 

    const calculateRadius = (arg: any | string, max: number, defaultVal: number) => {
        if (typeof arg === 'string') {
            return 1
            // return (arg.split('%')[0] / 100) * max
        } else if (arg) {
            return arg
        } 
        return defaultVal
    }

    if (!data && dataPoints) {
        throw `"dataPoints" have been renamed to "data" to better reflect the fact that it's an array of objects`
    }

    if (data.length === 0) {
        return <View style={style} />
    }

    const maxRadius = Math.min(info.width, info.height) / 2

    if (Math.min(...data.map((obj: number) => valueAccessor({ item: obj }))) < 0) {
        console.error("don't pass negative numbers to pie-chart, it makes no sense!")
    }

    const outerRadiusInner = calculateRadius(outerRadius, maxRadius, maxRadius)
    const innerRadiusInner = calculateRadius(innerRadius, maxRadius, 0)
    const labelRadiusInner = calculateRadius(labelRadius, maxRadius, outerRadius)

    if (outerRadiusInner > 0 && innerRadiusInner >= outerRadiusInner) {
        console.warn('innerRadius is equal to or greater than outerRadius')
    }

    const arcs = data.map((item: any) => {
        const arc = shape
            .arc()
            .outerRadius(outerRadiusInner)
            .innerRadius(innerRadiusInner)
            .padAngle(padAngle) // Angle between sections

        item.arc &&
            Object.entries(item.arc).forEach(([key, value]) => {
                if (typeof arc[key] === 'function') {
                    if (typeof value === 'string') {
                        arc[key]((value.split('%')[0] / 100) * outerRadiusInner)
                    } else {
                        arc[key](value)
                    }
                }
            })

        return arc
    })

    const labelArcs = data.map((item: any, index: number) => {
        if (labelRadius) {
            return shape
                .arc()
                .outerRadius(labelRadiusInner)
                .innerRadius(labelRadiusInner)
                .padAngle(padAngle)
        }
        return arcs[index]
    })

    const pieSlices = shape
        .pie()
        .value((d: any) => valueAccessor({ item: d }))
        .sort(sort)
        .startAngle(startAngle)
        .endAngle(endAngle)(data)

    const slices = pieSlices.map((slice: any, index: number) => ({
        ...slice,
        pieCentroid: arcs[index].centroid(slice),
        labelCentroid: labelArcs[index].centroid(slice),
    }))

    const extraProps = {
        width: info.width,
        height: info.height,
        data,
        slices,
    }

    console.log(info)

    return (
        <View pointerEvents={'box-none'} style={style}>
            <View pointerEvents={'box-none'} style={{ flex: 1 }} onLayout={({nativeEvent}) => {
                const { height, width } = nativeEvent.layout
                setInfo({height, width})
            }}>
                {info.height > 0 && info.width > 0 && (
                    <Svg pointerEvents={Platform.OS === 'android' ? 'box-none' : undefined} style={{  height: info.height, width: info.width }}>
                        {/* center the progress circle*/}
                        <G x={info.width / 2} y={info.height / 2}>
                            {React.Children.map(children, (child) => {
                                if (child && child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })}
                            {pieSlices.map((slice: any, index: number) => {
                                const { key, onPress, svg } = data[index]
                                return (
                                    <Path
                                        key={key}
                                        onPress={onPress}
                                        {...svg}
                                        d={arcs[index](slice)}
                                        animate={animate}
                                        animationDuration={animationDuration}
                                    />
                                )
                            })}
                            {React.Children.map(children, (child) => {
                                if (child && !child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })}
                        </G>
                    </Svg>
                )}
            </View>
        </View>
    )
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            svg: PropTypes.object,
            key: PropTypes.any.isRequired,
            value: PropTypes.number,
            arc: PropTypes.object,
        })
    ).isRequired,
    innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    sort: PropTypes.func,
    valueAccessor: PropTypes.func,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
    startAngle: 0,
    endAngle: Math.PI * 2,
    valueAccessor: ({ item }: any) => item.value,
    innerRadius: '50%',
    sort: (a: any, b: any) => b.value - a.value,
}

export default memo(PieChart)
