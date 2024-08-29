import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Student } from './userModel';
import VideoModel from './videoModel';

class Activity extends Model {
    public id!: number;
    public userId!: number;
    public activity!: Array<{
        videoId: number;
        isWatched: boolean;
    }>;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Activity.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'students', // or the correct table name for your Student model
                key: 'id',
            },
        },
        activity: {
            type: DataTypes.JSON, // Store activity data as JSON
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'student_activity',
        sequelize,
    }
);

// Associations
// Activity.belongsTo(Student, { foreignKey: 'userId' });
// Student.hasMany(Activity, { foreignKey: 'userId' });

// Activity.belongsTo(VideoModel, { foreignKey: 'videoId' });
// VideoModel.hasMany(Activity, { foreignKey: 'videoId' });

sequelize.sync({ alter: false }).then(() => {
    console.log('Activity table created.');
});

export default Activity;