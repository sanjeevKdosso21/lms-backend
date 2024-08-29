
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BatchModelTable extends Model {
  public id!: number;
  public courseId!: number;
  public batchName!: string;
  public RegistrationStartDate!: Date;
  public RegistrationEndDate!: Date;
  public totalStudent!: number;
  public remainingStudent!: number;
  public isDeleted!: boolean;
  public status!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

BatchModelTable.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    courseId: {
        type: DataTypes.INTEGER(),
        allowNull : true
      },
      totalStudent: {
        type: DataTypes.INTEGER(),
        allowNull : true
      },
      remainingStudent: {
        type: DataTypes.INTEGER(),
        allowNull : true
      },
    batchName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    RegistrationStartDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    RegistrationEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
       isDeleted: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: new DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: '1 => activated or 0 => deactivated',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
  },
  {
    tableName: 'batchtable',
    sequelize,
  }
);

sequelize.sync({ alter: true }).then(() => {
  console.log('batch  table creat');
});

export {BatchModelTable};