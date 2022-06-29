import { goto } from '$app/navigation';
import { loadingCategory } from '$stores/navigation';
import type { ExploreRoute } from './routes';

/**
 * Navigation helper to navigate to an explore category's index while setting the relevant store values.
 */
export async function gotoCategory(route: ExploreRoute) {
	loadingCategory.set(route.category);
	await goto(route.pathname);
	loadingCategory.set(null);
}
