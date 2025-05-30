/**
 * DNS Record Types and their meanings:
 *
 * TYPE    VALUE   MEANING
 * ----------------------------------------------
 * A       1       A host address
 * NS      2       An authoritative name server
 * CNAME   5       The canonical name for an alias
 * SOA     6       Marks the start of a zone of authority
 * PTR     12      A domain name pointer
 * MX      15      Mail exchange
 * TXT     16      Text strings
 */

import type { IpAddressV4 } from "./IpAddressV4";
import type { IpAddressV6 } from "./IpAddressV6";

export interface ResourceRecord {
	readonly name: string;
	readonly type:
		| "A"
		| "AAAA"
		| "CNAME"
		| "MX"
		| "NS"
		| "PTR"
		| "SOA"
		| "SRV"
		| "TXT";
	readonly class: string;
	readonly ttl: number;
}

export interface ARecord extends ResourceRecord {
	readonly address: IpAddressV4;
	readonly nameserver: IpAddressV4;
}

export interface AAAARecord extends ResourceRecord {
	readonly address: IpAddressV6;
	readonly nameserver: IpAddressV6;
}

export interface CNAMERecord extends ResourceRecord {
	readonly cname: string;
}

export interface MXRecord extends ResourceRecord {
	readonly preference: number;
	readonly exchange: string;
}

export interface NSRecord extends ResourceRecord {
	readonly nsdname: string;
}

export interface PTRRecord extends ResourceRecord {
	readonly ptrdname: string;
}

export interface SOARecord extends ResourceRecord {
	readonly mname: string;
	readonly rname: string;
	readonly serial: number;
	readonly refresh: number;
	readonly retry: number;
	readonly expire: number;
	readonly minimum: number;
}

export interface SRVRecord extends ResourceRecord {
	readonly priority: number;
	readonly weight: number;
	readonly port: number;
	readonly target: string;
}

export interface TXTRecord extends ResourceRecord {
	readonly text: string;
}
