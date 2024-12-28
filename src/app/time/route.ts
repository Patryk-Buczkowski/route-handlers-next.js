export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    date: new Date().toLocaleDateString(),
    time2: new Date().toLocaleTimeString(),
  });
}
