import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Test extends Model {
    id?: number;
    title!: string;
    questionList!: Array<{
        question: string;
        options: string[];
        correctAnswer: string;
    }>;
}

Test.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        questionList: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        tableName: 'tests',
        sequelize,
        timestamps: true,
    }
);

export default Test;
