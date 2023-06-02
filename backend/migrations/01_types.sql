--
-- App enums.
-- 

create type "public"."app_role" as enum ('nplex', 'admin', 'editor', 'visitor');

create type "public"."app_permission" as enum ('project_insert', 'project_delete', 'project_update', 'project_select', 'project_publish');

create type "public"."publication_status" as enum ('unpublished', 'pending_approval', 'rejected_approval', 'published');