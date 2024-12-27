import { NextRequest } from "next/server";
import { comments } from "./data";

// export async function GET() {
//   return Response.json(comments);
// }

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;

  return Response.json(filteredComments);
}

export async function POST(request: Request) {
  const comment = await request.json();

  if (!comment.text) {
    return new Response("Comment text is required", { status: 400 });
  }
  const NewComment = {
    id: `${+comments.length + 1}`,
    text: comment.text,
  };

  comments.push(NewComment);

  return new Response(
    JSON.stringify({
      NewComment,
      message: "Comment added",
    }),
    {
      status: 201,
      headers: {
        "Content-type": "appliction/json",
      },
    }
  );
}

export async function DELETE() {
  return new Response("Missing id", { status: 400 });
}
