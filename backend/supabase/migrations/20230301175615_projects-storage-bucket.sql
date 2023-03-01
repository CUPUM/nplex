insert into storage.buckets
  (id, name, public)
values
  ('app', 'app', true),
  ('users', 'users', true),
  ('projects', 'projects', true),
  ('organisations', 'organisations', true),
  ('actors', 'actors', true);

-- alter table storage.buckets