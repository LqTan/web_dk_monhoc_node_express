import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import CourseCategory from './CourseCategory';

class Course extends Model {
  // public id!: string;
  public courseCode!: string;
  public name!: string;
  public price!: number;
  public categoryId!: string;
  public description!: string;
  public imageUrl!: string;
}

Course.init(
  {
    courseCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CourseCategory,
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
  }
);

// Thiết lập mối quan hệ
CourseCategory.hasMany(Course, { foreignKey: 'categoryId' });
Course.belongsTo(CourseCategory, { foreignKey: 'categoryId' });

export default Course;