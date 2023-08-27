import type { ValueOf } from 'type-fest';

export const USER_ROLES = {
	ADMIN: 'admin',
	EDITOR: 'editor',
	VISITOR: 'visitor',
} as const;

export type UserRole = ValueOf<typeof USER_ROLES>;

export const USER_ROLES_ARR = Object.values(USER_ROLES);

export const USER_ROLE_DEFAULT = USER_ROLES.VISITOR;

export type UserRoleDefault = typeof USER_ROLE_DEFAULT;
