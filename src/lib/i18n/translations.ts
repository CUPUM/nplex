import { defineTranslations } from './translate';

/**
 * Shared messages.
 */
export const tt = defineTranslations({
	fr: {
		editor: {
			invalid: {
				title: 'Données non valides',
				description: 'Les données fournies ne respectent pas les contraintes.',
			},
			error: {
				title: 'Erreur',
				description: 'Une erreur est survenue.',
			},
			success: {
				title: 'Succès!',
				description: 'Données enregistrées avec succès.',
			},
		},
	},
	en: {
		editor: {
			invalid: {
				title: 'Invalid data',
				description: 'The data you entered does not appear to respect all required constraints.',
			},
			error: {
				title: 'Error',
				description: 'An error occured on the server.',
			},
			success: {
				title: 'Success!',
				description: 'Data saved successfully.',
			},
		},
	},
});
