import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {Position} from './models/position.model';
import {PositionsService} from './positions.service';
import {CreatePositionDto} from './dto/create-position.dto';

import {JwtAuthGuard} from '../guards/jwt-auth.guard';

@Controller('positions')
export class PositionsController {
    constructor(
        private readonly positionsService: PositionsService,
    ) {
    }

    // Добавление записи
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() request, @Body() dto: CreatePositionDto): Promise<Position> {
        const userId = request.user.id;
        return this.positionsService.create({...dto, user_id: userId});
    }

    // Обновление записи
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto): Promise<Position> {
        return this.positionsService.update(id, dto);
    }

    // Получение всех записей по переданным id (передаём id категории и id пользователя)
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getByCategoryId(@Req() request, @Param('id') id: string): Promise<Position[]> {
        const userId = request.user.id;
        return this.positionsService.getByCategoryId(userId, id);
    }

    // Удаление записи
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<{ message: string }> {
        return this.positionsService.remove(id);
    }
}
