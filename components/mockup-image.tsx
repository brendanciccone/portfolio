import Image from "next/image"

interface MockupImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
}

export const MockupImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  quality = 80,
  sizes,
}: MockupImageProps) => {
  return (
    /*
     * Nothing opaque may live in here. An ancestor applies a drop-shadow chain
     * that traces this subtree's alpha, so a full-box placeholder made the
     * border and shadow draw around the whole image bounds while loading and
     * then snap inward to the artwork the moment it arrived. There used to be a
     * Skeleton here doing exactly that — and it was invisible anyway: it was
     * bg-mockup-frame, the same colour as the mat behind it, and animate-pulse
     * only animates opacity, so it was #fafafa fading over #fafafa.
     *
     * There is no load fade either, and that is deliberate rather than an
     * omission. A fade put the image and the ring on one alpha curve, which
     * sounds like the two arriving together and is not: at 25% alpha the
     * artwork sits 37 luminance below the mat and reads as present, while the
     * ring — a 21-luminance line at full strength — is 5 off the mat and
     * invisible. It only crosses the threshold past halfway, so the ring
     * always appeared to pop in after the screenshot it belongs to. Same
     * curve, different arrival, because the two have an order of magnitude
     * between their contrast.
     *
     * No cross-fade can fix that; only not having one. The image paints when
     * it decodes, and the shadow, which is drawn from its alpha, paints in the
     * same frame.
     */
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
      />
    </div>
  )
}
