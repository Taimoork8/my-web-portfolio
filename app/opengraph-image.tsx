import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Taimoor Khan — Full-Stack Engineer | Flutter & Django";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0A0A0B",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "#C6F432",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A0A0B",
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            TK
          </div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 26, fontWeight: 600 }}>
            Taimoor Khan
          </div>
        </div>
        <div
          style={{
            color: "#F0EDE6",
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Full-Stack Product Engineer
        </div>
        <div
          style={{
            marginTop: 24,
            color: "rgba(240,237,230,0.6)",
            fontSize: 30,
            maxWidth: 900,
          }}
        >
          SaaS platforms, Flutter apps, Django backends & BLE/IoT integrations
        </div>
      </div>
    ),
    { ...size }
  );
}
