import type { Role } from '$lib/auth/constants';
import { PERMISSIONS, type PermissionRule } from './constants';

export function roleHasPermission(role: Role, rule?: PermissionRule | null) {
	if (!rule) {
		return false;
	}
	return (PERMISSIONS[rule] as Role[]).indexOf(role) > -1;
}
