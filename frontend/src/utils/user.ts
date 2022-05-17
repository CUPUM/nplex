/**
 * List of roles declared in supabase and associated with users. The enum's values should correspond to the user.role
 * values returned by the supabase client. Useful to compare the current $session.user.role to various guards across the app.
 */
export enum UserRole {
	/**
	 * Signed-in visitor, aka user with an account but no publication rights.
	 */
	Visitor = 'visitor',
	/**
	 * Content creator and editor.
	 */
	Editor = 'editor',
	/**
	 * Administrator.
	 */
	Admin = 'admin',
}

/**
 * Array corresponding to all roles for signed-in users. Useful for guards where the true criteria can be summarized to
 * a user simply needing an account.
 */
export const allRoles = Object.keys(UserRole) as UserRole[];

/**
 * Helper to retrieve the corresponding enum-typed value based on a string input. Useful for comparisons.
 */
export function toUserRoleEnum(roleValue: string) {
	return Object.entries(UserRole).find(([k, v]) => v === roleValue)?.[1];
}
