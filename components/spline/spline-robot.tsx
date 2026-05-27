"use client";

import type React from "react";
import { useEffect, useState } from "react";

const VIEWER_SCRIPT_SRC =
  "https://unpkg.com/@splinetool/viewer@1.12.95/build/spline-viewer.js";

export function SplineRobot({
  sceneUrl,
  className,
}: {
  sceneUrl: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  // Render the web component without relying on JSX intrinsic element typings.
  const SplineViewerTag = "spline-viewer" as unknown as React.ElementType<{
    url: string;
    style?: React.CSSProperties;
  }>;

  useEffect(() => {
    const alreadyDefined = customElements.get("spline-viewer");
    if (alreadyDefined) {
      setReady(true);
      return;
    }

    const id = "spline-viewer-script";
    if (document.getElementById(id)) {
      // Script is loading; we'll just flip readiness shortly after.
      const t = window.setTimeout(() => setReady(true), 800);
      return () => window.clearTimeout(t);
    }

    const script = document.createElement("script");
    script.id = id;
    script.type = "module";
    script.src = VIEWER_SCRIPT_SRC;
    script.onload = () => setReady(true);
    document.head.appendChild(script);
  }, []);

  return (
    <div className={className} style={{ height: "100%", width: "100%" }}>
      {!ready && (
        <div className="flex h-full w-full items-center justify-center text-[#4a6b82]">
          Loading 3D robot…
        </div>
      )}
      <SplineViewerTag
        url={sceneUrl}
        style={{
          display: ready ? "block" : "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

