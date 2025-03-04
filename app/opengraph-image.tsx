import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "Brendan Ciccone - 0 → 1 Senior Product Designer"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  try {
    // Use the provided image URL
    const imageUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.jpg-d0SidsvzAZGPwLQFoyhGS1atLlTVa3.jpeg"

    // Fetch the image
    const imageResponse = await fetch(imageUrl, { cache: "force-cache" })

    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`)
    }

    const imageData = await imageResponse.arrayBuffer()

    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${Buffer.from(imageData).toString("base64")}`}
          alt="Brendan Ciccone - 0 → 1 Senior Product Designer"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>,
      {
        ...size,
      },
    )
  } catch (error) {
    console.error("Error generating OpenGraph image:", error)

    // Fallback to a simple text-based image if the image fetch fails
    return new ImageResponse(
      <div
        style={{
          fontSize: 32,
          background: "hsl(var(--background))",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          color: "hsl(var(--foreground))",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 20 }}>Brendan Ciccone</div>
        <div style={{ textAlign: "center", maxWidth: "80%" }}>
          0 → 1 Senior Product Designer with 7 years of experience turning ideas into fully realized B2B and B2C
          products
        </div>
      </div>,
      {
        ...size,
      },
    )
  }
}

