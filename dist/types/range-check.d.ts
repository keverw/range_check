export declare function isIP(addr: string): boolean;
export declare function version(addr: string): number;
export declare function isV4(addr: string): boolean;
export declare function isV6(addr: string): boolean;
export declare function isRange(range: string): boolean;
export declare function inRange(addr: string, range: string | string[]): any;
export declare function storeIP(addr: string): any;
export { storeIP as searchIP };
export declare function displayIP(addr: string): any;
