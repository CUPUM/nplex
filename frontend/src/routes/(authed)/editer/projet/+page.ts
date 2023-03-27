export const load = async (event) => {
	return {
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{
				title: 'Création de projet',
				href: '/editer/projet',
			},
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
