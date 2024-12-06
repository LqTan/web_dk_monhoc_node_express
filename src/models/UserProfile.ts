import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class UserProfile extends Model {
  public id!: string;
  public fullName!: string;
  public dateOfBirth?: Date;
  public gender!: string;
  public occupation!: string;
  public workplace!: string;
  public phoneNumber!: string;
  public citizenId!: string;
  public avatar?: string;
  public userId!: string;
}

UserProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    citizenId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'UserProfile',
    tableName: 'user_profiles',
  }
);

// Thiết lập mối quan hệ
User.hasOne(UserProfile, { foreignKey: 'userId' });
UserProfile.belongsTo(User, { foreignKey: 'userId' });

export default UserProfile;