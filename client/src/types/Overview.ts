export interface IOverviewData {
    gain: IOD;
    orders: IOD;
}

interface IOD {
    percent: number,
    compare: number,
    yesterday: number,
    isHigher: boolean,
}