import { goto } from '$app/navigation';
import { isExploreArticle } from '$stores/explore';
import { loadingCategory } from '$stores/navigation';
import type { ExploreRoute } from './routes';

/**
 * Navigation helper to navigate to an explore category's index while setting the relevant store values.
 */
export async function gotoCategory(route: ExploreRoute) {
	isExploreArticle.set(false);
	loadingCategory.set(route.category);
	await goto(route.pathname);
	loadingCategory.set(null);
}
