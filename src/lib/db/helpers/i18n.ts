// export type InferColumn<C extends PgColumn> = C extends PgColumn<infer T> ? T : never;

// /**
//  * Streamline definition of translations tables' columns and constriants.
//  */
// export function translationsTable<
// 	F extends PgColumn,
// 	T extends Record<string, PgColumnBuilderBase>,
// 	FK = (column: PgColumnBuilderBase) => PgColumn,
// >(foreignColumn: F, columns: (fk: FK) => T) {
// 	let k: string;
// 	const fk = (column: PgColumnBuilderBase) => {
// 		return column.references(() => foreignColumn, {
// 			onDelete: 'cascade',
// 			onUpdate: 'cascade'
// 		})
// 	}
// 	const extraConfig = (table) => {
// 		return {
// 			pk: primaryKey(table.locale, table[k]),
// 		};
// 	};
// 	return [columns(fk), extraConfig] as const;
// }

/**
 * Try to get the contextually accurate translation, i.e. the translation of the current locale.
 * Optionally automatically fallback to the first found translataion for the same text content id,
 * regardless of its locale.
 */
export function getTranslation(autoFallback?: boolean) {
	console.log(autoFallback);
}
