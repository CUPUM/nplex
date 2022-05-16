/// <reference types="@sveltejs/kit" />

/** For clickoutside directive See: https://stackoverflow.com/questions/64131176/svelte-custom-event-on-svelte-typescript */
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclickoutside?: (event?: CustomEvent) => any;
	}
}

/** Augment svelte's session interface else ts cries like a lil baby */
declare namespace App {
	/** _Customization notes:_ Extending the session type to include User typing provided by Supabase's library. */
	interface Session {
		/** User typing provided by Supabase and corresponding to the data form the `auth.users` table. */
		user: import('@supabase/supabase-js').User;
		/**
		 * Profile data extending the user data, corresponding to user-specific content of the `public.profiles` table.
		 *
		 * **To do: generate types from schema.**
		 */
		profile?: any;
		/** Prop to store the session's previous navigation to be used in auth */
		prevnav: string;
	}

	/** _Customization notes:_ Accepting the proper params to reflect the sesssion's stored user in hooks. */
	interface Locals {
		user?: App.Session['user'];
	}
}
