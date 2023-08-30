-- Custom SQL migration file, put you code below! --
CREATE SCHEMA IF NOT EXISTS "extensions";

CREATE EXTENSION IF NOT EXISTS "postgis" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "cube" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch" WITH SCHEMA "extensions";