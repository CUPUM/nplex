--
-- Setup enums.
-- 

create type "public"."publication_status" as enum ('unpublished', 'pending_approval', 'rejected_approval', 'published');

create type "public"."user_role" as enum ('nplex', 'admin', 'editor', 'visitor');