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
      users: {
        Row: {
          id: string;
          updated_at: string;
          avatar_url: string | null;
          about: string | null;
          public_email: string | null;
          updated_by_id: string | null;
          first_name: string | null;
          last_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          updated_at?: string;
          avatar_url?: string | null;
          about?: string | null;
          public_email?: string | null;
          updated_by_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          updated_at?: string;
          avatar_url?: string | null;
          about?: string | null;
          public_email?: string | null;
          updated_by_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          created_at?: string;
        };
      };
      projects_events: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          project_id: string;
          type_id: number;
          parent_id: string | null;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id: string;
          type_id: number;
          parent_id?: string | null;
          title: string;
          description?: string | null;
          start_date: string;
          end_date?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id?: string;
          type_id?: number;
          parent_id?: string | null;
          title?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string | null;
        };
      };
      projects_events_ressources: {
        Row: {
          id: string;
          event_id: string;
          project_id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          title: string;
          description: string | null;
          url: string | null;
        };
        Insert: {
          id?: string;
          event_id: string;
          project_id: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          title: string;
          description?: string | null;
          url?: string | null;
        };
        Update: {
          id?: string;
          event_id?: string;
          project_id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          title?: string;
          description?: string | null;
          url?: string | null;
        };
      };
      projects_exemplarity_indicators: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          project_id: string;
          exemplarity_indicator_id: number;
          description: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id: string;
          exemplarity_indicator_id: number;
          description?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id?: string;
          exemplarity_indicator_id?: number;
          description?: string | null;
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
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          project_id: string;
          material_type_id: number;
          origin_id: number | null;
          sustainability: number | null;
          description: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id: string;
          material_type_id: number;
          origin_id?: number | null;
          sustainability?: number | null;
          description?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id?: string;
          material_type_id?: number;
          origin_id?: number | null;
          sustainability?: number | null;
          description?: string | null;
        };
      };
      projects_materials_uses: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
          project_id: string;
          project_material_id: string;
          material_use_id: number;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id: string;
          project_material_id: string;
          material_use_id: number;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
          project_id?: string;
          project_material_id?: string;
          material_use_id?: number;
          description?: string | null;
        };
      };
      projects_programs: {
        Row: {
          id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string;
          project_id: string;
          title: string;
          description: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
          project_id: string;
          title: string;
          description?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string;
          project_id?: string;
          title?: string;
          description?: string | null;
        };
      };
      projects_users: {
        Row: {
          project_id: string;
          user_id: string;
          created_at: string;
          granted_role: Database["public"]["Enums"]["user_role"];
          updated_at: string;
          created_by_id: string;
          updated_by_id: string;
        };
        Insert: {
          project_id: string;
          user_id: string;
          created_at?: string;
          granted_role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
        Update: {
          project_id?: string;
          user_id?: string;
          created_at?: string;
          granted_role?: Database["public"]["Enums"]["user_role"];
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string;
        };
      };
      users_projects_collections_items: {
        Row: {
          id: number;
          created_by_id: string;
          created_at: string;
          updated_at: string;
          collection_id: string;
          project_id: string;
          description: string | null;
          updated_by_id: string;
        };
        Insert: {
          id?: number;
          created_by_id?: string;
          created_at?: string;
          updated_at?: string;
          collection_id: string;
          project_id: string;
          description?: string | null;
          updated_by_id?: string;
        };
        Update: {
          id?: number;
          created_by_id?: string;
          created_at?: string;
          updated_at?: string;
          collection_id?: string;
          project_id?: string;
          description?: string | null;
          updated_by_id?: string;
        };
      };
      users_projects_likes: {
        Row: {
          id: number;
          user_id: string;
          project_id: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          user_id?: string;
          project_id: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          project_id?: string;
          created_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string | null;
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
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
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
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
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
        };
      };
      notifications: {
        Row: {
          id: string;
          created_at: string;
          created_by_id: string;
          updated_by_id: string | null;
          updated_at: string;
          title: string | null;
          body: string;
          expiry: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
          updated_at?: string;
          title?: string | null;
          body: string;
          expiry?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
          updated_at?: string;
          title?: string | null;
          body?: string;
          expiry?: string | null;
        };
      };
      project_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_event_type: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          durative: boolean;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          durative: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          durative?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_event_type_subevent_type: {
        Row: {
          id: number;
          event_type_id: number;
          subevent_type_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          event_type_id: number;
          subevent_type_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          event_type_id?: number;
          subevent_type_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_exemplarity_indicator: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          updated_by_id: string | null;
          indicator_category_id: number | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
          indicator_category_id?: number | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          updated_by_id?: string | null;
          indicator_category_id?: number | null;
        };
      };
      project_exemplarity_indicator_category: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          title: string;
          description: string | null;
          created_by_id: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          title: string;
          description?: string | null;
          created_by_id?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string | null;
          created_by_id?: string;
          updated_by_id?: string | null;
        };
      };
      project_implantation_mode: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_material_origin: {
        Row: {
          id: number;
          title: string;
          label: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          label: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          label?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
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
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          combustible: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          combustible?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
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
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_site_ownership: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
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
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          is_building: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          is_building?: boolean;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_site_usage_category: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      users_roles: {
        Row: {
          user_id: string;
          updated_at: string;
          role: Database["public"]["Enums"]["user_role"];
          updated_by_id: string | null;
        };
        Insert: {
          user_id: string;
          updated_at?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_by_id?: string | null;
        };
        Update: {
          user_id?: string;
          updated_at?: string;
          role?: Database["public"]["Enums"]["user_role"];
          updated_by_id?: string | null;
        };
      };
      project_site_usage_site_usage_category: {
        Row: {
          usage_id: number;
          category_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          usage_id: number;
          category_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          usage_id?: number;
          category_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
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
          updated_by_id: string | null;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      project_type_category: {
        Row: {
          category_id: number;
          type_id: number;
          created_at: string;
          created_by_id: string;
          updated_at: string;
          updated_by_id: string | null;
        };
        Insert: {
          category_id: number;
          type_id: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
        Update: {
          category_id?: number;
          type_id?: number;
          created_at?: string;
          created_by_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
        };
      };
      projects_publication_status: {
        Row: {
          project_id: string;
          updated_at: string;
          updated_by_id: string | null;
          status: Database["public"]["Enums"]["publication_status"];
        };
        Insert: {
          project_id: string;
          updated_at?: string;
          updated_by_id?: string | null;
          status?: Database["public"]["Enums"]["publication_status"];
        };
        Update: {
          project_id?: string;
          updated_at?: string;
          updated_by_id?: string | null;
          status?: Database["public"]["Enums"]["publication_status"];
        };
      };
      users_projects_collections: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          created_by_id: string;
          is_public: boolean;
          title: string;
          description: string | null;
          updated_by_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          is_public?: boolean;
          title: string;
          description?: string | null;
          updated_by_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by_id?: string;
          is_public?: boolean;
          title?: string;
          description?: string | null;
          updated_by_id?: string | null;
        };
      };
      users_notifications: {
        Row: {
          created_at: string;
          user_id: string;
          notification_id: string;
        };
        Insert: {
          created_at?: string;
          user_id: string;
          notification_id: string;
        };
        Update: {
          created_at?: string;
          user_id?: string;
          notification_id?: string;
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
    Enums: {
      publication_status:
        | "unpublished"
        | "pending_approval"
        | "rejected_approval"
        | "published";
      user_role: "nplex" | "admin" | "editor" | "visitor";
    };
  };
}

