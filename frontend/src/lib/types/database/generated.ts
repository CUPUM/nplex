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
      actor_organisation_role: {
        Row: {
          created_at: string
          description: string | null
          id: number
          short_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          short_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          short_title?: string | null
          title?: string
          updated_at?: string
        }
      }
      actors: {
        Row: {
          about: string | null
          created_at: string
          created_by: string
          first_name: string
          id: string
          last_name: string | null
          middle_name: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          created_by?: string
          first_name: string
          id: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          about?: string | null
          created_at?: string
          created_by?: string
          first_name?: string
          id?: string
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string
          updated_by?: string
        }
      }
      actors_users: {
        Row: {
          actor: string
          created_at: string
          role: Database["public"]["Enums"]["app_role"] | null
          user: string
        }
        Insert: {
          actor: string
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user: string
        }
        Update: {
          actor?: string
          created_at?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user?: string
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
      organisation_type: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string | null
        }
      }
      organisations: {
        Row: {
          about: string | null
          created_at: string
          created_by: string
          id: string
          name: string
          short_name: string | null
          type: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          about?: string | null
          created_at?: string
          created_by?: string
          id?: string
          name: string
          short_name?: string | null
          type?: number | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          about?: string | null
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          short_name?: string | null
          type?: number | null
          updated_at?: string
          updated_by?: string
        }
      }
      organisations_actors: {
        Row: {
          actor: string
          created_at: string
          created_by: string
          organisation: string
          role: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          actor: string
          created_at?: string
          created_by?: string
          organisation: string
          role?: number | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          actor?: string
          created_at?: string
          created_by?: string
          organisation?: string
          role?: number | null
          updated_at?: string
          updated_by?: string
        }
      }
      organisations_users: {
        Row: {
          created_at: string
          organisation: string
          role: Database["public"]["Enums"]["app_role"] | null
          user: string
        }
        Insert: {
          created_at?: string
          organisation: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user: string
        }
        Update: {
          created_at?: string
          organisation?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user?: string
        }
      }
      project_event: {
        Row: {
          description: string | null
          durative: boolean
          id: number
          title: string
        }
        Insert: {
          description?: string | null
          durative: boolean
          id?: number
          title: string
        }
        Update: {
          description?: string | null
          durative?: boolean
          id?: number
          title?: string
        }
      }
      project_exemplarity_category: {
        Row: {
          description: string | null
          id: number
          short_description: string | null
          short_title: string
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          short_description?: string | null
          short_title: string
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          short_description?: string | null
          short_title?: string
          title?: string
        }
      }
      project_exemplarity_indicator: {
        Row: {
          category: number
          created_at: string
          created_by: string
          description: string | null
          id: number
          short_title: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          category: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          short_title: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          category?: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          short_title?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      project_image_type: {
        Row: {
          description: string
          id: number
          title: string
        }
        Insert: {
          description: string
          id?: number
          title: string
        }
        Update: {
          description?: string
          id?: number
          title?: string
        }
      }
      project_implantation_mode: {
        Row: {
          description: string | null
          id: number
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          title?: string
        }
      }
      project_intervention: {
        Row: {
          category: number
          created_at: string
          created_by: string
          description: string | null
          id: number
          maybe_permit: boolean | null
          title: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          category: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          maybe_permit?: boolean | null
          title: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          category?: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          maybe_permit?: boolean | null
          title?: string
          updated_at?: string
          updated_by?: string
        }
      }
      project_intervention_by_type: {
        Row: {
          intervention: number
          type: number
        }
        Insert: {
          intervention: number
          type: number
        }
        Update: {
          intervention?: number
          type?: number
        }
      }
      project_intervention_category: {
        Row: {
          description: string | null
          id: number
          short_title: string
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          short_title: string
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          short_title?: string
          title?: string
        }
      }
      project_material_origin: {
        Row: {
          description: string | null
          id: number
          label: string
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          label: string
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          label?: string
          title?: string
        }
      }
      project_material_type: {
        Row: {
          combustible: boolean
          created_at: string
          created_by: string
          description: string | null
          id: number
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          combustible: boolean
          created_at?: string
          created_by: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          combustible?: boolean
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      project_material_use: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: number
          short_title: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          short_title?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          short_title?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      project_site_ownership: {
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
      project_site_usage: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: number
          is_building: boolean
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          is_building: boolean
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          is_building?: boolean
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      project_site_usage_by_category: {
        Row: {
          category: number
          usage: number
        }
        Insert: {
          category: number
          usage: number
        }
        Update: {
          category?: number
          usage?: number
        }
      }
      project_site_usage_category: {
        Row: {
          description: string | null
          id: number
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          title?: string
        }
      }
      project_subevent_by_event: {
        Row: {
          event: number
          subevent: number
        }
        Insert: {
          event: number
          subevent: number
        }
        Update: {
          event?: number
          subevent?: number
        }
      }
      project_type: {
        Row: {
          description: string | null
          id: number
          title: string
        }
        Insert: {
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          description?: string | null
          id?: number
          title?: string
        }
      }
      projects: {
        Row: {
          adjacent_alleys: number | null
          adjacent_streets: number | null
          banner: string | null
          building_area: number | null
          building_construction_year: number | null
          building_height: number | null
          building_levels_basement: boolean[]
          building_levels_main: boolean[]
          building_levels_mezzanine: boolean[]
          cost_range: unknown
          created_at: string
          created_by: string
          description: string | null
          id: string
          implantation_mode: number | null
          interventions_area: number | null
          likes_sum: number
          site_area: number | null
          site_ownership: number | null
          title: string
          type: number | null
          updated_at: string
          updated_by: string
          projects_ts: string | null
        }
        Insert: {
          adjacent_alleys?: number | null
          adjacent_streets?: number | null
          banner?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels_basement?: boolean[]
          building_levels_main?: boolean[]
          building_levels_mezzanine?: boolean[]
          cost_range?: unknown
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          implantation_mode?: number | null
          interventions_area?: number | null
          likes_sum?: number
          site_area?: number | null
          site_ownership?: number | null
          title: string
          type?: number | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          adjacent_alleys?: number | null
          adjacent_streets?: number | null
          banner?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels_basement?: boolean[]
          building_levels_main?: boolean[]
          building_levels_mezzanine?: boolean[]
          cost_range?: unknown
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          implantation_mode?: number | null
          interventions_area?: number | null
          likes_sum?: number
          site_area?: number | null
          site_ownership?: number | null
          title?: string
          type?: number | null
          updated_at?: string
          updated_by?: string
        }
      }
      projects_events: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end: string | null
          id: string
          parent_event: string | null
          project: string
          start: string
          title: string
          type: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          end?: string | null
          id?: string
          parent_event?: string | null
          project: string
          start: string
          title: string
          type: number
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end?: string | null
          id?: string
          parent_event?: string | null
          project?: string
          start?: string
          title?: string
          type?: number
          updated_at?: string
          updated_by?: string
        }
      }
      projects_exemplarity_indicators: {
        Row: {
          created_at: string
          created_by: string
          description: number | null
          id: string
          indicator: number
          project: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: number | null
          id?: string
          indicator: number
          project: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: number | null
          id?: string
          indicator?: number
          project?: string
          updated_at?: string
          updated_by?: string
        }
      }
      projects_images: {
        Row: {
          color_average_hsl: unknown | null
          color_average_lab: unknown | null
          color_dominant_hsl: unknown | null
          color_dominant_lab: unknown | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          index: number | null
          project: string
          storage_name: string
          temporality: Database["public"]["Enums"]["temporality"]
          title: string | null
          type: number
          updated_at: string
          updated_by: string
        }
        Insert: {
          color_average_hsl?: unknown | null
          color_average_lab?: unknown | null
          color_dominant_hsl?: unknown | null
          color_dominant_lab?: unknown | null
          created_at?: string
          created_by?: string
          description?: string | null
          id: string
          index?: number | null
          project: string
          storage_name: string
          temporality?: Database["public"]["Enums"]["temporality"]
          title?: string | null
          type?: number
          updated_at?: string
          updated_by?: string
        }
        Update: {
          color_average_hsl?: unknown | null
          color_average_lab?: unknown | null
          color_dominant_hsl?: unknown | null
          color_dominant_lab?: unknown | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          index?: number | null
          project?: string
          storage_name?: string
          temporality?: Database["public"]["Enums"]["temporality"]
          title?: string | null
          type?: number
          updated_at?: string
          updated_by?: string
        }
      }
      projects_images_credits: {
        Row: {
          actor: string | null
          created_at: string | null
          first_name: string
          id: string
          image: string
          last_name: string | null
          legend: string
          organisation: string | null
          url: string | null
          user: string | null
        }
        Insert: {
          actor?: string | null
          created_at?: string | null
          first_name: string
          id: string
          image: string
          last_name?: string | null
          legend: string
          organisation?: string | null
          url?: string | null
          user?: string | null
        }
        Update: {
          actor?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          image?: string
          last_name?: string | null
          legend?: string
          organisation?: string | null
          url?: string | null
          user?: string | null
        }
      }
      projects_interventions: {
        Row: {
          created_at: string
          created_by: string
          intervention: number
          project: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          intervention: number
          project: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          intervention?: number
          project?: string
          updated_at?: string
          updated_by?: string
        }
      }
      projects_likes: {
        Row: {
          created_at: string
          id: number
          project: string
          user: string
        }
        Insert: {
          created_at?: string
          id?: number
          project: string
          user?: string
        }
        Update: {
          created_at?: string
          id?: number
          project?: string
          user?: string
        }
      }
      projects_location: {
        Row: {
          center: unknown | null
          circle: unknown | null
          created_at: string
          created_by: string
          project: string
          radius: number | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          center?: unknown | null
          circle?: unknown | null
          created_at?: string
          created_by?: string
          project: string
          radius?: number | null
          updated_at?: string
          updated_by?: string
        }
        Update: {
          center?: unknown | null
          circle?: unknown | null
          created_at?: string
          created_by?: string
          project?: string
          radius?: number | null
          updated_at?: string
          updated_by?: string
        }
      }
      projects_materials: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          material_type: number
          origin: number | null
          project: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          material_type: number
          origin?: number | null
          project: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          material_type?: number
          origin?: number | null
          project?: string
          updated_at?: string
          updated_by?: string
        }
      }
      projects_materials_uses: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: number
          project: string
          project_material: string
          updated_at: string
          updated_by: string
          use: number
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          project: string
          project_material: string
          updated_at?: string
          updated_by?: string
          use: number
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          project?: string
          project_material?: string
          updated_at?: string
          updated_by?: string
          use?: number
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
          project: string
          published: boolean
          requested: boolean
          updated_at: string
          updated_by: string
        }
        Insert: {
          project: string
          published?: boolean
          requested?: boolean
          updated_at?: string
          updated_by?: string
        }
        Update: {
          project?: string
          published?: boolean
          requested?: boolean
          updated_at?: string
          updated_by?: string
        }
      }
      projects_usages: {
        Row: {
          category: number
          created_at: string
          created_by: string | null
          is_main: boolean
          project: string
          updated_at: string
          updated_by: string | null
          usage: number
        }
        Insert: {
          category: number
          created_at?: string
          created_by?: string | null
          is_main?: boolean
          project: string
          updated_at?: string
          updated_by?: string | null
          usage: number
        }
        Update: {
          category?: number
          created_at?: string
          created_by?: string | null
          is_main?: boolean
          project?: string
          updated_at?: string
          updated_by?: string | null
          usage?: number
        }
      }
      projects_users: {
        Row: {
          created_at: string
          created_by: string
          project: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          updated_by: string
          user: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          project: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string
          user: string
        }
        Update: {
          created_at?: string
          created_by?: string
          project?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string
          user?: string
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
          updated_by: string
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
          updated_by: string
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
          updated_by?: string
        }
      }
      users_notifications: {
        Row: {
          created_at: string
          id: string
          read: boolean
          user: string
          user_role_request: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          read?: boolean
          user: string
          user_role_request?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          read?: boolean
          user?: string
          user_role_request?: string | null
        }
      }
      users_projects_collections: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_public: boolean
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      users_projects_collections_items: {
        Row: {
          collection: string
          created_at: string
          created_by: string
          description: string | null
          id: number
          project: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          collection: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          project: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          collection?: string
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          project?: string
          updated_at?: string
          updated_by?: string
        }
      }
      users_projects_queries: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: number
          query: Json
          title: string
          updated_at: string
          updated_by: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          query: Json
          title: string
          updated_at?: string
          updated_by?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: number
          query?: Json
          title?: string
          updated_at?: string
          updated_by?: string
        }
      }
      users_roles: {
        Row: {
          request: Database["public"]["Enums"]["app_role"] | null
          requested_at: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          updated_by: string
          user: string
        }
        Insert: {
          request?: Database["public"]["Enums"]["app_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string
          user: string
        }
        Update: {
          request?: Database["public"]["Enums"]["app_role"] | null
          requested_at?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string
          user?: string
        }
      }
    }
    Views: {
      editable_actors: {
        Row: {
          about: string | null
          created_at: string | null
          created_by: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          middle_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          created_by?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          created_by?: string | null
          first_name?: string | null
          id?: string | null
          last_name?: string | null
          middle_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      editable_organisations: {
        Row: {
          about: string | null
          created_at: string | null
          created_by: string | null
          id: string | null
          name: string | null
          short_name: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          about?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string | null
          name?: string | null
          short_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          about?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string | null
          name?: string | null
          short_name?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      editable_projects: {
        Row: {
          adjacent_alleys: number | null
          adjacent_streets: number | null
          banner: string | null
          building_area: number | null
          building_construction_year: number | null
          building_height: number | null
          building_levels_basement: boolean[] | null
          building_levels_main: boolean[] | null
          building_levels_mezzanine: boolean[] | null
          cost_range: unknown | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string | null
          implantation_mode: number | null
          interventions_area: number | null
          likes_sum: number | null
          site_area: number | null
          site_ownership: number | null
          title: string | null
          type: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          adjacent_alleys?: number | null
          adjacent_streets?: number | null
          banner?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels_basement?: boolean[] | null
          building_levels_main?: boolean[] | null
          building_levels_mezzanine?: boolean[] | null
          cost_range?: unknown | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          implantation_mode?: number | null
          interventions_area?: number | null
          likes_sum?: number | null
          site_area?: number | null
          site_ownership?: number | null
          title?: string | null
          type?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          adjacent_alleys?: number | null
          adjacent_streets?: number | null
          banner?: string | null
          building_area?: number | null
          building_construction_year?: number | null
          building_height?: number | null
          building_levels_basement?: boolean[] | null
          building_levels_main?: boolean[] | null
          building_levels_mezzanine?: boolean[] | null
          cost_range?: unknown | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string | null
          implantation_mode?: number | null
          interventions_area?: number | null
          likes_sum?: number | null
          site_area?: number | null
          site_ownership?: number | null
          title?: string | null
          type?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      projects_likes_count: {
        Row: {
          count: number | null
          id: string | null
        }
      }
      projects_publication_status_fulfill: {
        Row: {
          fulfill: boolean | null
          project: string | null
          published: boolean | null
          requested: boolean | null
          updated_at: string | null
          updated_by: string | null
        }
      }
      random_projects_images: {
        Row: {
          color_average_hsl: unknown | null
          color_average_lab: unknown | null
          color_dominant_hsl: unknown | null
          color_dominant_lab: unknown | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string | null
          index: number | null
          project: string | null
          project_title: string | null
          storage_name: string | null
          temporality: Database["public"]["Enums"]["temporality"] | null
          title: string | null
          type: number | null
          updated_at: string | null
          updated_by: string | null
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
          updated_by: string | null
          user: string | null
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
      temporality: "before" | "during" | "after"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
