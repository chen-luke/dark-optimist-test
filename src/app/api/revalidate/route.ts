import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

function isError(err: unknown): err is Error {
  return (
    typeof err == "object" &&
    err !== null &&
    "message" in err &&
    typeof (err as { message: unknown }).message === "string"
  );
}

export async function POST(req: NextRequest) {
  if (!SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: "Missing secret" }, { status: 401 });
  }

  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature)
      return new Response("Invalid Signature", { status: 401 });
    if (!body?._type) return new Response("Bad Request", { status: 400 });

    // Revalidate the homepage ('/') whenever any content changes
    revalidatePath("/");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      message: `Revalidated path: /`,
    });
  } catch (err: unknown) {
    if (isError(err)) {
      // Inside this block, TypeScript knows `err` is of type `Error`.
      // You can safely access its properties without a compiler error.
      console.error(`Caught an Error object: ${err.message}`);
      // console.log(err.stack); // Also safe to access
    } else {
      // If it's not an Error object, handle it as an unknown value.
      console.error("Caught a non-error value:", JSON.stringify(err));
    }
  }
}
