// next/components/ClientHeader.tsx
"use client";

import dynamic from 'next/dynamic';

// Dynamically import Header with ssr: false
const Header = dynamic(() => import('./Header'), { ssr: false });

export default function ClientHeader() {
  return <Header />;
}