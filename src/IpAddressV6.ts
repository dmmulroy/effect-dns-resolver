/**
 * @since 1.0.0
 * @category type id
 */
export const IpAddressV6Id: unique symbol = Symbol.for(
	"@effect/platform/IpAddressV6",
);

/**
 * @since 1.0.0
 * @category type id
 */
export type IpAddressV6Id = typeof IpAddressV6Id;

/**
 * @since 1.0.0
 * @category model
 */
export interface IpAddressV6 {
	readonly [IpAddressV6Id]: IpAddressV6Id;
	readonly address: string;
}
