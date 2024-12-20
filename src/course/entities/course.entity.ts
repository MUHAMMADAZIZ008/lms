import { Table, Column, DataType, Model, HasMany, ForeignKey } from 'sequelize-typescript';
import { Category } from 'src/category/entities/category.entity';

@Table({ tableName: 'course' })
export class Course extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ForeignKey(() =>Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  categoty_id: number;
}
