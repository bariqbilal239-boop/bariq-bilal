import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import PageShell from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactSection />
    </PageShell>
  );
}
