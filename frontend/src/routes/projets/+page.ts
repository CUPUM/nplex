import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
	return {
		stuff: {
			showFooter: false,
		},
	};
}
