const projects_domains = [
    {
        domain: 'commercial'
    },
    {
        domain: 'public'
    },
    {
        domain: 'residential'
    }
]

const projects_site_types_groups = [
    {
        site_type_group: 'Type de propriété'
    },
    {
        site_type_group: 'Typologie de bâtiment'
    },
    {
        site_type_group: 'Vocation du site'
    }
]

const projects_site_types = [
    {
        site_type: 'Unifamilial',
        site_type_group_id: 0
    },
    {
        site_type: 'Duplex',
        site_type_group_id: 0
    },
    {
        site_type: 'Triplex',
        site_type_group_id: 0
    },
    {
        site_type: 'Quadruplex',
        site_type_group_id: 0
    },
    {
        site_type: 'Quintuplex',
        site_type_group_id: 0
    },
    {
        site_type: 'Sixplex',
        site_type_group_id: 0
    },
    {
        site_type: 'Bloc appartement',
        site_type_group_id: 0
    },
    {
        site_type: 'Condo',
        site_type_group_id: 0
    },
    {
        site_type: 'Maison détachée',
        site_type_group_id: 1
    },
    {
        site_type: 'Maison jumelée ou semi-détachée',
        site_type_group_id: 1
    },
    {
        site_type: 'Immeuble d\'habitation',
        site_type_group_id: 1
    },
    {
        site_type: 'Maison en rangée',
        site_type_group_id: 1
    },
    {
        site_type: 'Shoebox',
        site_type_group_id: null
    }
]

export async function get({ }) {
    return {
        projects_site_type: projects_site_types.map(type => ({ ...type, site_type_group: projects_site_types_groups[type.site_type_group_id] }))
    }
}