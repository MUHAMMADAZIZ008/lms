import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { otpType } from 'src/common/enums/otp.enum';
import { User } from 'src/user/entities/user.entity';

@Table({ tableName: 'otp' })
export class Otp extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  otp_code: string;

  @Column({
    type: DataType.ENUM(...Object.values(otpType)),
  })
  type: otpType;
  @Column({
    type: DataType.DATE,
    defaultValue: () => new Date(Date.now() + 3 * 60 * 1000),
  })
  expires_at: Date;
}
