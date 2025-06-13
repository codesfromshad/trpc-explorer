import { useState, useLayoutEffect } from "react";

function useOS() {
  const [osInfo, setOSInfo] = useState({
    os: "Unknown" as "Windows" | "Mac" | "Linux" | "Unknown",
    device: "Desktop" as "Desktop" | "Mobile" | "Tablet",
  });

  useLayoutEffect(() => {
    const userAgent = window.navigator.userAgent;

    let os: typeof osInfo.os = "Unknown";
    let device: typeof osInfo.device = "Desktop";

    // Detect OS
    if (userAgent.indexOf("Win") !== -1) {
      os = "Windows";
    } else if (userAgent.indexOf("Mac") !== -1) {
      os = "Mac";
    } else if (userAgent.indexOf("Linux") !== -1) {
      os = "Linux";
    }

    // Detect device type
    if (/Mobi|Android/i.test(userAgent)) {
      device = "Mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
      device = "Tablet";
    }

    setOSInfo({ os, device });
  }, []);

  return osInfo;
}

export { useOS  as default, useOS };