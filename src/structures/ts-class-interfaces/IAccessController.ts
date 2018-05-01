import Koa from 'koa';

export interface IAccessController {
	login(ctx: Koa.Context, next: () => Promise<any>): void;
	register(ctx: Koa.Context, next: () => Promise<any>): void;
	getMe(ctx: Koa.Context, next: () => Promise<any>): void;
}

export default IAccessController;