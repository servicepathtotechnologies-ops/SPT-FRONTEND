import { notFound } from "next/navigation";
import { getServiceBySlugWithFallback, SERVICE_SLUGS } from "@/lib/services";
import { getServiceDetails } from "@/lib/serviceDetails";
import { ServicePageClient } from "./ServicePageClient";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlugWithFallback(slug);
  if (!service) return { title: "Service | Service Path Technologies" };
  return {
    title: `${service.name} | Service Path Technologies`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} | Service Path Technologies`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlugWithFallback(slug);
  if (!service) notFound();
  const details = getServiceDetails(slug);

  return <ServicePageClient service={service} details={details} />;
}
