import { ROLES, type Role } from '$lib/auth/constants';
import type { ValueOf } from 'type-fest';

/**
 * CRUD-related operations.
 */
export const OPERATIONS = {
	CREATE: 'create',
	READ: 'read',
	UPDATE: 'update',
	DELETE: 'delete',
} as const;

export type Operation = ValueOf<typeof OPERATIONS>;

/**
 * Collection of role-based CRUD permissions used as a basis for both client-side styling (disabling
 * links, buttons, etc.) and server-side authorization (route-guarding, form-action guarding,
 * etc.);
 */
export const PERMISSIONS = {
	'projects.descriptors.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.types.create': [ROLES.ADMIN],
	'projects.descriptors.types.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.types.delete': [ROLES.ADMIN],
	'projects.descriptors.interventions.create': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.interventions.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.interventions.delete': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.interventionCategories.create': [ROLES.ADMIN],
	'projects.descriptors.interventionCategories.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.interventionCategories.delete': [ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.create': [ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.update': [ROLES.ADMIN],
	'projects.descriptors.siteOwnerships.delete': [ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.create': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.exemplarityIndicators.delete': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.create': [ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.update': [ROLES.EDITOR, ROLES.ADMIN],
	'projects.descriptors.exemplarityCategories.delete': [ROLES.ADMIN],
	'projects.descriptors.implantationTypes.create': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.implantationTypes.update': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.implantationTypes.delete': [ROLES.ADMIN],
	'projects.descriptors.buildingLevelTypes.create': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.buildingLevelTypes.update': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.buildingLevelTypes.delete': [ROLES.ADMIN],
	'projects.descriptors.imageTypes.create': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.imageTypes.update': [ROLES.ADMIN, ROLES.EDITOR],
	'projects.descriptors.imageTypes.delete': [ROLES.ADMIN, ROLES.EDITOR],
	'organizations.descriptors.update': [ROLES.EDITOR, ROLES.ADMIN],
	'organizations.descriptors.types.create': [ROLES.ADMIN],
	'organizations.descriptors.types.update': [ROLES.EDITOR, ROLES.ADMIN],
	'organizations.descriptors.types.delete': [ROLES.ADMIN],
} as const satisfies Record<`${string}.${Operation}`, Role[]>;

export type PermissionRule = keyof typeof PERMISSIONS;
