import { ImageResponse } from "next/og";

import { displayName, site } from "@content/site";
import { plainText } from "@/components/notes";

export const alt = `${displayName}: portfolio de desarrollo web`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#edeff1",
          color: "#18202e",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>{displayName}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 940 }}>
            {plainText(site.hero.headline)}
          </div>
          <div style={{ marginTop: 28, width: 360, height: 6, borderRadius: 3, background: "#2443c4" }} />
        </div>
      </div>
    ),
    size,
  );
}
