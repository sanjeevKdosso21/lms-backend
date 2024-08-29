// models/Admin.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Admin extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public mobile!: number;
    public token!: string;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        mobile: {
            type: DataTypes.BIGINT, // Use BIGINT for larger numbers
            allowNull: true,
            validate: {
                isTenDigits(value: number) {
                    if (!/^[6-9]\d{9}$/.test(String(value))) {
                        throw new Error('Contact number must be a 10-digit number starting with a digit between 6 and 9.');
                    }
                }
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // Make email mandatory
            unique: true, // Ensure email is unique
            validate: {
                isEmail: true, // Validate email format
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, // Make name mandatory
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // Make password mandatory
        },
        token: {
            type: DataTypes.STRING(250),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        tableName: 'admin',
        sequelize,
    }
);

sequelize.sync({ alter: true }).then(() => {
    console.log('Admin table created.');
});

export { Admin };
