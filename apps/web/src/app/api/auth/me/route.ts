import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers';

import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
  const data = await supabase.auth.getUser();

  if(data.error) {
    return NextResponse.error();
  }
  return NextResponse.json(data.data);
}