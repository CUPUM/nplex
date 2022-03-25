import type { RequestHandler } from '@sveltejs/kit';

const projects_domains = [
	{
		name: 'commercial',
		title: 'Commercial'
	},
	{
		name: 'public',
		title: 'Public'
	},
	{
		name: 'residential',
		title: 'Résidentiel'
	}
]

const projects_sites_types_groups = [
	{
		title: 'Type de propriété',
		name: 'property type'
	},
	{
		title: 'Typologie de bâtiment',
		name: 'building type'
	},
	{
		title: 'Vocation du site',
		name: 'occupation type'
	}
]

const projects_sites_types = [
	{
		title: 'Unifamilial',
		group_id: 0
	},
	{
		title: 'Duplex',
		group_id: 0
	},
	{
		title: 'Triplex',
		group_id: 0
	},
	{
		title: 'Quadruplex',
		group_id: 0
	},
	{
		title: 'Quintuplex',
		group_id: 0
	},
	{
		title: 'Sixplex',
		group_id: 0
	},
	{
		title: 'Bloc appartement',
		group_id: 0
	},
	{
		title: 'Condo',
		group_id: 0
	},
	{
		title: 'Maison détachée',
		group_id: 1
	},
	{
		title: 'Maison jumelée ou semi-détachée',
		group_id: 1
	},
	{
		title: 'Immeuble d\'habitation',
		group_id: 1
	},
	{
		title: 'Maison en rangée',
		group_id: 1
	},
	{
		title: 'Shoebox',
		group_id: null
	}
]

export const get: RequestHandler = async ({ }) => {
	return {
		status: 200,
		body: {
			projects_domains,
			projects_sites_types_groups: projects_sites_types_groups.map((g, i) => {
				return {
					...g,
					types: projects_sites_types.filter((t) => t.group_id === i)
				}
			})
		}
	}
}