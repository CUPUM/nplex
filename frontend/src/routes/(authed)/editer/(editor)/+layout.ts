export const load = async (event) => {
	return {
		editorBreadcrumbs: [
			{
				title: 'Éditeur',
				href: '/editer',
			},
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
