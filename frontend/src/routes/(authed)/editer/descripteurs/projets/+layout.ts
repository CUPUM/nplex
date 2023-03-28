import EditorSidebarProjectDescriptors from '$routes/(authed)/editer/descripteurs/projets/EditorSidebarProjectDescriptors.svelte';

export const load = async (event) => {
	// console.log(event.parent);
	return {
		editorSidebar: EditorSidebarProjectDescriptors,
		editorBreadcrumbs: [
			...(await event.parent()).editorBreadcrumbs,
			{ href: '/editer/descripteurs/projets', title: 'Projets' },
		] satisfies App.PageData['editorBreadcrumbs'],
	};
};
