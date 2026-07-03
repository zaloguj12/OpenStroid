import { startBridgeServer } from './app.js';
import { serverConfig } from './config.js';

await startBridgeServer(serverConfig.port);
