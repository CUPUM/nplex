-- 
-- Postgis can be troublesome when using the CLI and umst be added manually to the migration for things to work properly.
-- See https://github.com/supabase/cli/issues/380 for context.
-- 

create extension if not exists "postgis" with schema "extensions";

create extension if not exists "cube" with schema "extensions";

create extension if not exists "uuid-ossp" with schema "extensions";

create extension if not exists "fuzzystrmatch" with schema "extensions";