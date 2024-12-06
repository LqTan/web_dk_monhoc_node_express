import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['admin', 'teacher', 'student']]
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);

export default User;