import { ICollectionAdapter } from "../structures/ts-class-interfaces/ICollectionAdapter";

/**
 * A collection adapter class.
 */
export default class CommentCollectionAdapter implements ICollectionAdapter {
	private ormAdapter: any;

	constructor(dataSource: any) {
		this.ormAdapter = dataSource;
	}

	public getModel(str: string) {
		return this.ormAdapter.getModel(str);
	}

	retrieve() {
		return this.ormAdapter.models.Comment.findAll();
	}
	
	public find(query: any) {
		return this.ormAdapter.models.Comment.find({
			where: query
		});
	}
	
	findById(id: number) {
		return this.ormAdapter.models.Comment.findById(id);
	};
	
	findOne(query: any) {
		return this.ormAdapter.models.Comment.findOne({
			where: query
		});
	}
	
	create(item: any) {
		return this.ormAdapter.models.Comment.create(item);
	}

	updateById(id: number, item: any) {
		return this.ormAdapter.models.Comment.upsert({ commentId: id, ...item });
	}
	
	removeById(id: number) {
		return this.ormAdapter.models.Comment.destroy({ 
			where: {
				commentId: id
			}
		});
	}
}