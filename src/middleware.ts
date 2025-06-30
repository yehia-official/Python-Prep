
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware is intentionally left blank and non-functional.
// It exists to prevent build errors in environments where the file is expected.
// The application has been configured to be English-only, so language-based routing is not needed.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // An empty matcher means this middleware will not run on any path.
  matcher: [],
}
