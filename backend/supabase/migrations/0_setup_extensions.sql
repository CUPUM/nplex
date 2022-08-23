create extension if not exists "moddatetime" with schema "public" version '1.0';

-- 
-- The postgis schema can be troublesome when using the CLI and umst be added manually to the migration for things to work properly.
-- See https://github.com/supabase/cli/issues/380 for context.
-- 

create schema if not exists "postgis";

grant usage on schema "postgis" to "postgres";

create extension if not exists "postgis" with schema "postgis";