import { Sequelize } from 'sequelize';
                               
const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`,{
  host: `${process.env.DB_HOST}`,
  dialect: `${process.env.DB_DIALECT}` as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
});

export default sequelize;
//`${process.env.DB_PASSWORD}`
