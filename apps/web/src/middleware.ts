import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { 
  NextResponse, 
  type NextRequest
} from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const userResponse = await supabase.auth.getUser();

  const user = userResponse.data.user;
  const path = req.nextUrl.pathname;

  if(user && ['/login', '/signup'].includes(path)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (!user && path === '/dashboard'){
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res;
}

export const config = {
  matcher: ['/:path*'],
}
