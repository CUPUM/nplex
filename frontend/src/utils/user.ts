/**
 * List of roles declared in supabase and associated with users.
 * The enum's values should correspond to the user.role values returned by the supabase client.
 * Useful to compare the current $session.user.role to various guards across the app.
 */
export enum UserRole {
	Anon = 'anon',
	Visitor = 'visitor',
	Editor = 'editor',
	Admin = 'admin'
}

export function getUserRole(roleValue: string) {
	return Object.entries(UserRole).find(([k, v]) => v === roleValue)?.[1];
}