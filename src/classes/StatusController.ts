
/**
 * A controller class for status routes.
 */
export default class StatusController {
	private healthMonitor: any;
	
	constructor(healthMonitor: any) {
		this.healthMonitor = healthMonitor;
	}

	public serverStatus(ctx: any) {
		const status = this.healthMonitor.getStatus();
		ctx.body = status;
	}
}