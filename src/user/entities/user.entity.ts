import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Roles } from 'src/common/enums/role';
import { UserStatus } from 'src/common/enums/user.status';

@Table({ tableName: 'USER' })
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column
  age: number;

  @Column
  gender: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.inactive,
  })
  status: UserStatus;

  @Column({
    type: DataType.ENUM(...Object.values(Roles)),
    defaultValue: Roles.student,
  })
  role: Roles;
}
