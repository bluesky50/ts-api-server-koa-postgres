import moment from 'moment';

export interface Status {
	startTime: string;
	upTime: string;
	isShuttingDown: boolean;
}

export default class HealthMonitor {
	private startTime: number;
	private isShuttingDown: boolean;

	constructor() {
		this.isShuttingDown = false;
		this.startTime = Date.now();
	}

	public shuttingDown() {
		this.isShuttingDown = true;
	}

	public getStatus() {
		return {
			startTime: new Date(this.startTime).toISOString(),
			upTime: moment(this.startTime).fromNow(true),
			isShuttingDown: this.isShuttingDown
		}
	}
}