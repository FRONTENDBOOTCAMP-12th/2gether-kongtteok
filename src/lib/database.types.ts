export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      diary: {
        Row: {
          content: string;
          created_at: string;
          date: string;
          diaryImage: Json | null;
          emotion: Database['public']['Enums']['emotion'];
          id: number;
          isPrivate: boolean;
          title: string;
          user_id: string;
          weather: Database['public']['Enums']['weather'];
        };
        Insert: {
          content: string;
          created_at?: string;
          date: string;
          diaryImage?: Json | null;
          emotion: Database['public']['Enums']['emotion'];
          id?: number;
          isPrivate: boolean;
          title: string;
          user_id?: string;
          weather: Database['public']['Enums']['weather'];
        };
        Update: {
          content?: string;
          created_at?: string;
          date?: string;
          diaryImage?: Json | null;
          emotion?: Database['public']['Enums']['emotion'];
          id?: number;
          isPrivate?: boolean;
          title?: string;
          user_id?: string;
          weather?: Database['public']['Enums']['weather'];
        };
        Relationships: [
          {
            foreignKeyName: 'diary_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      interests: {
        Row: {
          id: string;
          name: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: number;
          user_id: string;
        };
        Insert: {
          created_at: string;
          id?: number;
          post_id: number;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'diary';
            referencedColumns: ['id'];
          },
        ];
      };
      user_interests: {
        Row: {
          interest_id: string;
          user_id: string;
        };
        Insert: {
          interest_id: string;
          user_id: string;
        };
        Update: {
          interest_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_interests_interest_id_fkey';
            columns: ['interest_id'];
            isOneToOne: false;
            referencedRelation: 'interests';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_interests_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          intro: string | null;
          nickname: string | null;
          profileImage: string | null;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id?: string;
          intro?: string | null;
          nickname?: string | null;
          profileImage?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          intro?: string | null;
          nickname?: string | null;
          profileImage?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_user_data: {
        Args: {
          target_user_id: string;
        };
        Returns: undefined;
      };
      get_diary_likes: {
        Args: {
          input_user_id: string;
        };
        Returns: {
          diary_id: number;
          diary_date: string;
          like_user_id: string;
          like_created_at: string;
          nickname: string;
          image_url: string;
        }[];
      };
      get_enum_values_for_column: {
        Args: {
          table_name: string;
          column_name: string;
        };
        Returns: {
          value: string;
        }[];
      };
    };
    Enums: {
      emotion: 'exciting' | 'happy' | 'proud' | 'fine' | 'angry' | 'tired' | 'sad' | 'depressed';
      weather: 'sunny' | 'cloudy' | 'windy' | 'rainy' | 'snowy';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
