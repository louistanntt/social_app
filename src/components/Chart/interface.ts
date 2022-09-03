export interface ShapeProps {
    svg?: object,
    key: any,
    value: number,
    arc: object,
}

export interface PieChartProps {
    data: Array<ShapeProps>,
    innerRadius?: number | string,
    outerRadius: number | string,
    labelRadius: number | string,
    startAngle?: number,
    endAngle?: number
    padAngle?: number,
    animate: boolean | any,
    animationDuration: number,
    style: any,
    sort: (a: any, b: any) => void,
    valueAccessor: (e: any) => void,   
    dataPoints: Array<any>,
    width?: number,
    height?: number,
    children?: any     
}
