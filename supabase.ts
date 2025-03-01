import { createClient } from '@supabase/supabase-js';

// 환경 변수 타입을 명확히 선언했으므로 타입스크립트가 이를 string으로 인식합니다.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// 환경 변수 값이 존재하는지 확인
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('REACT_APP_SUPABASE_URL 또는 REACT_APP_SUPABASE_ANON_KEY 중 하나 또는 둘 다 프로젝트에 정의되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);