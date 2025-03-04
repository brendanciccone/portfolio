import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

// Cache the response for 1 hour
export const revalidate = 3600

// Image generation
export default async function Icon(): Promise<ImageResponse> {
  try {
    // Try to fetch the avatar image with proper error handling
    const avatarResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image-sGYSp0BHGJgJt4KAmgUA2l6NjyBYwq.png",
      { 
        cache: "force-cache",
        next: { revalidate: 3600 } // Cache for 1 hour
      },
    )

    if (!avatarResponse.ok) {
      throw new Error(`Failed to fetch avatar: ${avatarResponse.status}`)
    }

    const avatarData = await avatarResponse.arrayBuffer()

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            overflow: "hidden",
            background: "transparent",
          }}
        >
          <img
            src={`data:image/jpeg;base64,${Buffer.from(avatarData).toString("base64")}`}
            width={32}
            height={32}
            style={{ objectFit: "cover" }}
            alt="BC"
          />
        </div>
      ),
      {
        ...size,
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      },
    )
  } catch (error) {
    console.error("Error generating favicon:", error)

    // Fallback to initials with improved styling
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 16,
            background: "hsl(var(--foreground))",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            color: "hsl(var(--background))",
            fontWeight: "bold",
            letterSpacing: "0.05em",
          }}
        >
          BC
        </div>
      ),
      {
        ...size,
        headers: {
          "Cache-Control": "public, max-age=3600, s-maxage=3600",
        },
      },
    )
  }
}

