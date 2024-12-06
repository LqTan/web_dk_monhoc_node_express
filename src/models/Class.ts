import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Course from './Course';

class Class extends Model {
  public classCode!: string;
  public teacherId!: string;
  public courseId!: string;
  public schedule!: number[]; // [2,4,6] tương ứng thứ 2,4,6
  public startTime!: string; // Format "HH:mm"
  public endTime!: string; // Format "HH:mm"
  public room!: string;
  public currentStudents!: number;
  public maxStudents!: number;
  public startDate!: Date;
  public endDate!: Date;

  static formatScheduleToText(schedule: number[]): string {
    const dayMap: { [key: number]: string } = {
        2: 'Thứ 2',
        3: 'Thứ 3',
        4: 'Thứ 4',
        5: 'Thứ 5',
        6: 'Thứ 6',
        7: 'Thứ 7',
        8: 'Chủ nhật'
    };
    return schedule.map(day => dayMap[day]).join(', ');
  }

  formatTimeRange(): string {
    return `${this.startTime} - ${this.endTime}`;
  }
}

Class.init(
  {
    classCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      validate: {
        isTeacher: async (value: string) => {
          const user = await User.findByPk(value);
          if (!user || user.role !== 'teacher') {
            throw new Error('Teacher ID must belong to a user with teacher role');
          }
        }
      }
    },
    courseId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Course,
            key: 'courseCode',
        }
    },
    schedule: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidSchedule(value: number[]) {
          if (!Array.isArray(value)) throw new Error('Schedule must be an array');
          if (!value.every(day => day >= 2 && day <= 8)) {
            throw new Error('Schedule days must be between 2-8');
          }
        }
      }
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // Format HH:mm
      }
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, // Format HH:mm
        isAfterStartTime(this: Class, value: string) {
          const start = new Date(`1970-01-01T${this.startTime}`);
          const end = new Date(`1970-01-01T${value}`);
          if (end <= start) {
            throw new Error('End time must be after start time');
          }
        }
      }
    },
    room: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currentStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        isLessThanMax(this: Class, value: number) {
          if (value > this.maxStudents) {
            throw new Error('Current students cannot exceed max students');
          }
        }
      }
    },
    maxStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfterStartDate(this: Class, value: Date) {
          if (value <= this.startDate) {
            throw new Error('End date must be after start date');
          }
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Class',
    tableName: 'classes'
  }
);

// Thiết lập mối quan hệ
User.hasMany(Class, { foreignKey: 'teacherId', as: 'teachingClasses' });
Class.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });

Course.hasMany(Class, { foreignKey: 'courseId' });
Class.belongsTo(Course, { foreignKey: 'courseId' });

export default Class;