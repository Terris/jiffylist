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
      list_items: {
        Row: {
          id: number
          updated_at: string | null
          list_id: number | null
          description: string
          created_at: string | null
          user_id: string
        }
        Insert: {
          id?: number
          updated_at?: string | null
          list_id?: number | null
          description: string
          created_at?: string | null
          user_id: string
        }
        Update: {
          id?: number
          updated_at?: string | null
          list_id?: number | null
          description?: string
          created_at?: string | null
          user_id?: string
        }
      }
      lists: {
        Row: {
          id: number
          created_at: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          website: string | null
          updated_at: string
          created_at: string | null
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          website?: string | null
          updated_at?: string
          created_at?: string | null
        }
      }
      tags: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          user_id: number
          name: string
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id: number
          name: string
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          user_id?: number
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
