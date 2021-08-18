import {Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import {Auth} from '../../auth/models/auth.model';
import {OrderProduct} from './orderProduct';

@Table
export class Order extends Model {
    @Column({type: DataType.TINYINT.UNSIGNED, autoIncrement: true, primaryKey: true})
    id: number;

    // Связь с таблицей пользователей
    @ForeignKey(() => Auth)
    @Column({type: DataType.TINYINT.UNSIGNED, allowNull: false})
    user_id: number;

    @BelongsTo(() => Auth)
    user: Auth;

    // Связь с таблицей orderProduct (заказанные товары)
    @HasMany(() => OrderProduct)
    orderProducts: OrderProduct[];
}