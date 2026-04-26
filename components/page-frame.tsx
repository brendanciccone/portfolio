type Corner = "tl" | "tr" | "bl" | "br"

const paths: Record<Corner, string> = {
  tl: "M 0 6 L 0 0 L 6 0",
  tr: "M 8 0 L 14 0 L 14 6",
  bl: "M 0 8 L 0 14 L 6 14",
  br: "M 14 8 L 14 14 L 8 14",
}

const positions: Record<Corner, React.CSSProperties> = {
  tl: { top: 12, left: 12 },
  tr: { top: 12, right: 12 },
  bl: { bottom: 12, left: 12 },
  br: { bottom: 12, right: 12 },
}

const FrameCorner = ({ corner }: { corner: Corner }) => (
  <span className="sys-frame-corner" style={positions[corner]}>
    <svg viewBox="0 0 14 14" preserveAspectRatio="none">
      <path d={paths[corner]} />
    </svg>
  </span>
)

export const PageFrame = () => (
  <div className="sys-frame" aria-hidden>
    <FrameCorner corner="tl" />
    <FrameCorner corner="tr" />
    <FrameCorner corner="bl" />
    <FrameCorner corner="br" />
  </div>
)
