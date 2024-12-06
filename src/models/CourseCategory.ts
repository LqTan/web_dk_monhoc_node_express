import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class CourseCategory extends Model {
    public id!: string;
    public name!: string;
}

CourseCategory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "CourseCategory",
        tableName: "course_categories",
    }
);

export default CourseCategory;
