import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from '../orders/models/order';
import {OrderProduct} from '../orders/models/orderProduct';
import {AnalyticsDto, OrdersDto, OverviewData, Overview} from './dto/analytics.dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectModel(Order)
        private readonly orderModel: typeof Order,
        @InjectModel(OrderProduct)
        private readonly orderProductModel: typeof OrderProduct,
    ) {
    }

    // =============== Для страницы "Обзор"
    async overview(userId): Promise<OverviewData> {
        try {
            const allOrders = await this.orderModel.findAll({
                where: {user_id: userId},
                order: [
                    ['createdAt', 'ASC'],
                ],
                include: [{
                    model: this.orderProductModel,
                    required: false,
                }],
            });

            // Объект, в котором ячейка состоит из даты заказа, а значением идёт массив объектов из заказов
            const ordersMap = this.getOrdersMap(allOrders);

            // Количество заказов
            const totalOrdersNumber = allOrders.length;

            // Количество дней
            const daysNumber = Object.keys(ordersMap).length;

            // Количество заказов в день
            const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);

            // Получение вчерашних заказов
            const yesterdayOrders = ordersMap[new Date(Date.now() - (1000 * 60 * 60 * 24)).toLocaleDateString()] || [];

            // Количество вчерашних заказов
            const yesterdayOrdersNumber = yesterdayOrders.length;

            // Процент для количества заказов
            // Вычисление: ((вчерашние заказы / кол-во заказов в день) - 1) * 100
            const ordersPercent = (((yesterdayOrdersNumber / +ordersPerDay) - 1) * 100).toFixed(2);

            // Общая выручка
            const totalGain = this.calculatePrice(allOrders);

            // Выручка в день
            const gainPerDay = totalGain / daysNumber;

            // Выручка за вчера
            const yesterdayGain = this.calculatePrice(yesterdayOrders);

            // Процент выручки
            const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

            // Сравнение выручки
            const compareGain = (yesterdayGain - gainPerDay).toFixed(2);

            // Сравнение количества заказов
            const compareNumber = (yesterdayOrdersNumber - +ordersPerDay).toFixed(2);

            return {
                gain: {
                    percent: Math.abs(+gainPercent),
                    compare: Math.abs(+compareGain),
                    yesterday: +yesterdayGain,
                    isHigher: +gainPercent > 0,
                },
                orders: {
                    percent: Math.abs(+ordersPercent),
                    compare: Math.abs(+compareNumber),
                    yesterday: +yesterdayOrdersNumber,
                    isHigher: +ordersPercent > 0,
                },
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // =============== Для страницы "Аналитика"
    async analytics(userId): Promise<Overview> {
        try {
            const allOrders = await this.orderModel.findAll({
                where: {user_id: userId},
                order: [
                    ['createdAt', 'ASC'],
                ],
                include: [{
                    model: this.orderProductModel,
                    required: false,
                }],
            });

            // Объект, в котором ячейка состоит из даты заказа, а значением идёт массив объектов из заказов
            const ordersMap = this.getOrdersMap(allOrders);

            // Средний чек всех заказов
            const average = +(this.calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);

            // Формирование графиков
            const chart = Object.keys(ordersMap).map(item => {
                const gain = this.calculatePrice(ordersMap[item]);
                const order = ordersMap[item].length;

                return {item, gain, order};
            });

            return {average, chart};
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    private getOrdersMap(orders: Array<AnalyticsDto> = []): object {
        const daysOrders: Partial<OrdersDto> = {};

        orders.forEach(order => {
            const data = new Date(order.createdAt).toLocaleDateString();

            if (data === new Date().toLocaleDateString()) {
                return;
            }

            if (!daysOrders[data]) {
                daysOrders[data] = [];
            }

            daysOrders[data].push(order);
        });

        return daysOrders;
    }

    // Получение общей выручки
    private calculatePrice(orders: Array<AnalyticsDto> = []): number {
        return orders.reduce((total, order) => {
            const sum = order.orderProducts.reduce((acc, item) => acc += item.cost * item.quantity, 0);
            return total += sum;
        }, 0);
    }
}
