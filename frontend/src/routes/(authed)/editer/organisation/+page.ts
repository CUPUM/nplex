export const load = async (event) => {
	return {
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{
				title: 'Création d’organisation',
				href: '/editer/organisation',
			},
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
