/**
 * Created by ashok on 28/04/17.
 */

export interface ServerConfig {
    serverRoot: string;
    webSocketDebug?: boolean;
    webSocketProtocol?: string;
    webSocketPort?: number;
    serverPort?: number;
}
