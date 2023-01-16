create table "public"."user_role_details" (
    "user_role" user_role not null,
    "label" text not null,
    "description" text not null
);


alter table "public"."user_role_details" enable row level security;

CREATE UNIQUE INDEX user_role_details_label_key ON public.user_role_details USING btree (label);

CREATE UNIQUE INDEX user_role_details_pkey ON public.user_role_details USING btree (user_role);

alter table "public"."user_role_details" add constraint "user_role_details_pkey" PRIMARY KEY using index "user_role_details_pkey";

alter table "public"."user_role_details" add constraint "user_role_details_label_key" UNIQUE using index "user_role_details_label_key";


create policy "Only admins can update" on public.user_role_details
	as permissive
	for update
	using (public.user_has_role('admin'))
	with check (public.user_has_role('admin'));
create policy "Anyone can see role details" on public.user_role_details
	as permissive
	for select
	using (true);


alter table "public"."users_roles" add column "request" user_role;

alter table "public"."users_roles" add column "requested_at" timestamp with time zone;