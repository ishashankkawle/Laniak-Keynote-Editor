import { NextResponse } from 'next/server'

export function middleware(request) 
{
    if (request.cookies.get('auth')?.value)
    {
        return NextResponse.next();
    }
    else{
        return NextResponse.redirect(new URL('/', request.url))
    }
   
}

export const config = {
    matcher: ['/workspace'],
}