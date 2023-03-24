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
      actors_users: {
        Row: {
          actor_id: string
          created_at: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Insert: {
          actor_id: string
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Update: {
          actor_id?: string
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string
        }
      }
      app_notifications: {
        Row: {
          body: string
          created_at: string | null
          id: string
          public: boolean
          title: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          public?: boolean
          title: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          public?: boolean
          title?: string
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
          id?: string
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
      organizations_users: {
        Row: {
          created_at: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          organization_id: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id: string
        }
        Update: {
          created_at?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string
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
          category_id: number
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
          category_id: number
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
          category_id?: number
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
      project_exemplarity_indicator_category: {
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
      project_exemplarity_indicator_ressources: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          indicator_id: number
          link: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          indicator_id: number
          link?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          indicator_id?: number
          link?: string | null
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
          label: string | null
          title: string
          updated_at: string
          updated_by_id: string | null
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          label?: string | null
          title: string
          updated_at?: string
          updated_by_id?: string | null
        }
        Update: {
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          label?: string | null
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
          category_id: number | null
          created_at: string
          created_by_id: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          category_id?: number | null
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by_id?: string
        }
      }
      project_work_category: {
        Row: {
          created_at: string
          description: string | null
          id: number
          label: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          label: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          label?: string
          title?: string
        }
      }
      projects: {
        Row: {
          adjacent_streets: number | null
          banner_id: string | null
          building_area: number | null
          building_construction_year: number | null
          building_height: number | null
          building_levels: number | null
          cost_range: unknown
          created_at: string
          created_by_id: string
          description: string | null
          id: string
          implantation_mode_id: number | null
          likes_sum: number
          site_area: number | null
          site_ownership_id: number | null
          title: string
          type_id: number | null
          updated_at: string
          updated_by_id: string
          work_area: number | null
          projects_ts: string | null
        }
        Insert: {
          adjacent_streets?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels?: number | null
          cost_range?: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          implantation_mode_id?: number | null
          likes_sum?: number
          site_area?: number | null
          site_ownership_id?: number | null
          title: string
          type_id?: number | null
          updated_at?: string
          updated_by_id?: string
          work_area?: number | null
        }
        Update: {
          adjacent_streets?: number | null
          banner_id?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels?: number | null
          cost_range?: unknown
          created_at?: string
          created_by_id?: string
          description?: string | null
          id?: string
          implantation_mode_id?: number | null
          likes_sum?: number
          site_area?: number | null
          site_ownership_id?: number | null
          title?: string
          type_id?: number | null
          updated_at?: string
          updated_by_id?: string
          work_area?: number | null
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
          color_dominant_hsl: unknown | null
          color_dominant_lab: unknown | null
          color_mean_hsl: unknown | null
          color_mean_lab: unknown | null
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
          color_dominant_hsl?: unknown | null
          color_dominant_lab?: unknown | null
          color_mean_hsl?: unknown | null
          color_mean_lab?: unknown | null
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
          color_dominant_hsl?: unknown | null
          color_dominant_lab?: unknown | null
          color_mean_hsl?: unknown | null
          color_mean_lab?: unknown | null
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
      projects_location: {
        Row: {
          created_at: string
          created_by_id: string
          geometry: unknown | null
          project_id: string
          radius: number | null
          updated_at: string
          updated_by_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          geometry?: unknown | null
          project_id: string
          radius?: number | null
          updated_at?: string
          updated_by_id?: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          geometry?: unknown | null
          project_id?: string
          radius?: number | null
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
      projects_usages: {
        Row: {
          category_id: number
          created_at: string
          created_by_id: string | null
          main: boolean
          project_id: string
          updated_at: string
          updated_by_id: string | null
          usage_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          created_by_id?: string | null
          main?: boolean
          project_id: string
          updated_at?: string
          updated_by_id?: string | null
          usage_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          created_by_id?: string | null
          main?: boolean
          project_id?: string
          updated_at?: string
          updated_by_id?: string | null
          usage_id?: number
        }
      }
      projects_users: {
        Row: {
          created_at: string
          created_by_id: string
          project_id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          updated_by_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by_id?: string
          project_id: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by_id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          created_by_id?: string
          project_id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      role_details: {
        Row: {
          description: string
          role: Database["public"]["Enums"]["app_role"]
          title: string
        }
        Insert: {
          description: string
          role: Database["public"]["Enums"]["app_role"]
          title: string
        }
        Update: {
          description?: string
          role?: Database["public"]["Enums"]["app_role"]
          title?: string
        }
      }
      role_permissions: {
        Row: {
          created_at: string | null
          id: number
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string | null
          id?: number
          permission: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string | null
          id?: number
          permission?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
      }
      user_occupation: {
        Row: {
          description: string | null
          id: number
          short_title: string | null
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          short_title?: string | null
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          short_title?: string | null
          title?: string
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
          occupation: number | null
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
          occupation?: number | null
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
          occupation?: number | null
          public_email?: string | null
          updated_at?: string
          updated_by_id?: string
        }
      }
      users_notifications: {
        Row: {
          created_at: string
          id: string
          read: boolean
          user_id: string
          user_role_request: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          read?: boolean
          user_id: string
          user_role_request?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          read?: boolean
          user_id?: string
          user_role_request?: string | null
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
          request: Database["public"]["Enums"]["app_role"] | null
          requested_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          updated_by_id: string
          user_id: string
        }
        Insert: {
          request?: Database["public"]["Enums"]["app_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by_id?: string
          user_id: string
        }
        Update: {
          request?: Database["public"]["Enums"]["app_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      editable_actors: {
        Row: {
          about: string | null
          created_at: string | null
          created_by_id: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          middle_name: string | null
          updated_at: string | null
          updated_by_id: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          created_by_id?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          created_by_id?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
      }
      editable_organizations: {
        Row: {
          about: string | null
          created_at: string | null
          created_by_id: string | null
          id: string | null
          name: string | null
          short_name: string | null
          updated_at: string | null
          updated_by_id: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          created_by_id?: string | null
          id?: string | null
          name?: string | null
          short_name?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          created_by_id?: string | null
          id?: string | null
          name?: string | null
          short_name?: string | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
      }
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
          site_area: number | null
          site_ownership_id: number | null
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
          site_area?: number | null
          site_ownership_id?: number | null
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
          site_area?: number | null
          site_ownership_id?: number | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
          updated_by_id?: string | null
        }
      }
      random_project_images: {
        Row: {
          color_dominant_hsl: unknown | null
          color_dominant_lab: unknown | null
          color_mean_hsl: unknown | null
          color_mean_lab: unknown | null
          created_at: string | null
          created_by_id: string | null
          description: string | null
          id: string | null
          name: string | null
          order: number | null
          project_id: string | null
          project_title: string | null
          title: string | null
          updated_at: string | null
          updated_by_id: string | null
        }
      }
      users_roles_extended: {
        Row: {
          description: string | null
          request: Database["public"]["Enums"]["app_role"] | null
          requested_at: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          title: string | null
          updated_at: string | null
          updated_by_id: string | null
          user_id: string | null
        }
      }
      users_session: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          public_email: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          role_description: string | null
          role_title: string | null
        }
      }
    }
    Functions: {
      authorize:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              requested_permission: string
            }
            Returns: boolean
          }
      authorize_actor_update:
        | {
            Args: {
              actor: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              actor_id: string
            }
            Returns: boolean
          }
      authorize_org_update:
        | {
            Args: {
              org: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              org_id: string
            }
            Returns: boolean
          }
      authorize_project_update:
        | {
            Args: {
              p_id: string
            }
            Returns: boolean
          }
        | {
            Args: {
              p_row: unknown
            }
            Returns: boolean
          }
      default_uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_relegate_uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      project_descriptors: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      project_is_public: {
        Args: {
          p_id: string
        }
        Returns: boolean
      }
      projects_ts: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      user_has_role:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              role: Database["public"]["Enums"]["app_role"]
            }
            Returns: boolean
          }
    }
    Enums: {
      app_role: "nplex" | "admin" | "editor" | "visitor"
      publication_status:
        | "unpublished"
        | "pending_approval"
        | "rejected_approval"
        | "published"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
