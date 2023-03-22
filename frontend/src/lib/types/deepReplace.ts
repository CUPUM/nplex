import type { Builtin } from 'ts-essentials';
import type { DeepModify } from './deepModify';
import type { AnyRecord } from './utils';

export type DeepReplace<T, Replacer extends DeepModify<T, Builtin>> = T extends Builtin
	? T
	: T extends Map<infer KeyType, infer ValueType>
	? Replacer extends Map<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModify<ValueType, Builtin>
			? Map<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends ReadonlyMap<infer KeyType, infer ValueType>
	? Replacer extends ReadonlyMap<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModify<ValueType, Builtin>
			? ReadonlyMap<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends WeakMap<infer KeyType, infer ValueType>
	? Replacer extends WeakMap<KeyType, infer ReplacerValueType>
		? ReplacerValueType extends DeepModify<ValueType, Builtin>
			? WeakMap<KeyType, DeepReplace<ValueType, ReplacerValueType>>
			: T
		: T
	: T extends Set<infer ItemType>
	? Replacer extends Set<infer ReplacerItemType>
		? ReplacerItemType extends DeepModify<ItemType, Builtin>
			? Set<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends ReadonlySet<infer ItemType>
	? Replacer extends ReadonlySet<infer ReplacerItemType>
		? ReplacerItemType extends DeepModify<ItemType, Builtin>
			? ReadonlySet<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends WeakSet<infer ItemType>
	? Replacer extends WeakSet<infer ReplacerItemType>
		? ReplacerItemType extends DeepModify<ItemType, Builtin>
			? WeakSet<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends Array<infer ItemType>
	? Replacer extends Array<infer ReplacerItemType>
		? ReplacerItemType extends DeepModify<ItemType, Builtin>
			? Array<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: T extends Promise<infer ItemType>
	? Replacer extends Promise<infer ReplacerItemType>
		? ReplacerItemType extends DeepModify<ItemType, Builtin>
			? Promise<DeepReplace<ItemType, ReplacerItemType>>
			: T
		: T
	: Replacer extends AnyRecord
	? T extends AnyRecord
		? {
				[K in keyof T]: Replacer[K & keyof Replacer] extends true
					? T[K]
					: K extends keyof Replacer
					? Replacer[K] extends DeepModify<T[K], Builtin>
						? DeepReplace<T[K], Replacer[K]>
						: Replacer[K]
					: never;
		  }
		: Replacer
	: never;
