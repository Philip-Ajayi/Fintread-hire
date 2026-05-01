import { NextResponse } from "next/server";

const API_KEY = process.env.GOOGLE_API_KEY!;
const DEFAULT_FOLDER_ID = "1rhNm8dC6a3oIfl1xpkwbgrVal-yTl-9g";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const folderId =
      searchParams.get("folderId") || DEFAULT_FOLDER_ID;

    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=100`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.files) {
      return NextResponse.json(
        { error: "No files found", raw: data },
        { status: 400, headers: corsHeaders() }
      );
    }

    const images = data.files
      .filter((file: any) => file.mimeType?.startsWith("image/"))
      .map((file: any) => ({
        id: file.id,
        name: file.name,
        url: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1000`,
      }));

    return NextResponse.json(images, {
      headers: corsHeaders(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
