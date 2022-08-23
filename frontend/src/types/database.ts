export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      project_event_type: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          durative: boolean;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          durative: boolean;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          durative?: boolean;
        };
      };
      project_event_child_type: {
        Row: {
          id: number;
          type_id: number;
          child_type_id: number;
        };
        Insert: {
          id?: number;
          type_id: number;
          child_type_id: number;
        };
        Update: {
          id?: number;
          type_id?: number;
          child_type_id?: number;
        };
      };
      project_site_usage_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      project_site_usage_parent_category: {
        Row: {
          id: number;
          usage_id: number;
          category_id: number;
        };
        Insert: {
          id?: number;
          usage_id: number;
          category_id: number;
        };
        Update: {
          id?: number;
          usage_id?: number;
          category_id?: number;
        };
      };
      project_site_usage: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          is_building: boolean | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          is_building?: boolean | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          is_building?: boolean | null;
        };
      };
      project_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      project_type_parent_category: {
        Row: {
          category_id: number;
          type_id: number;
        };
        Insert: {
          category_id: number;
          type_id: number;
        };
        Update: {
          category_id?: number;
          type_id?: number;
        };
      };
      project_type: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      users_profiles: {
        Row: {
          user_id: string;
          published_email: string | null;
          avatar_url: string | null;
          firstname: string | null;
          middlename: string | null;
          lastname: string | null;
          about: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          published_email?: string | null;
          avatar_url?: string | null;
          firstname?: string | null;
          middlename?: string | null;
          lastname?: string | null;
          about?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          published_email?: string | null;
          avatar_url?: string | null;
          firstname?: string | null;
          middlename?: string | null;
          lastname?: string | null;
          about?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_implantation_mode: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      project_site_ownership: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      projects_events: {
        Row: {
          project_id: string;
          type_id: number;
          parent_id: string | null;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          project_id: string;
          type_id: number;
          parent_id?: string | null;
          title: string;
          description?: string | null;
          start_date: string;
          end_date?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          project_id?: string;
          type_id?: number;
          parent_id?: string | null;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      projects_events_ressources: {
        Row: {
          event_id: string;
          project_id: string;
          title: string;
          description: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          event_id: string;
          project_id: string;
          title: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          event_id?: string;
          project_id?: string;
          title?: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      project_material_type: {
        Row: {
          id: number;
          title: string;
          label: string | null;
          description: string | null;
          combustible: boolean | null;
        };
        Insert: {
          id?: number;
          title: string;
          label?: string | null;
          description?: string | null;
          combustible?: boolean | null;
        };
        Update: {
          id?: number;
          title?: string;
          label?: string | null;
          description?: string | null;
          combustible?: boolean | null;
        };
      };
      projects_materials: {
        Row: {
          project_id: string;
          material_type_id: number;
          origin_id: number | null;
          sustainability: number | null;
          description: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          project_id: string;
          material_type_id: number;
          origin_id?: number | null;
          sustainability?: number | null;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          project_id?: string;
          material_type_id?: number;
          origin_id?: number | null;
          sustainability?: number | null;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      project_material_origin: {
        Row: {
          id: number;
          title: string;
          label: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          label: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          label?: string;
          description?: string | null;
        };
      };
      project_material_use: {
        Row: {
          id: number;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
        };
      };
      projects_materials_uses: {
        Row: {
          id: number;
          project_id: string;
          project_material_id: string;
          material_use_id: number;
          description: string | null;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          project_id: string;
          project_material_id: string;
          material_use_id: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          project_id?: string;
          project_material_id?: string;
          material_use_id?: number;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      projects_publication_status: {
        Row: {
          project_id: string;
          updated_by_id: string;
          updated_at: string;
          status:
            | "unpublished"
            | "pending_approval"
            | "refused_approval"
            | "published";
        };
        Insert: {
          project_id: string;
          updated_by_id: string;
          updated_at?: string;
          status?:
            | "unpublished"
            | "pending_approval"
            | "refused_approval"
            | "published";
        };
        Update: {
          project_id?: string;
          updated_by_id?: string;
          updated_at?: string;
          status?:
            | "unpublished"
            | "pending_approval"
            | "refused_approval"
            | "published";
        };
      };
      projects_ratings: {
        Row: {
          id: number;
          user_id: string;
          project_id: string;
          rating: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          project_id: string;
          rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          project_id?: string;
          rating?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects_users: {
        Row: {
          id: number;
          project_id: string;
          user_id: string;
          created_at: string;
          granted_role: "admin" | "editor" | "visitor";
          modified_at: string;
        };
        Insert: {
          id?: number;
          project_id: string;
          user_id: string;
          created_at?: string;
          granted_role?: "admin" | "editor" | "visitor";
          modified_at?: string;
        };
        Update: {
          id?: number;
          project_id?: string;
          user_id?: string;
          created_at?: string;
          granted_role?: "admin" | "editor" | "visitor";
          modified_at?: string;
        };
      };
      users_projects_collections: {
        Row: {
          title: string;
          description: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          is_published: boolean;
        };
        Insert: {
          title: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          is_published?: boolean;
        };
        Update: {
          title?: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          is_published?: boolean;
        };
      };
      users_projects_collections_items: {
        Row: {
          id: number;
          user_id: string;
          collection_id: string;
          project_id: string;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          collection_id: string;
          project_id: string;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          collection_id?: string;
          project_id?: string;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      users_roles: {
        Row: {
          user_id: string;
          updated_at: string;
          role: "admin" | "editor" | "visitor";
        };
        Insert: {
          user_id: string;
          updated_at?: string;
          role?: "admin" | "editor" | "visitor";
        };
        Update: {
          user_id?: string;
          updated_at?: string;
          role?: "admin" | "editor" | "visitor";
        };
      };
      project_exemplarity_indicator: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          category_id: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          title: string;
          description: string | null;
          site_ownership_id: number | null;
          site_usage_category_id: number | null;
          site_usage_id: number | null;
          site_area: number | null;
          category_id: number;
          area: number | null;
          adjacent_streets: number | null;
          location_geometry: unknown;
          building_area: number | null;
          implantation_mode_id: number | null;
          building_construction_year: number | null;
          cost_min: number;
          cost_max: number;
          type_id: number;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          combustible: boolean;
        };
        Insert: {
          title: string;
          description?: string | null;
          site_ownership_id?: number | null;
          site_usage_category_id?: number | null;
          site_usage_id?: number | null;
          site_area?: number | null;
          category_id: number;
          area?: number | null;
          adjacent_streets?: number | null;
          location_geometry: unknown;
          building_area?: number | null;
          implantation_mode_id?: number | null;
          building_construction_year?: number | null;
          cost_min: number;
          cost_max: number;
          type_id: number;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          combustible: boolean;
        };
        Update: {
          title?: string;
          description?: string | null;
          site_ownership_id?: number | null;
          site_usage_category_id?: number | null;
          site_usage_id?: number | null;
          site_area?: number | null;
          category_id?: number;
          area?: number | null;
          adjacent_streets?: number | null;
          location_geometry?: unknown;
          building_area?: number | null;
          implantation_mode_id?: number | null;
          building_construction_year?: number | null;
          cost_min?: number;
          cost_max?: number;
          type_id?: number;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          combustible?: boolean;
        };
      };
      projects_exemplarity_indicators: {
        Row: {
          project_id: string;
          exemplarity_indicator_id: number;
          description: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          rating: number;
        };
        Insert: {
          project_id: string;
          exemplarity_indicator_id: number;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          rating: number;
        };
        Update: {
          project_id?: string;
          exemplarity_indicator_id?: number;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          rating?: number;
        };
      };
      project_exemplarity_indicator_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects_programs: {
        Row: {
          id: number;
          project_id: string;
          title: string;
          description: string;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          project_id: string;
          title: string;
          description: string;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          project_id?: string;
          title?: string;
          description?: string;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
    };
    Functions: {
      user_has_role: {
        Args: { VARIADIC: unknown };
        Returns: boolean;
      };
    };
  };
}

