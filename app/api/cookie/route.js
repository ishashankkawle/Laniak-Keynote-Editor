import { serialize } from 'cookie'

export async function GET(req) {
  return Response.json({"value" : req.cookies.get('auth')?.value})
}