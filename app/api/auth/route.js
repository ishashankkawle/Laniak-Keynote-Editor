import { serialize } from 'cookie'

export async function POST(req) {

  let data = await req.json()
  let cookieData = serialize("auth", JSON.stringify(data), {
    httpOnly: true,
    sameSite: 'strict',
    secure: false,
    path: "/"
  })

  const response = { "message": "Authenticated" }

  return new Response(response, {
    status: 200,
    headers: { 'Set-Cookie': cookieData }
  })
}