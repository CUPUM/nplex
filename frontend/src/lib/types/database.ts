export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      actors: {
        Row: {
          about: string | null
          created_at: string
          created_by_id: string
          first_name: string
          id: string
          last_name: string | null
          middle_name: string | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          created_by_id?: string
          first_name: string
          id: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          about?: string | null
          created_at?: string
          created_by_id?: string
          first_name?: string
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          created_by_id: string
          expiry: string | null
          id: string
          title: string | null
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          body: string
          created_at?: string
          created_by_id?: string
          expiry?: string | null
          id: string
          title?: string | null
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          body?: string
          created_at?: string
          created_by_id?: string
          expiry?: string | null
          id?: string
          title?: string | null
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      organizations: {
        Row: {
          about: string | null
          created_at: string
          created_by_id: string
          id: string
          name: string
          short_name: string | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          created_by_id?: string
          id: string
          name: string
          short_name?: string | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          about?: string | null
          created_at?: string
          created_by_id?: string
          id?: string
          name?: string
          short_name?: string | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      project_event_type: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          durative: boolean
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          durative: boolean
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          durative?: boolean
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_event_type_subevent_type: {
        Row: {
          created_at: string
          created_by_id: string
          event_type_id: number
          id: number
          subevent_type_id: number
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          event_type_id: number
          id?: number
          subevent_type_id: number
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          event_type_id?: number
          id?: number
          subevent_type_id?: number
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_exemplarity_indicator: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          indicator_category_id: number | null
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          indicator_category_id?: number | null
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          indicator_category_id?: number | null
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_exemplarity_indicator_category: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_implantation_mode: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_material_origin: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          label: string
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          label: string
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          label?: string
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_material_type: {
        Row: {
          combustible: boolean
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          combustible: boolean
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          combustible?: boolean
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_material_use: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_site_ownership: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_site_usage: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          is_building: boolean
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          is_building: boolean
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          is_building?: boolean
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_site_usage_category: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      project_site_usage_site_usage_category: {
        Row: {
          category_id: number
          created_at: string
          created_by_id: string
          updated_at: string
          updated_by_id: string | null
          usage_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          created_by_id?: string
          updated_at?: string
          updated_by_id?: string | null
          usage_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          created_by_id?: string
          updated_at?: string
          updated_by_id?: string | null
          usage_id?: number
        }
      }
      project_type: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      project_type_work: {
        Row: {
          created_at: string
          created_by_id: string
          type_id: number
          updated_at: string
          updated_by_id: string
          work_id: number
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          type_id: number
          updated_at?: string
          updated_by_id?: string
          work_id: number
        }
        Update: {
          created_at?: string
          created_by_id?: string
          type_id?: number
          updated_at?: string
          updated_by_id?: string
          work_id?: number
        }
      }
      project_work: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects: {
        Row: {
          adjacent_streets: number | null
          area: number | null
          banner_id: string | null
          building_area: number | null
          building_construction_year: number | null
          cost_range: unknown
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          implantation_mode_id: number | null
          likes_sum: number
          location_geometry: unknown | null
          location_radius: number | null
          site_area: number | null
          site_ownership_id: number | null
          site_usage_category_id: number | null
          site_usage_id: number | null
          title: string
          type_id: number | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          adjacent_streets?: number | null
          area?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          cost_range?: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          implantation_mode_id?: number | null
          likes_sum?: number
          location_geometry?: unknown | null
          location_radius?: number | null
          site_area?: number | null
          site_ownership_id?: number | null
          site_usage_category_id?: number | null
          site_usage_id?: number | null
          title: string
          type_id?: number | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          adjacent_streets?: number | null
          area?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          cost_range?: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          implantation_mode_id?: number | null
          likes_sum?: number
          location_geometry?: unknown | null
          location_radius?: number | null
          site_area?: number | null
          site_ownership_id?: number | null
          site_usage_category_id?: number | null
          site_usage_id?: number | null
          title?: string
          type_id?: number | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_events: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          end_date: string | null
          id: string
          parent_id: string | null
          project_id: string
          start_date: string
          title: string
          type_id: number
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          end_date?: string | null
          id?: string
          parent_id?: string | null
          project_id: string
          start_date: string
          title: string
          type_id: number
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          end_date?: string | null
          id?: string
          parent_id?: string | null
          project_id?: string
          start_date?: string
          title?: string
          type_id?: number
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_events_ressources: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          event_id: string
          id: string
          project_id: string
          title: string
          updated_at: string
          updated_by_id: string
          url: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          event_id: string
          id?: string
          project_id: string
          title: string
          updated_at?: string
          updated_by_id?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          event_id?: string
          id?: string
          project_id?: string
          title?: string
          updated_at?: string
          updated_by_id?: string
          url?: string | null
        }
      }
      projects_exemplarity_indicators: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          exemplarity_indicator_id: number
          id: string
          project_id: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          exemplarity_indicator_id: number
          id?: string
          project_id: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          exemplarity_indicator_id?: number
          id?: string
          project_id?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_images: {
        Row: {
          color_dominant_hsl: unknown
          color_dominant_lab: unknown
          color_mean_hsl: unknown
          color_mean_lab: unknown
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          name: string
          order: number | null
          project_id: string
          title: string | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          color_dominant_hsl: unknown
          color_dominant_lab: unknown
          color_mean_hsl: unknown
          color_mean_lab: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id: string
          name: string
          order?: number | null
          project_id: string
          title?: string | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          color_dominant_hsl?: unknown
          color_dominant_lab?: unknown
          color_mean_hsl?: unknown
          color_mean_lab?: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          name?: string
          order?: number | null
          project_id?: string
          title?: string | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_materials: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          material_type_id: number
          origin_id: number | null
          project_id: string
          sustainability: number | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          material_type_id: number
          origin_id?: number | null
          project_id: string
          sustainability?: number | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          material_type_id?: number
          origin_id?: number | null
          project_id?: string
          sustainability?: number | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_materials_uses: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          material_use_id: number
          project_id: string
          project_material_id: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          material_use_id: number
          project_id: string
          project_material_id: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          material_use_id?: number
          project_id?: string
          project_material_id?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_programs: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          project_id: string
          title: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          project_id: string
          title: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          project_id?: string
          title?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_publication_status: {
        Row: {
          project_id: string
          status: Database["public"]["Enums"]["publication_status"]
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          project_id: string
          status?: Database["public"]["Enums"]["publication_status"]
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          project_id?: string
          status?: Database["public"]["Enums"]["publication_status"]
          updated_at?: string
          updated_by_id?: string
        }
      }
      projects_users: {
        Row: {
          created_at: string
          created_by_id: string
          granted_role: Database["public"]["Enums"]["user_role"]
          project_id: string
          updated_at: string
          updated_by_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          granted_role?: Database["public"]["Enums"]["user_role"]
          project_id: string
          updated_at?: string
          updated_by_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          granted_role?: Database["public"]["Enums"]["user_role"]
          project_id?: string
          updated_at?: string
          updated_by_id?: string
          user_id?: string
        }
      }
      projects_works: {
        Row: {
          created_at: string
          created_by_id: string
          project_id: string
          updated_at: string
          updated_by_id: string
          work_id: number
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          project_id: string
          updated_at?: string
          updated_by_id?: string
          work_id: number
        }
        Update: {
          created_at?: string
          created_by_id?: string
          project_id?: string
          updated_at?: string
          updated_by_id?: string
          work_id?: number
        }
      }
      user_role_details: {
        Row: {
          description: string
          title: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          description: string
          title: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          description?: string
          title?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
      }
      users: {
        Row: {
          about: string | null
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          public_email: string | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          public_email?: string | null
          updated_at?: string
          updated_by_id: string
        }
        Update: {
          about?: string | null
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          public_email?: string | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      users_notifications: {
        Row: {
          created_at: string
          notification_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          notification_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          notification_id?: string
          user_id?: string
        }
      }
      users_projects_collections: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          is_public: boolean
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          is_public?: boolean
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          is_public?: boolean
          title?: string
          updated_at?: string
          updated_by_id?: string | null
        }
      }
      users_projects_collections_items: {
        Row: {
          collection_id: string
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          project_id: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          project_id: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          collection_id?: string
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          project_id?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      users_projects_likes: {
        Row: {
          created_at: string
          id: number
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: string
          user_id?: string
        }
      }
      users_projects_queries: {
        Row: {
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          query: Json
          title: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          query: Json
          title: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          query?: Json
          title?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      users_roles: {
        Row: {
          request: Database["public"]["Enums"]["user_role"] | null
          requested_at: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          updated_by_id: string
          user_id: string
        }
        Insert: {
          request?: Database["public"]["Enums"]["user_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by_id?: string
          user_id: string
        }
        Update: {
          request?: Database["public"]["Enums"]["user_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          updated_by_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      editable_projects: {
        Row: {
          adjacent_streets: number | null
          area: number | null
          banner_id: string | null
          building_area: number | null
          building_construction_year: number | null
          cost_range: unknown | null
          created_at: string | null
          created_by_id: string | null
          description: string | null
          id: string | null
          implantation_mode_id: number | null
          likes_sum: number | null
          location_geometry: unknown | null
          location_radius: number | null
          site_area: number | null
          site_ownership_id: number | null
          site_usage_category_id: number | null
          site_usage_id: number | null
          title: string | null
          type_id: number | null
          updated_at: string | null
          updated_by_id: string | null
        }
        Insert: {
          adjacent_streets?: number | null
          area?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          cost_range?: unknown | null
          created_at?: string | null
          created_by_id?: string | null
          description?: string | null
          id?: string | null
          implantation_mode_id?: number | null
          likes_sum?: number | null
          location_geometry?: unknown | null
          location_radius?: number | null
          site_area?: number | null
          site_ownership_id?: number | null
          site_usage_category_id?: number | null
          site_usage_id?: number | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Update: {
          adjacent_streets?: number | null
          area?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          cost_range?: unknown | null
          created_at?: string | null
          created_by_id?: string | null
          description?: string | null
          id?: string | null
          implantation_mode_id?: number | null
          likes_sum?: number | null
          location_geometry?: unknown | null
          location_radius?: number | null
          site_area?: number | null
          site_ownership_id?: number | null
          site_usage_category_id?: number | null
          site_usage_id?: number | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
      }
    }
    Functions: {
      cube:
        | {
            Args: { "": number[] }
            Returns: unknown
          }
        | {
            Args: { "": number }
            Returns: unknown
          }
      cube_dim: {
        Args: { "": unknown }
        Returns: number
      }
      cube_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_is_point: {
        Args: { "": unknown }
        Returns: boolean
      }
      cube_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_recv: {
        Args: { "": unknown }
        Returns: unknown
      }
      cube_send: {
        Args: { "": unknown }
        Returns: string
      }
      cube_size: {
        Args: { "": unknown }
        Returns: number
      }
      default_uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_project_descriptors: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_relegate_uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      project_is_public: {
        Args: { p_id: string }
        Returns: boolean
      }
      user_can_edit_project:
        | {
            Args: { p_row: unknown }
            Returns: boolean
          }
        | {
            Args: { p_id: string }
            Returns: boolean
          }
      user_has_role:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: { role: Database["public"]["Enums"]["user_role"] }
            Returns: boolean
          }
    }
    Enums: {
      publication_status:
        | "unpublished"
        | "pending_approval"
        | "rejected_approval"
        | "published"
      user_role: "nplex" | "admin" | "editor" | "visitor"
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

