const translations = {
	nplex: 'Nplex',
	visitor: 'Visiteur',
	editor: 'Éditeur',
	admin: 'Administrateur',
};

export function translate(input: string | number) {
	if (!translations[input]) console.error('Aucune traduction trouvée pour ' + input);
	return translations[input] || input;
}
