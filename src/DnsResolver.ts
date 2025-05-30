import type { Effect } from "effect";

export interface DnsResolver {
	resolveIpV4: Effect.Effect<void>;

	resolveIpV6: Effect.Effect<void>;

	resolveARecord: Effect.Effect<void>;

	resolveAAAARecord: Effect.Effect<void>;

	resolveCAARecord: Effect.Effect<void>;

	resolveCNAMERecord: Effect.Effect<void>;

	resolveMXRecord: Effect.Effect<void>;

	resolveNSRecord: Effect.Effect<void>;

	resolvePTRRecord: Effect.Effect<void>;

	resolveSOARecord: Effect.Effect<void>;

	resolveSRVRecord: Effect.Effect<void>;

	resolveTXTRecord: Effect.Effect<void>;

	resolveNAPTRRecord: Effect.Effect<void>;

	resolveTLSARecord: Effect.Effect<void>;
}
