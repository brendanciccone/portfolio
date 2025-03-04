import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const text = searchParams.get("text") || "Placeholder Image"
  const width = Number.parseInt(searchParams.get("width") || "1200", 10)
  const height = Number.parseInt(searchParams.get("height") || "800", 10)
  const bgColor = searchParams.get("bgColor") || "#f4f4f5"
  const textColor = searchParams.get("textColor") || "#71717a"

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="system-ui, sans-serif" 
        font-size="24" 
        font-weight="500" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle"
      >
        ${text}
      </text>
    </svg>
  `

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}

