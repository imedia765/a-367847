export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string
          member_number: string
          collector_id: string | null
          full_name: string
          date_of_birth: string | null
          gender: string | null
          marital_status: string | null
          email: string | null
          phone: string | null
          address: string | null
          postcode: string | null
          town: string | null
          status: string | null
          verified: boolean | null
          created_at: string
          updated_at: string
          membership_type: string | null
          collector: string | null
          cors_enabled: boolean | null
          payment_amount: number | null
          payment_type: string | null
          payment_date: string | null
          payment_notes: string | null
          family_member_name: string | null
          family_member_relationship: string | null
          family_member_dob: string | null
          family_member_gender: string | null
          ticket_subject: string | null
          ticket_description: string | null
          ticket_status: string | null
          ticket_priority: string | null
          admin_note: string | null
          created_by: string | null
        }
        Insert: {
          [key: string]: any
        }
        Update: {
          [key: string]: any
        }
      }
      members_collectors: {
        Row: {
          id: string
          name: string | null
          prefix: string | null
          number: string | null
          email: string | null
          phone: string | null
          active: boolean | null
          created_at: string
          updated_at: string
          collector_profile_id: string | null
          member_profile_id: string | null
        }
        Insert: {
          [key: string]: any
        }
        Update: {
          [key: string]: any
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string | null
          role: 'admin' | 'collector' | 'member'
          created_at: string
        }
        Insert: {
          [key: string]: any
        }
        Update: {
          [key: string]: any
        }
      }
    }
    Functions: {
      authenticate_member: {
        Args: { p_member_number: string }
        Returns: {
          member_id: string
          member_number: string
          full_name: string
          email: string | null
          status: string | null
        }[]
      }
    }
    Enums: {
      app_role: 'admin' | 'collector' | 'member'
    }
  }
}