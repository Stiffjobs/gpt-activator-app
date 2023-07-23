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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Credit: {
        Row: {
          credits: number | null
          expireAt: string | null
          id: number
          used: number | null
          userId: string | null
        }
        Insert: {
          credits?: number | null
          expireAt?: string | null
          id?: number
          used?: number | null
          userId?: string | null
        }
        Update: {
          credits?: number | null
          expireAt?: string | null
          id?: number
          used?: number | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Credit_userId_fkey"
            columns: ["userId"]
            referencedRelation: "User"
            referencedColumns: ["id"]
          }
        ]
      }
      Document: {
        Row: {
          checksum: string | null
          createdAt: string
          fileName: string
          id: number
          integrationId: number | null
          status: string | null
          tokenCount: number
          updatedAt: string | null
          userId: string
        }
        Insert: {
          checksum?: string | null
          createdAt?: string
          fileName: string
          id?: number
          integrationId?: number | null
          status?: string | null
          tokenCount?: number
          updatedAt?: string | null
          userId: string
        }
        Update: {
          checksum?: string | null
          createdAt?: string
          fileName?: string
          id?: number
          integrationId?: number | null
          status?: string | null
          tokenCount?: number
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Document_integrationId_fkey"
            columns: ["integrationId"]
            referencedRelation: "Integration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Document_integrationId_fkey"
            columns: ["integrationId"]
            referencedRelation: "decrypted_Integration"
            referencedColumns: ["id"]
          }
        ]
      }
      Integration: {
        Row: {
          callbackUrl: string | null
          channelId: string | null
          createdAt: string
          details: string | null
          documentId: number | null
          id: number
          key: string | null
          name: string | null
          origin: string | null
          type: Database["public"]["Enums"]["IntegrationType"] | null
          userId: string
        }
        Insert: {
          callbackUrl?: string | null
          channelId?: string | null
          createdAt?: string
          details?: string | null
          documentId?: number | null
          id?: number
          key?: string | null
          name?: string | null
          origin?: string | null
          type?: Database["public"]["Enums"]["IntegrationType"] | null
          userId: string
        }
        Update: {
          callbackUrl?: string | null
          channelId?: string | null
          createdAt?: string
          details?: string | null
          documentId?: number | null
          id?: number
          key?: string | null
          name?: string | null
          origin?: string | null
          type?: Database["public"]["Enums"]["IntegrationType"] | null
          userId?: string
        }
        Relationships: []
      }
      Payment: {
        Row: {
          createdAt: string
          id: number
          isPrimary: boolean
          type: Database["public"]["Enums"]["PaymentType"]
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          isPrimary?: boolean
          type?: Database["public"]["Enums"]["PaymentType"]
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          isPrimary?: boolean
          type?: Database["public"]["Enums"]["PaymentType"]
          userId?: string
        }
        Relationships: []
      }
      Section: {
        Row: {
          content: string
          documentId: number
          embedding: string
          id: number
          tokenCount: number
          userId: string | null
        }
        Insert: {
          content: string
          documentId: number
          embedding: string
          id?: number
          tokenCount: number
          userId?: string | null
        }
        Update: {
          content?: string
          documentId?: number
          embedding?: string
          id?: number
          tokenCount?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Section_documentId_fkey"
            columns: ["documentId"]
            referencedRelation: "Document"
            referencedColumns: ["id"]
          }
        ]
      }
      Usage: {
        Row: {
          id: number
          integrationId: number | null
          recordDate: string | null
          tokenCount: number
          userId: string
        }
        Insert: {
          id?: number
          integrationId?: number | null
          recordDate?: string | null
          tokenCount?: number
          userId: string
        }
        Update: {
          id?: number
          integrationId?: number | null
          recordDate?: string | null
          tokenCount?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Usage_integrationId_fkey"
            columns: ["integrationId"]
            referencedRelation: "Integration"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Usage_integrationId_fkey"
            columns: ["integrationId"]
            referencedRelation: "decrypted_Integration"
            referencedColumns: ["id"]
          }
        ]
      }
      User: {
        Row: {
          id: string
        }
        Insert: {
          id: string
        }
        Update: {
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      decrypted_Integration: {
        Row: {
          callbackUrl: string | null
          channelId: string | null
          createdAt: string | null
          decrypted_details: string | null
          details: string | null
          documentId: number | null
          id: number | null
          key: string | null
          name: string | null
          origin: string | null
          type: Database["public"]["Enums"]["IntegrationType"] | null
          userId: string | null
        }
        Insert: {
          callbackUrl?: string | null
          channelId?: string | null
          createdAt?: string | null
          decrypted_details?: never
          details?: string | null
          documentId?: number | null
          id?: number | null
          key?: string | null
          name?: string | null
          origin?: string | null
          type?: Database["public"]["Enums"]["IntegrationType"] | null
          userId?: string | null
        }
        Update: {
          callbackUrl?: string | null
          channelId?: string | null
          createdAt?: string | null
          decrypted_details?: never
          details?: string | null
          documentId?: number | null
          id?: number | null
          key?: string | null
          name?: string | null
          origin?: string | null
          type?: Database["public"]["Enums"]["IntegrationType"] | null
          userId?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      calculate_total_token_count: {
        Args: {
          p_date: string
        }
        Returns: number
      }
      create_month_usage: {
        Args: {
          user_id: string
          integration_id: number
        }
        Returns: undefined
      }
      match_doc_sections: {
        Args: {
          in_embedding: string
          match_threshold: number
          match_count: number
          min_content_length: number
          user_id: string
        }
        Returns: {
          id: number
          documentid: number
          content: string
          similarity: number
        }[]
      }
      update_token_count: {
        Args: {
          in_integration: number
          usage_val: number
        }
        Returns: undefined
      }
    }
    Enums: {
      IntegrationType: "LINE" | "JAVASCRIPT"
      PaymentType: "CREDIT_CARD"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
