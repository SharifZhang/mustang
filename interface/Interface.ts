export interface RouterListInterface {
    method: string;
    path: string;
    event:Function;
}
export interface CORSConfig {
    allowOrigins?: string;
    allowMethods?: string[];
    allowHeaders?: string[];
    allowCredentials?: boolean;
    exposeHeaders?: string[];
    maxAge?: number;
}
