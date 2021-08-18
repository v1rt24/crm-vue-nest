export interface IOrder {
    href: string;
    title: string;
}

export interface IPosition {
    category_id: number;
    cost: number;
    name: string;
    id?: number;
    user_id?: number;
    quantity?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFilter {
    start?: Date;
    end?: Date;
    order?: number
}