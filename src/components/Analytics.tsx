"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { GA_MEASUREMENT_ID, configureAnalyticsDeployment, initializeAnalytics, installAnalyticsClickTracking } from "@/lib/analytics";

export default function Analytics({ deploymentEnvironment }: { deploymentEnvironment?: string }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    configureAnalyticsDeployment(deploymentEnvironment);
    if (!initializeAnalytics()) return;
    setEnabled(true);
    return installAnalyticsClickTracking();
  }, [deploymentEnvironment]);
  // Nothing is loaded on localhost, preview deployments, or a development build.
  return enabled ? <Script id="ga4-library" src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" /> : null;
}
