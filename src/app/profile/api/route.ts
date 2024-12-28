import { headers, cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  (await cookies()).set("perPage", "6");
  const headerList = (await headers()).get("Authorization");
  const Bearer = reqHeaders.get("Authorization");
  const theme = request.cookies.get("theme");
  const perPage = (await cookies()).get("perPage")
  

  if (!Bearer || !headerList || !perPage) {
    return new Response("there is no Authorization ", { status: 404 });
  }

  return new Response(
    JSON.stringify({
      Bearer,
      headerList,
      cokkies: theme,
      perPage,
    }),
    {
      status: 202,
      headers: {
        "Content-Type": "applicaion/json",
        "Set-Cookie": "theme=dark",
      },
    }
  );
}
