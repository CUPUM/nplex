import { getDb } from '$utils/database';
import { StorageBucket, StorageFolder } from '$utils/enums';
import type { Actions } from './$types';

export const actions: Actions = {
	update: async (event) => {
		if (!event.params.projectId) {
			return;
		}
		const d = await event.request.formData();
		const db = await getDb(event);
		// Do some processing with sharp to produce webp sourcesets...
		const iRes = await db.storage
			.from(StorageBucket.Projects)
			.upload(`${event.params.projectId}/${StorageFolder.Gallery}/some-image-name.jpg`, d);
		console.log(iRes);
	},
	/**
	 * Promote the passed image as the project's banner image. Unsets previous banner.
	 */
	promote: async (event) => {},
	delete: async (event) => {},
};
