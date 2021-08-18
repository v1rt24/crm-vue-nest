export class AnalyticsDto {
    id?: number;
    user_id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    orderProducts?: {
        id?: number,
        name?: string,
        quantity?: number,
        cost?: number,
        order_id?: number,
        createdAt?: Date,
        updatedAt?: Date,
    }[];
}

export class OrdersDto {
    [key: string]: Array<object>;
}

// Для страницы "Обзор"
export class OverviewData {
    gain: IOverviewData;
    orders: IOverviewData;
}

interface IOverviewData {
    percent: number,
    compare: number,
    yesterday: number,
    isHigher: boolean,
}

// Для построения графиков
export class Overview {
    average: number;
    chart: {
        gain: number,
        order: number,
        item: string
    }[];
}