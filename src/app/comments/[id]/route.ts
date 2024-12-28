import { redirect } from "next/navigation";
import { comments } from "../data";

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;
  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    redirect("/comments");
    // return new Response(`Comment not found id: from 1 to ${comments.length}`, {
    //   status: 404,
    // });
  }

  return Response.json(comment);
}

export async function PATCH(
  Request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const body = await Request.json();
  const { text } = body;
  const { id } = await params;

  if (!text) {
    return new Response("Missing text", {
      status: 400,
    });
  }

  const comment = comments.find((comment) => comment.id === id);

  if (!comment) {
    return new Response("There is no such comment", { status: 404 });
  }

  const updatedComment = (comment.text = text);

  return new Response(
    JSON.stringify({ updatedComment, message: "comment changed" }),
    { status: 202 }
  );
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  if (+id > comments.length) {
    return new Response(`wrong id max id ${comments.length}`, { status: 400 });
  }

  const index = comments.findIndex((comment) => comment.id === id);

  if (!index) {
    return Response.json("There is no such comment id");
  }

  const deletedComment = comments[index];

  comments.splice(index, 1);

  return Response.json(deletedComment);
}
