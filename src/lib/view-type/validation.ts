import { VIEW_TYPES_ARR, type ViewType } from './constants';

export function isViewType(maybeViewType: unknown): maybeViewType is NonNullable<ViewType> {
	return VIEW_TYPES_ARR.indexOf(maybeViewType as ViewType) > -1;
}