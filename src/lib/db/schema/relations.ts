import { relations } from 'drizzle-orm';
import { langs } from './i18n';
import {
	organizationTypes,
	organizationTypesTranslations,
	organizations,
	organizationsTranslations,
	projectBuildingLevelTypes,
	projectBuildingLevelTypesTranslations,
	projectExemplarityCategories,
	projectExemplarityCategoriesTranslations,
	projectExemplarityIndicators,
	projectExemplarityIndicatorsTranslations,
	projectImageTemporalities,
	projectImageTemporalitiesTranslations,
	projectImageTypes,
	projectImageTypesTranslations,
	projectImplantationTypes,
	projectImplantationTypesTranslations,
	projectInterventions,
	projectInterventionsCategories,
	projectInterventionsCategoriesTranslations,
	projectInterventionsTranslations,
	projectSiteOwnerships,
	projectSiteOwnershipsTranslations,
	projectTypes,
	projectTypesToInterventions,
	projectTypesTranslations,
	projects,
	projectsImages,
	projectsImagesTranslations,
	projectsInterventions,
	projectsOrganizations,
	projectsTranslations,
} from './public';

export const projectTypesRelations = relations(projectTypes, ({ many }) => {
	return {
		projects: many(projects),
		translations: many(projectTypesTranslations),
		interventions: many(projectInterventions),
	};
});
export const projectTypesTranslationsRelations = relations(projectTypesTranslations, ({ one }) => {
	return {
		lang: one(langs, {
			fields: [projectTypesTranslations.lang],
			references: [langs.lang],
		}),
		type: one(projectTypes, {
			fields: [projectTypesTranslations.id],
			references: [projectTypes.id],
		}),
	};
});

export const projectInterventionCategoriesRelations = relations(
	projectInterventionsCategories,
	({ many }) => {
		return {
			translations: many(projectInterventionsCategoriesTranslations),
			interventions: many(projectInterventions),
		};
	}
);
export const projectInterventionCategoriesTranslationsRelations = relations(
	projectInterventionsCategoriesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectInterventionsCategoriesTranslations.lang],
				references: [langs.lang],
			}),
			category: one(projectInterventionsCategories, {
				fields: [projectInterventionsCategoriesTranslations.id],
				references: [projectInterventionsCategories.id],
			}),
		};
	}
);

export const projectInterventionsRelations = relations(projectInterventions, ({ many, one }) => {
	return {
		translations: many(projectInterventionsTranslations),
		category: one(projectInterventionsCategories, {
			fields: [projectInterventions.categoryId],
			references: [projectInterventionsCategories.id],
		}),
		types: many(projectTypes),
		projects: many(projects),
	};
});
export const projectInterventionsTranslationsRelations = relations(
	projectInterventionsTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectInterventionsTranslations.lang],
				references: [langs.lang],
			}),
			intervention: one(projectInterventions, {
				fields: [projectInterventionsTranslations.id],
				references: [projectInterventions.id],
			}),
		};
	}
);

export const projectTypesToInterventionsRelations = relations(
	projectTypesToInterventions,
	({ one }) => {
		return {
			type: one(projectTypes, {
				fields: [projectTypesToInterventions.typeId],
				references: [projectTypes.id],
			}),
			intervention: one(projectInterventions, {
				fields: [projectTypesToInterventions.interventionId],
				references: [projectInterventions.id],
			}),
		};
	}
);

export const projectSiteOwnershipsRelations = relations(projectSiteOwnerships, ({ many }) => {
	return {
		translations: many(projectSiteOwnershipsTranslations),
	};
});
export const projectSiteOwnershipsTranslationsRelations = relations(
	projectSiteOwnershipsTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectSiteOwnershipsTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectSiteOwnerships, {
				fields: [projectSiteOwnershipsTranslations.id],
				references: [projectSiteOwnerships.id],
			}),
		};
	}
);

export const projectImplantationTypesRelations = relations(projectImplantationTypes, ({ many }) => {
	return {
		translations: many(projectImplantationTypesTranslations),
	};
});
export const projectImplantationTypesTranslationsRelations = relations(
	projectImplantationTypesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectImplantationTypesTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectImplantationTypes, {
				fields: [projectImplantationTypesTranslations.id],
				references: [projectImplantationTypes.id],
			}),
		};
	}
);

export const projectExemplarityCategoriesRelations = relations(
	projectExemplarityCategories,
	({ many }) => {
		return {
			translations: many(projectExemplarityCategoriesTranslations),
			indicators: many(projectExemplarityIndicators),
		};
	}
);
export const projectExemplarityCategoriesTranslationsRelations = relations(
	projectExemplarityCategoriesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectExemplarityCategoriesTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectExemplarityCategories, {
				fields: [projectExemplarityCategoriesTranslations.id],
				references: [projectExemplarityCategories.id],
			}),
		};
	}
);

export const projectExemplarityIndicatorsRelations = relations(
	projectExemplarityIndicators,
	({ many, one }) => {
		return {
			category: one(projectExemplarityCategories, {
				fields: [projectExemplarityIndicators.categoryId],
				references: [projectExemplarityCategories.id],
			}),
			translations: many(projectExemplarityIndicatorsTranslations),
		};
	}
);
export const projectExemplarityIndicatorsTranslationsRelations = relations(
	projectExemplarityIndicatorsTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectExemplarityIndicatorsTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectExemplarityIndicators, {
				fields: [projectExemplarityIndicatorsTranslations.id],
				references: [projectExemplarityIndicators.id],
			}),
		};
	}
);

export const projectImageTypesRelations = relations(projectImageTypes, ({ many }) => {
	return {
		translations: many(projectImageTypesTranslations),
	};
});
export const projectImageTypesTranslationsRelations = relations(
	projectImageTypesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectImageTypesTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectImageTypes, {
				fields: [projectImageTypesTranslations.id],
				references: [projectImageTypes.id],
			}),
		};
	}
);

export const projectImageTemporalitiesRelations = relations(
	projectImageTemporalities,
	({ many }) => {
		return {
			translations: many(projectImageTemporalitiesTranslations),
		};
	}
);
export const projectImageTemporalitiesTranslationsRelations = relations(
	projectImageTemporalitiesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectImageTemporalitiesTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectImageTemporalities, {
				fields: [projectImageTemporalitiesTranslations.id],
				references: [projectImageTemporalities.id],
			}),
		};
	}
);

export const projectBuildingLevelTypesRelations = relations(
	projectBuildingLevelTypes,
	({ many }) => {
		return {
			translations: many(projectBuildingLevelTypesTranslations),
		};
	}
);
export const projectBuildingLevelTypesTranslationsRelations = relations(
	projectBuildingLevelTypesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [projectBuildingLevelTypesTranslations.lang],
				references: [langs.lang],
			}),
			siteOwnership: one(projectBuildingLevelTypes, {
				fields: [projectBuildingLevelTypesTranslations.id],
				references: [projectBuildingLevelTypes.id],
			}),
		};
	}
);

export const projectsRelations = relations(projects, ({ one, many }) => {
	return {
		translations: many(projectsTranslations),
		interventions: many(projectsInterventions),
		images: many(projectsImages),
		organizations: many(projectsOrganizations),
		type: one(projectTypes, {
			fields: [projects.typeId],
			references: [projectTypes.id],
		}),
	};
});
export const projectsTranslationsRelations = relations(projectsTranslations, ({ one }) => {
	return {
		lang: one(langs, {
			fields: [projectsTranslations.lang],
			references: [langs.lang],
		}),
		project: one(projects, {
			fields: [projectsTranslations.id],
			references: [projects.id],
		}),
	};
});

export const projectsInterventionsRelations = relations(projectsInterventions, ({ one }) => {
	return {
		project: one(projects, {
			fields: [projectsInterventions.projectId],
			references: [projects.id],
		}),
		intervention: one(projectInterventions, {
			fields: [projectsInterventions.interventionId],
			references: [projectInterventions.id],
		}),
	};
});

export const projectsImagesRelations = relations(projectsImages, ({ one, many }) => {
	return {
		translations: many(projectsImagesTranslations),
		project: one(projects, {
			fields: [projectsImages.projectId],
			references: [projects.id],
		}),
	};
});
export const projectsImagesTranslationsRelations = relations(
	projectsImagesTranslations,
	({ one }) => {
		return {
			image: one(projectsImages, {
				fields: [projectsImagesTranslations.id],
				references: [projectsImages.id],
			}),
		};
	}
);

// export const projectsImagesCreditsRelations = relations(projectsImagesCredits, ({one}) => {

// })
// export const projectsImagesCreditsDetails

export const projectsOrganizationsRelations = relations(projectsOrganizations, ({ one }) => {
	return {
		project: one(projects, {
			fields: [projectsOrganizations.projectId],
			references: [projects.id],
		}),
		organization: one(organizations, {
			fields: [projectsOrganizations.organizationId],
			references: [organizations.id],
		}),
	};
});

export const organizationTypesRelations = relations(organizationTypes, ({ many }) => {
	return {
		organizations: many(organizations),
		translations: many(organizationTypesTranslations),
	};
});
export const organizationTypesTranslationsRelations = relations(
	organizationTypesTranslations,
	({ one }) => {
		return {
			lang: one(langs, {
				fields: [organizationTypesTranslations.lang],
				references: [langs.lang],
			}),
			type: one(organizationTypes, {
				fields: [organizationTypesTranslations.id],
				references: [organizationTypes.id],
			}),
		};
	}
);

export const organizationsRelations = relations(organizations, ({ many, one }) => {
	return {
		translations: many(organizationsTranslations),
		projects: many(projectsOrganizations),
		type: one(organizationTypes, {
			fields: [organizations.typeId],
			references: [organizationTypes.id],
		}),
	};
});
export const organizationsTranslationsRelations = relations(
	organizationsTranslations,
	({ one }) => {
		return {
			organization: one(organizations, {
				fields: [organizationsTranslations.id],
				references: [organizations.id],
			}),
		};
	}
);
