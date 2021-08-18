import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Position} from './models/position.model';
import {CreatePositionDto} from './dto/create-position.dto';

// Для ввода ошибок
import {messageErrors} from '../utils/messageErrors';

@Injectable()
export class PositionsService {
    constructor(
        @InjectModel(Position)
        private readonly positionModel: typeof Position,
    ) {
    }

    // Добавление записи
    async create(dto: CreatePositionDto): Promise<Position> {
        try {
            return await this.positionModel.create(dto);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Обновление записи
    async update(id: string, dto): Promise<Position> {
        try {
            const position = await this.positionModel.findOne({where: {id}});

            if (!position) {
                throw new Error();
            }

            return await position.update(dto);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Получение всех записей по переданным id (передаём id категории и id пользователя)
    async getByCategoryId(userId: number, id: string): Promise<Position[]> {
        try {
            const positions = await this.positionModel.findAll({
                where: {
                    category_id: +id,
                    user_id: +userId,
                },
            });

            /*const positions = await this.positionModel.findAll({
                include: {all: true},
                where: {category_id: id, user_id: userId},
            });*/

            return positions;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // Удаление записи
    async remove(id: string): Promise<{ message: string }> {
        try {
            const position = await this.positionModel.findOne({where: {id}});

            if (!position) {
                throw new Error();
            }

            await position.destroy();
            return {
                message: 'Позиция удалена',
            };
        } catch (error) {
            throw new NotFoundException(`Позиция с id ${id} не найдена`);
        }
    }
}
