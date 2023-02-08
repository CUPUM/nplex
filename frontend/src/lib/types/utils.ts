import type { KeyofBase } from 'ts-essentials';

/**
 * General purpose type utils.
 *
 * Providing unexported ts helper from ts-essentials, and more.
 */

export type AnyRecord<T = any> = Record<KeyofBase, T>;

export type NonUndefinable<T> = T extends undefined ? never : T;

export type Arrify<T> = T extends null | undefined ? [] : T extends readonly unknown[] ? T : [T];

export type Single<T> = T extends readonly unknown[] ? T[0] : never;

export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;

export type KeyOfSet<S extends Set<unknown>> = S extends Set<infer K> ? K : never;
