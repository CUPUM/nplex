export const organizationTypesSchema = createInsertSchema(organizationTypes).required({ id: true });

export const organizationTypesTranslationsSchema = createInsertSchema(
	organizationTypesTranslations,
	{
		title: (s) => s.title.trim(),
		description: (s) => s.description.trim(),
	}
);

export const organizationTypesWithTranslationsSchema = withTranslationsSchema(
	organizationTypesSchema,
	organizationTypesTranslationsSchema.omit({ id: true })
);

export const newOrganizationTypeSchema = organizationTypesWithTranslationsSchema.omit({ id: true });

export const organizationsSchema = createInsertSchema(organizations).required({ id: true });

export const organizationsTranslationsSchema = createInsertSchema(organizationsTranslations, {
	name: (s) => s.name.trim(),
	summary: (s) => s.summary.trim(),
	description: (s) => s.description.trim(),
});

export const organizationsWithTranslationsSchema = withTranslationsSchema(
	organizationsSchema,
	organizationsTranslationsSchema.omit({ id: true })
);
