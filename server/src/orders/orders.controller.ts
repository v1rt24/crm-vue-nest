import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {Order} from './models/order';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';

import {Request} from 'express';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
    ) {
    }

    // Получение всех заказов пользователя / http://localhost:5000/api/orders?offset=2&limit=5
    // http://localhost:5000/api/orders?order=1&start=01.08.2021&end=03.08.2021&offset=2&limit=5
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllOrders(
        @Query('order') order: number,
        @Query('start') start: string,
        @Query('end') end: string,
        @Query('offset') offset: string,
        @Query('limit') limit: string,
        @Req() request): Promise<Order[]> {
        const userId = request.user.id;
        return this.ordersService.getAllOrders(userId, offset, limit, order, start, end);
    }

    // Создание заказа
    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Body() dto: CreateOrderDto[], @Req() request): Promise<{ message: string }> {
        const userId = request.user.id;
        return this.ordersService.createOrder(dto, userId);
    }
}
