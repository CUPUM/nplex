/// <reference types="@sveltejs/kit" />

// IMPORTANT:
// For global types to work properly, external types have to be imported using the dynamic import syntax: `import(...)`

// For custom attributes added using use-directives (actions).
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclickoutside?: (event?: CustomEvent) => unknown;
		onenter?: (event?: CustomEvent) => unknown;
		onleave?: (event?: CustomEvent) => unknown;
	}
}

declare namespace App {
	interface Locals extends Partial<Record<import('$utils/values/keys').Cookie, string>> {}
	/**
	 * _Customization notes:_ Extending the session type to include User typing provided by Supabase's library.
	 */
	interface Session {
		/**
		 * Customized session user typing, based on User provided by Supabase (corresponding to the data form the
		 * `auth.users` table) and extended with additional data from public schema. Keep the appended data to a minimum.
		 */
		user?: import('@supabase/supabase-js').User & {
			role: import('$types/database').definitions['users_roles']['role'];
		};
		/**
		 * Storing the client session's previous navigation for various usages and redirect cases.
		 */
		previousUrl?: string;
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
}
