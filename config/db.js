import { Sequelize } from 'sequelize';
import configData from './config.js'; // Импортируем наш JS конфиг

// Выбираем настройки для разработки
const config = configData.development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: false
});

export default sequelize;