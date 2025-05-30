/**
 * @since 1.0.0
 * @category type id
 */
export const IpAddressV4Id: unique symbol = Symbol.for(
	"@effect/platform/IpAddressV4",
);

/**
 * @since 1.0.0
 * @category type id
 */
export type IpAddressV4Id = typeof IpAddressV4Id;

/**
 * @since 1.0.0
 * @category model
 */
export interface IpAddressV4 {
	readonly [IpAddressV4Id]: IpAddressV4Id;
	readonly address: string;
}
