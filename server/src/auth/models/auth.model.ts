import {Column, Model, Table, DataType, HasMany} from 'sequelize-typescript';
import {Category} from '../../categories/models/category.model';
import {Position} from '../../positions/models/position.model';
import {Order} from '../../orders/models/order';

@Table
export class Auth extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    // Связь с таблицей категорий
    @HasMany(() => Category)
    categories: Category[];

    // Связь с таблицей позиций
    @HasMany(() => Position)
    positions: Position[];

    // Связь с таблицей заказов
    @HasMany(() => Order)
    orders: Order[];
}