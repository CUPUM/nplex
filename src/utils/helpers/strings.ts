import { mergeObjects } from "./objects";


const unitsRegex = /px|%|em|vh|vw|rem/;

export function getUnits(input: string | number) {
	if (typeof input === 'number') {
		return null;
	}
	return input.match(unitsRegex)[0] || null;
}


// interface CapitalizeOptions {
// 	targetCasing?: 'sentence' | 'title',
// 	ignoreInner?: boolean
// }

// const defaultCapitalizeOptions: CapitalizeOptions = {
// 	targetCasing: 'sentence',
// 	ignoreInner: true,
// }

// /**
//  * Takes a string and returns it with modified capitalization.
//  */
// export function capitalize(string: string, options?: CapitalizeOptions): string {
// 	const {targetCasing, ignoreInner} = mergeObjects({...defaultCapitalizeOptions}, options);
// 	if (targetCasing === 'sentence') {
// 		return string.charAt(0).toUpperCase() + string.slice(1);
// 	}
// 	else {
// 		return string.split(' ').map(word => capitalize(word)).join(' ');
// 	}
// }

// interface SentencizeOptions extends CapitalizeOptions {
// 	sourceCasing?: 'mixed' | 'camel' | 'pascal' | 'kebab' | 'snake',
// }

// const defaultSentencizeOptions: SentencizeOptions = {
// 	sourceCasing: 'mixed',
// 	...defaultCapitalizeOptions
// }


// /**
//  * Takes a string and returns it formatted as a sentence with capitalization and
//  * spaces inserted where the original casing prescribes, according to the passed
//  * casing convention option.
//  */
// export function sentencize(string: string, ) {
// 	return;
// }