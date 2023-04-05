import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
	ACTOR_FIRSTNAME_MAX,
	ACTOR_FIRSTNAME_MIN,
	ACTOR_LASTNAME_MAX,
	ACTOR_LASTNAME_MIN,
} from './constants';

const actorFirstNameSchema = zfd.text(z.string().min(ACTOR_FIRSTNAME_MIN).max(ACTOR_FIRSTNAME_MAX));

const actorLastNameSchema = zfd.text(z.string().min(ACTOR_LASTNAME_MIN).max(ACTOR_LASTNAME_MAX));

export const actorCreateSchema = zfd.formData({
	first_name: actorFirstNameSchema,
});
