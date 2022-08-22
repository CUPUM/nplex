select
  json_build_object(
    'types',
    (
      select
        json_agg(row_to_json(t))
      FROM
        public.project_type t
    ),
    'sub_types',
    (
      select
        json_agg(row_to_json(t))
      FROM
        public.project_sub_type t
    ),
    'site_usages_categories',
    (
      select
        json_agg(row_to_json(suc))
      FROM
        public.project_site_usage_category suc
    ),
    'site_usages',
    (
      select
        json_agg(row_to_json(su))
      FROM
        public.project_site_usage su
    ),
    'site_ownerships',
    (
      select
        json_agg(row_to_json(so))
      FROM
        public.project_site_ownership so
    )
  )