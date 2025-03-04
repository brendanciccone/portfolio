import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

// Image generation
export default async function Icon() {
  try {
    // Try to fetch the avatar image
    const avatarResponse = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Profile.jpg-al2nGt8LMiAxExrg2Jeb9tDq6VnRHb.jpeg",
      { cache: "force-cache" },
    )

    if (!avatarResponse.ok) {
      throw new Error(`Failed to fetch avatar: ${avatarResponse.status}`)
    }

    const avatarData = await avatarResponse.arrayBuffer()

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${Buffer.from(avatarData).toString("base64")}`}
          width={180}
          height={180}
          style={{ objectFit: "cover" }}
          alt="BC"
        />
      </div>,
      {
        ...size,
      },
    )
  } catch (error) {
    console.error("Error generating apple icon:", error)

    // Fallback to initials if image loading fails
    return new ImageResponse(
      <div
        style={{
          fontSize: 90,
          background: "hsl(var(--foreground))",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "hsl(var(--background))",
        }}
      >
        BC
      </div>,
      {
        ...size,
      },
    )
  }
}

