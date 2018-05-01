import debug from '../lib/utils/debugger';
import { initializeModels, initializeOrm } from '../lib/utils/ormHelpers';

/**
 * A class that connects to the ORM.
 */
export default class OrmAdapter {
	private models: any;
	private orm: any;

	constructor(serverConfig: any) {
		this.orm = initializeOrm(serverConfig);
		
		this.models = initializeModels(this.orm);

		this.orm.sync({
			force: false,
			logging: console.log
		})
		.then(() => {
			debug(`Sequelize connected and synced with Postgres database`);
		})
		.catch((err: any) => {
			debug(err.message);
		});

		// console.log(this.orm.models);
	}

	public disconnect() {
		this.orm.close()
	}

	public getOrm() {
		return this.orm;
	}

	public getModels() {
		return this.orm.models;
	}

	public getModel(str: string) {
		return this.orm.model(str);
	}
}