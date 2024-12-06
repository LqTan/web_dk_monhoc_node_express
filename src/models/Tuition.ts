import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Class from './Class';

class Tuition extends Model {
  public id!: string;
  public classCode!: string;
  public studentId!: string;
  public amount!: number;
  public dueDate!: Date;
  public status!: string; // 'pending' | 'paid' | 'overdue'
  public paymentDate?: Date;
}

Tuition.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    classCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Class,
        key: 'classCode',
      }
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0
      }
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'paid', 'overdue']]
      }
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'Tuition',
    tableName: 'tuitions',
  }
);

// Thiết lập mối quan hệ
User.hasMany(Tuition, { foreignKey: 'studentId', as: 'tuitions' });
Tuition.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

Class.hasMany(Tuition, { foreignKey: 'classCode', as: 'tuitions' });
Tuition.belongsTo(Class, { foreignKey: 'classCode', as: 'class' });

export default Tuition;