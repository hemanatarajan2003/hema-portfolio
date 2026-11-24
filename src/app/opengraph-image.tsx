import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = "Hema N — Software Engineer | Portfolio";
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
          padding: 72,
          background: "#F8F8F5",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#171717",
              color: "#F8F8F5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            HN
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 24, color: "#666" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#16a34a" }} />
            Available for opportunities
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Building solutions.</div>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, color: "#9a9a9a" }}>
            Driven by curiosity.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>{profile.name} · {profile.designation.split(" · ")[0]}</span>
          <span style={{ color: "#7856E8" }}>MCA Graduate · {profile.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
