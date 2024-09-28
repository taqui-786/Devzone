
import { NextResponse, type NextRequest } from 'next/server'
import { auth } from './lib/auth';


export async function middleware(request: NextRequest) {

  const user = await auth()
  const url = new URL(request.url);
  
  if(url.pathname !== '/chat' && user){
    return NextResponse.redirect(new URL("/chat", request.url));
  }


}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
