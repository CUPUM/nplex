/**
 * Since the open-api type generation does not include RPC (Postgres functions) return types, we here define the
 * relevant ones manually.
 */

namespace DatabaseRpc {
	/**
	 * Rpc: 'public.get_project_descriptors'.
	 */
	export interface ProjectDescriptors {
		types: {
			id: number;
			title: string;
			description: string;
		}[];
		site_usages: {
			id: number;
			title: string;
			description: string;
		}[];
		site_usages_categories: {
			id: number;
			title: string;
			description: string;
		}[];
		site_ownerships: {
			id: number;
			title: string;
			description: string;
		}[];
	}
}
