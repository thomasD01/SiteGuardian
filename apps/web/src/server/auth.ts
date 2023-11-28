import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getServerAuthSession(){
  const supabase = createRouteHandlerClient({ cookies});

  return supabase.auth.getSession().then((session) => session.data.session);
}