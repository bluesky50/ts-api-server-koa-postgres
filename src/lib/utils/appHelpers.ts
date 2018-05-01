import debug from './debugger';

/**
 * A function that registers process error events.
 * @param server
 */
export function registerProcessEvents(server: any): void {
	process.on('uncaughtException', (error: Error) => {
		debug(`UncaughtException: ${error}`);
	});
	
	process.on('unhandledRejection', (reason: any, promise: any) => {
		debug(`UnhandledRejection: ${reason}`);
	});

	process.on('SIGTERM', async () => {
		debug('Starting graceful shutdown');
	
		// server.shuttingDown()
	
		let exitCode = 0
		const shutdown = [server.shutdown()]//, server.closeDatabase()]
	
		for (const s of shutdown) {
		  try {
			await s
		  } catch (e) {
			debug(`Error in graceful shutdown: ${e}`);
			exitCode = 1
		  }
		}
	
		process.exit(exitCode)
	});
}
