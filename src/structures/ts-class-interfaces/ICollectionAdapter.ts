export interface ICollectionAdapter {
	retrieve(): any;
	find(query: any): any;
	findById(id: number): any;
	findOne(query: any): any;
	create(item: any): any;
	updateById(id: number, item: any): any;
	removeById(id: number): any;
}

export default ICollectionAdapter;