-- 
-- Register default 'nplex' user.
-- 

insert into auth.users (
        id,
        instance_id,
        role,
        aud,
        email,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        encrypted_password,
        created_at,
        updated_at,
        last_sign_in_at,
        email_confirmed_at,
        confirmation_sent_at,
        confirmation_token,
        recovery_token,
        email_change_token_new,
        email_change
    )
values (
        extensions.uuid_generate_v4(),
        '00000000-0000-0000-0000-000000000000',
        'authenticated',
        'authenticated',
        'default@nplex.design',
        '{"provider":"email","providers":["email"]}',
        '{}',
        false,
        '',
        NOW(),
        NOW(),
        NOW(),
        NOW(),
        NOW(),
        '',
        '',
        '',
        ''
    );