"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navigation from "./navigation";
import type { Database } from "@/lib/database.types";

const SupabaseListener = async () => {
  // const supabase = createServerComponentClient<Database>({ cookies: () => cookies() });
  const supabase = createServerComponentClient<Database>({ cookies });

  // セッション情報を取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールを取得
  let profile = null;
  if (session) {
    // セッション情報をもとにsupabaseからプロファイル情報を取得
    const { data: currentProfile } = await supabase
      .from(`profiles`)
      .select("*")
      .eq("id", session.user.id)
      .single();

    profile = currentProfile;

    // メールアドレスが変更された場合はプロフィールを更新
    if (currentProfile && currentProfile.email !== session.user.email) {
      // メールアドレスを更新
      const { data: updateProfile } = await supabase
        .from("profiles")
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single();
      profile = updateProfile;
    }
  }
  return <Navigation session={session} profile={profile} />;
};

export default SupabaseListener;
