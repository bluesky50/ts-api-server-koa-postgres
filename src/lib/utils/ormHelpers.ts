import Sequelize from 'sequelize';

/**
 * A function that initializes the Sequelize connection configuration.
 * @param serverConfig 
 */
export function initializeOrm(serverConfig: any) {
	const orm =  new Sequelize(serverConfig.dbName, serverConfig.dbUsername, serverConfig.dbPassword, {
		host: serverConfig.dbHost,
		dialect: 'postgres',
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		},

		// http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
		operatorsAliases: false
	});

	return orm;
}

/**
 * A function that creates the models for Sequelize ORM.
 * @param orm 
 */
export function initializeModels(orm: any) {

	const models: any = {
		User: orm.import('../models/User'),
		Comment: orm.import('../models/Comment'),
		Post: orm.import('../models/Post')
	};
	
	Object.keys(models).forEach((modelName) => {
		if ('associate' in models[modelName]) {
			models[modelName].associate(models);
		}
	});
	
	return models;
}