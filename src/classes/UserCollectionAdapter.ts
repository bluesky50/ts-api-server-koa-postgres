import { ICollectionAdapter } from "../structures/ts-class-interfaces/ICollectionAdapter";
import { generateAuthToken, hashPassword } from '../lib/utils/jwtHelpers';

/**
 * A collection adapter class.
 */
export default class UserCollectionAdapter implements ICollectionAdapter {
	private ormAdapter: any;

	constructor(dataSource: any) {
		this.ormAdapter = dataSource;
	}

	public getModel(str: string) {
		return this.ormAdapter.getModel(str);
	}

	loginUser(username: string, password: string) {
		const hashedPassword = hashPassword(password);
		const token = generateAuthToken({ username, password: hashedPassword });
		return this.ormAdapter.models.User.find({
			where: {
				username,
				password
			}
		})
		.then((data: any) => {
			this.ormAdapter.models.User.upsert({ ...data.dataValues, token });
			return { ...data.dataValues, token };
		});
	}

	registerUser(item: any) {
		const hashedPassword = hashPassword(item.password);
		const token = generateAuthToken({ username: item.username, password: hashedPassword });
		return this.ormAdapter.models.User.create({ ...item, token, password: hashedPassword });
	}

	findByToken(token: any) {
		return this.ormAdapter.models.User.find({
			where: {
				token: token
			}
		});
	}

	retrieve() {
		return this.ormAdapter.models.User.findAll();
	};
	
	find(query: any) {
		return this.ormAdapter.models.User.find({
			where: query
		});
	};
	
	findById(id: number) {
		return this.ormAdapter.models.User.findById(id);
	};
	
	findOne(query: any) {
		return this.ormAdapter.models.User.findOne({
			where: query
		});
	};
	
	create(item: any) {
		const hashedPassword = hashPassword(item.password);
		const token = generateAuthToken({ username: item.username, password: hashedPassword });
		return this.ormAdapter.models.User.create({ ...item, token, password: hashedPassword });
	};

	updateById(id: number, item: any) {
		return this.ormAdapter.models.User.upsert({ userId: id, ...item });
	};
	
	removeById(id: number) {
		return this.ormAdapter.models.User.destroy({ 
			where: {
				userId: id
			}
		});
	};
}