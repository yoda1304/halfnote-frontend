import React from "react";
import ArtistDetailsClient from "@/app/components/ClientSidePages/artistDetailsClient";

interface ArtistPageProps {
  params: Promise<{ name: string }>;
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const resolvedParams = await params;
  const decodedName = decodeURIComponent(resolvedParams.name);

  return (
    <div className="w-full min-h-screen">
      <ArtistDetailsClient artistName={decodedName} />
    </div>
  );
}
