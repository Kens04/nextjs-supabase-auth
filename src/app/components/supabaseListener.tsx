"use server";

import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Navigation from "@/app/components/navigation";

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <Navigation session={session} />;
};

export default SupabaseListener;
