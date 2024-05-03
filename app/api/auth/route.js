import {serialize} from 'cookie'

export async function GET() {
    
  
    let cookieData = serialize("auth",true,{
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      path: "/"
    })

    const response = { "message" : "Authenticated" }
   
    return new Response(response, {status : 200,
      headers : {'Set-Cookie' : cookieData}
    })
  }