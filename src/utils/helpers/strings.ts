type Casing = 'sentence' | 'title'

export function capitalize(string: string, casing: Casing = 'sentence'): string {
	if (casing === 'sentence') {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	else {
		return string.split(' ').map(word => capitalize(word)).join(' ');
	}
}