/// <reference types="@sveltejs/kit" />

// IMPORTANT:
// For global types to work properly, external types have to be imported using the dynamic import syntax: `import(...)`

// Extend elements typing to allow custom attributes added using `use` directives (actions).
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onclickoutside?: (event?: CustomEvent) => unknown;
		onenter?: (event?: CustomEvent) => unknown;
		onleave?: (event?: CustomEvent) => unknown;
	}
}

type Cookie = import('$utils/values/keys').Cookie.DbAccessToken;

type TokenCookies = Partial<
	Record<
		| import('$utils/values/keys').Cookie.DbAccessToken
		| import('$utils/values/keys').Cookie.DbRefreshToken
		| import('$utils/values/keys').Cookie.DbProviderToken
		| import('$utils/values/keys').Cookie.DbAccessTokenExpiry,
		string
	>
>;

type AuthCookie = Partial<
	Record<
		import('$utils/values/keys').Cookie.AuthChange,
		{
			session: import('@supabase/supabase-js').Session;
			event: import('@supabase/supabase-js').AuthChangeEvent;
		} | null
	>
>;

declare namespace App {
	interface Locals extends TokenCookies, AuthCookie {
		test: string;
	}
}
