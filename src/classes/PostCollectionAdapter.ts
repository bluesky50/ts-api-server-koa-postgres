import { ICollectionAdapter } from "../structures/ts-class-interfaces/ICollectionAdapter";

/**
 * A collection adapter class.
 */
export default class PostCollectionAdapter implements ICollectionAdapter {
	private ormAdapter: any;

	constructor(dataSource: any) {
		this.ormAdapter = dataSource;
	}

	public getModel(str: string) {
		return this.ormAdapter.getModel(str);
	}

	retrieve() {
		return this.ormAdapter.models.Post.findAll();
	}
	
	find(query: any) {
		return this.ormAdapter.models.Post.find({
			where: query
		});
	}
	
	findById(id: number) {
		return this.ormAdapter.models.Post.findById(id);
	}
	
	findOne(query: any) {
		return this.ormAdapter.models.Post.findOne({
			where: query
		});
	}
	
	create(item: any) {
		return this.ormAdapter.models.Post.create(item);
	}

	updateById(id: number, item: any) {
		return this.ormAdapter.models.Post.upsert({ postId: id, ...item });
	}
	
	removeById(id: number) {
		return this.ormAdapter.models.Post.destroy({ 
			where: {
				postId: id
			}
		});
	}
}