import EditorHeaderProjectsDescriptors from '$routes/(authed)/editer/descripteurs/projets/EditorHeaderProjectsDescriptors.svelte';

export const load = async (event) => {
	return {
		editorHeader: EditorHeaderProjectsDescriptors,
	};
};
