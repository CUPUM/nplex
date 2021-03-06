/// <reference types="@sveltejs/kit" />

/**
 * For global types to work properly, external types have to be imported using the dynamic import syntax: `import(...)`
 */

/**
 * For clickoutside directive See: https://stackoverflow.com/questions/64131176/svelte-custom-event-on-svelte-typescript.
 */
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclickoutside?: (event?: CustomEvent) => unknown;
		onenter?: (event?: CustomEvent) => unknown;
		onleave?: (event?: CustomEvent) => unknown;
	}
}

/**
 * Augment svelte's session interface else TS cries.
 */
declare namespace App {
	/**
	 * _Customization notes:_ Extending the session type to include User typing provided by Supabase's library.
	 */
	interface Session {
		/**
		 * Customized session user typing, based on User provided by Supabase (corresponding to the data form the
		 * `auth.users` table) and extended with additional data from public schema. Keep the appended data to a minimum.
		 */
		user?: import('@supabase/supabase-js').User & {
			role: import('$utils/user').UserRole;
		};
		/**
		 * Storing the client session's previous navigation for various usages and redirect cases.
		 */
		previousUrl?: string;
		// /**
		//  * Initial client url (first-load), to be used for re-redirecting if client has successful automatic signin.
		//  * Useful for properly returning to auth-guarded pages after a client refreshes.
		//  */
		// initialUrl?: string;
		/**
		 * Client's user-agent / device detected server-side.
		 */
		// device: import('$types/device').Device;
	}

	interface Stuff {
		/**
		 * Category currently being explored.
		 */
		category: import('$types/categories').Category;
		/**
		 * Display state of the category nav.
		 */
		showCategoryNav: boolean;
		/**
		 * Is the current category resetable, i.e, can the user reclick its switchItem to return to the category's index?
		 */
		categoryIsResetable: boolean;
		/**
		 * Display state of the explore searchbar.
		 */
		showExploreSearchbar: boolean;
		/**
		 * Display state of the app's footer.
		 */
		showFooter: boolean;
		/**
		 * Display state for the editor routes' aside panel.
		 */
		showEditorAside: boolean;
	}

	/**
	 * _Customization notes:_ Accepting the proper params to reflect the sesssion's stored user in hooks.
	 */
	// interface Locals {
	// 	user?: App.Session['user'];
	// 	profile?: App.Session['user'];
	// 	prevnav: App.Session['prevnav'];
	// }
}
