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
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          durative: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          durative?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      project_event_type_subevent_type: {
        Row: {
          id: number;
          type_id: number;
          subtype_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          type_id: number;
          subtype_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          type_id?: number;
          subtype_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      users_profiles: {
        Row: {
          user_id: string;
          avatar_url: string | null;
          firstname: string | null;
          middlename: string | null;
          lastname: string | null;
          about: string | null;
          public_email: string | null;
          created_at: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          user_id: string;
          avatar_url?: string | null;
          firstname?: string | null;
          middlename?: string | null;
          lastname?: string | null;
          about?: string | null;
          public_email?: string | null;
          created_at?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          user_id?: string;
          avatar_url?: string | null;
          firstname?: string | null;
          middlename?: string | null;
          lastname?: string | null;
          about?: string | null;
          public_email?: string | null;
          created_at?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_exemplarity_indicator_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
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
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          category_id?: number | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          category_id?: number | null;
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
          description: string | null;
          combustible: boolean;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          combustible: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          combustible?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      project_material_use: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      project_site_usage: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          is_building: boolean;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          is_building: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          is_building?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
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
      project_site_usage_site_usage_category: {
        Row: {
          id: number;
          usage_id: number;
          category_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          usage_id: number;
          category_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          usage_id?: number;
          category_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      project_type: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
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
      project_type_category: {
        Row: {
          category_id: number;
          type_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          category_id: number;
          type_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          category_id?: number;
          type_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
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
          category_id: number | null;
          area: number | null;
          adjacent_streets: number | null;
          location_geometry: unknown | null;
          building_area: number | null;
          implantation_mode_id: number | null;
          building_construction_year: number | null;
          cost_min: number | null;
          cost_max: number | null;
          type_id: number | null;
          combustible: boolean | null;
          banner_url: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          site_ownership_id?: number | null;
          site_usage_category_id?: number | null;
          site_usage_id?: number | null;
          site_area?: number | null;
          category_id?: number | null;
          area?: number | null;
          adjacent_streets?: number | null;
          location_geometry?: unknown | null;
          building_area?: number | null;
          implantation_mode_id?: number | null;
          building_construction_year?: number | null;
          cost_min?: number | null;
          cost_max?: number | null;
          type_id?: number | null;
          combustible?: boolean | null;
          banner_url?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          site_ownership_id?: number | null;
          site_usage_category_id?: number | null;
          site_usage_id?: number | null;
          site_area?: number | null;
          category_id?: number | null;
          area?: number | null;
          adjacent_streets?: number | null;
          location_geometry?: unknown | null;
          building_area?: number | null;
          implantation_mode_id?: number | null;
          building_construction_year?: number | null;
          cost_min?: number | null;
          cost_max?: number | null;
          type_id?: number | null;
          combustible?: boolean | null;
          banner_url?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
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
          url: string | null;
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
          url?: string | null;
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
          url?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
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
        };
      };
      projects_likes_sums: {
        Row: {
          project_id: string;
          created_at: string;
          updated_at: string;
          sum: number;
        };
        Insert: {
          project_id: string;
          created_at?: string;
          updated_at?: string;
          sum?: number;
        };
        Update: {
          project_id?: string;
          created_at?: string;
          updated_at?: string;
          sum?: number;
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
      projects_programs: {
        Row: {
          id: number;
          project_id: string;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          project_id: string;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          project_id?: string;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      projects_publication_status: {
        Row: {
          project_id: string;
          updated_at: string;
          updated_by_id: string;
          status:
            | "unpublished"
            | "pending_approval"
            | "rejected_approval"
            | "published";
          created_at: string;
          created_by_id: string;
        };
        Insert: {
          project_id: string;
          updated_at?: string;
          updated_by_id?: string;
          status?:
            | "unpublished"
            | "pending_approval"
            | "rejected_approval"
            | "published";
          created_at?: string;
          created_by_id?: string;
        };
        Update: {
          project_id?: string;
          updated_at?: string;
          updated_by_id?: string;
          status?:
            | "unpublished"
            | "pending_approval"
            | "rejected_approval"
            | "published";
          created_at?: string;
          created_by_id?: string;
        };
      };
      projects_users: {
        Row: {
          project_id: string;
          user_id: string;
          created_at: string;
          granted_role: "nplex" | "admin" | "editor" | "visitor";
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          created_at?: string;
          granted_role?: "nplex" | "admin" | "editor" | "visitor";
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
          created_at?: string;
          granted_role?: "nplex" | "admin" | "editor" | "visitor";
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      users_projects_collections: {
        Row: {
          title: string;
          description: string | null;
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          is_public: boolean;
          updated_by_id: string;
        };
        Insert: {
          title: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          is_public?: boolean;
          updated_by_id?: string;
        };
        Update: {
          title?: string;
          description?: string | null;
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          is_public?: boolean;
          updated_by_id?: string;
        };
      };
      users_projects_collections_items: {
        Row: {
          id: number;
          collection_id: string;
          project_id: string;
          description: string | null;
          created_by_id: string;
          created_at: string;
          updated_at: string;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          collection_id: string;
          project_id: string;
          description?: string | null;
          created_by_id?: string;
          created_at?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          collection_id?: string;
          project_id?: string;
          description?: string | null;
          created_by_id?: string;
          created_at?: string;
          updated_at?: string;
          updated_by_id?: string;
        };
      };
      users_projects_likes: {
        Row: {
          id: number;
          project_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          project_id: string;
          user_id?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          project_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      users_roles: {
        Row: {
          user_id: string;
          updated_at: string;
          role: "nplex" | "admin" | "editor" | "visitor";
          updated_by_id: string | null;
        };
        Insert: {
          user_id: string;
          updated_at?: string;
          role?: "nplex" | "admin" | "editor" | "visitor";
          updated_by_id?: string | null;
        };
        Update: {
          user_id?: string;
          updated_at?: string;
          role?: "nplex" | "admin" | "editor" | "visitor";
          updated_by_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_relegate_uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      default_uid: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      user_has_role: {
        Args: { VARIADIC: unknown };
        Returns: boolean;
      };
      get_projects_descriptors: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
    };
  };
}

