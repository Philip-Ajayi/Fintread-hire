import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

// Allow CORS (adjust "*" to your frontend domain in production)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight request (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Lua script: cycles from 1 → 12
const script = `
local current = redis.call("GET", KEYS[1])

if not current then
  redis.call("SET", KEYS[1], 1)
  return 1
end

current = tonumber(current) + 1

if current > 12 then
  current = 1
end

redis.call("SET", KEYS[1], current)
return current
`;

// 12-color map
const colorMap: Record<number, string> = {
  1: "Crimson-Red",
  2: "Royal-Blue",
  3: "Emerald-Green",
  4: "Sunflower-Yellow",
  5: "Deep-Purple",
  6: "Burnt-Orange",
  7: "Teal",
  8: "Magenta",
  9: "Navy-Blue",
  10: "Black",
  11: "Charcoal-Grey",
  12: "Gold",
};

export async function GET() {
  try {
    const key = "color_cycle";

    const value = await redis.eval(script, 1, key);
    const color = colorMap[value as number];

    return NextResponse.json(
      { color },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, headers: corsHeaders }
    );
  }
}