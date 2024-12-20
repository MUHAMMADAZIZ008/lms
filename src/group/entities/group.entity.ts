import { Table, Model, DataType, Column, HasMany, ForeignKey } from 'sequelize-typescript';
import { Course } from 'src/course/entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'group' })
export class Group extends Model {
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

  @ForeignKey(() =>Course)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  course_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  room: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  student_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  teacher_id: number;
}
