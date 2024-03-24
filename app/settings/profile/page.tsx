import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Profile from "../../components/profile";
import type { Database } from "@/lib/database.types";

const ProfilePage = async () => {
  // supabaseクライアントを使用してセッション情報を取得
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 未認証の場合、リダイレクト
  if (!session) {
    redirect('/auth/login');
  }

  return <Profile />;
};

export default ProfilePage;
