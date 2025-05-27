declare function isIP(addr: string): boolean;
declare function version(addr: string): number;
declare function isV4(addr: string): boolean;
declare function isV6(addr: string): boolean;
declare function isRange(range: string): boolean;
declare function inRange(addr: string, range: string | string[]): boolean;
declare function isPrivateIP(ip: string): boolean;
declare function isIPInRangeOrPrivate(ip: string, options?: {
    ranges?: string[] | string;
    allowAnyPrivate?: boolean;
}): boolean;
declare function storeIP(addr: string): any;

declare function displayIP(addr: string): any;
/**
 * Generates a consistent fingerprint for IP addresses that can be used for bot tracking
 * - For IPv4: Uses the full address
 * - For IPv6: Uses the /64 network prefix
 *
 * @param addr - The IP address to generate a fingerprint for
 * @returns A string in the format 'v4:ADDRESS' or 'v6:PREFIX'
 */
declare function IPFingerprint(addr: string): string;
/**
 * Asynchronously generates a hashed fingerprint for IP addresses using Web Crypto API
 * This works in both browser and Node.js environments that support Web Crypto
 *
 * @param addr - The IP address to generate a fingerprint for
 * @returns A Promise that resolves to a string in the format 'v4:HASH' or 'v6:HASH'
 */
declare function IPFingerprintHashed(addr: string): Promise<string>;

export { IPFingerprint, IPFingerprintHashed, displayIP, inRange, isIP, isIPInRangeOrPrivate, isPrivateIP, isRange, isV4, isV6, storeIP as searchIP, storeIP, version };
