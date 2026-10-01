import type { Metadata } from "next";
import ThankYouPage from "@/app/thank-you/page";
export const metadata: Metadata = {
  title: "Thank you for your enquiry", description: "Training enquiry confirmation from Yidaolife.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/en/thank-you" },
};
// No generate_lead event here: direct visits/reloads are not conversions.
export default function EnglishThankYouPage() {
  return <ThankYouPage searchParams={Promise.resolve({ lang: "en" })} />;
}
