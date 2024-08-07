export const USER_PASSWORD_MIN = 8;
export const USER_FIRSTNAME_MAX = 250;
export const USER_MIDDLENAME_MAX = 250;
export const USER_LASTNAME_MAX = 250;

export const PROJECT_TITLE_MAX = 250;
export const PROJECT_SUMMARY_MAX = 1_500;
export const PROJECT_DESCRIPTION_MAX = 5_000;
export const PROJECT_COST_MIN = 1_000;
export const PROJECT_COST_MAX = 2_500_000;
export const PROJECT_ADJACENT_STREETS_MAX = 5;
export const PROJECT_ADJACENT_ALLEYS_MAX = 5;
export const PROJECT_BUILDING_LEVELS_HEIGHT_MIN = 1;
export const PROJECT_BUILDING_LEVELS_HEIGHT_MAX = 10;
export const PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MIN = 0;
export const PROJECT_BUILDING_LEVELS_VERTICAL_INDEX_MAX = 6;

export const PROJECT_DESCRIPTOR_TYPE_TITLE_MAX = 100;
export const PROJECT_DESCRIPTOR_TYPE_DESCRIPTION_MAX = 1_000;
export const PROJECT_DESCRIPTOR_DELETE_CONFIRM = 'Confirm';

export const ORG_TITLE_MAX = 250;
export const ORG_DESCRIPTION_MAX = 5_000;

export const SORT_ORDERS = {
	ASCENDING: 'asc',
	DESCENDING: 'desc',
} as const;

export const PROJECTS_SORTS = {
	TITLE: 'title',
	CREATED_AT: 'created-at',
	UPDATED_AT: 'updated-at',
} as const;
