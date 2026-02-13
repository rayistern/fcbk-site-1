import { getSiteSettings, getDonateImpacts } from "@/lib/airtable";
import { REVALIDATE } from "@/lib/config";
import { DonateClient } from "./DonateClient";
import type { Metadata } from "next";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Donate | Friendship Circle Brooklyn",
  description: "Support Friendship Circle Brooklyn with a tax-deductible donation.",
};

export default async function DonatePage() {
  const [settings, impacts] = await Promise.all([
    getSiteSettings(),
    getDonateImpacts(),
  ]);

  return (
    <DonateClient
      headline={settings.donateHeadline}
      subtitle={settings.donateSubtitle}
      amounts={settings.donateAmounts}
      impacts={impacts}
      colorPrimary={settings.colorPrimary}
      colorSecondary={settings.colorSecondary}
      colorAccent={settings.colorAccent}
    />
  );
}
