import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Class from './Class';

class ClassRegistration extends Model {
  public id!: string;
  public userId!: string;
  public classCode!: string;
  public registrationDate!: Date;
  public status!: string; // 'pending' | 'approved' | 'rejected'
}

ClassRegistration.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
    classCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Class,
        key: 'classCode',
      }
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'approved', 'rejected']]
      }
    }
  },
  {
    sequelize,
    modelName: 'ClassRegistration',
    tableName: 'class_registrations',
  }
);

// Thiết lập mối quan hệ
User.belongsToMany(Class, { 
  through: ClassRegistration,
  foreignKey: 'userId',
  otherKey: 'classCode',
  as: 'registeredClasses'
});

Class.belongsToMany(User, {
  through: ClassRegistration,
  foreignKey: 'classCode',
  otherKey: 'userId',
  as: 'registeredStudents'
});

export default ClassRegistration;