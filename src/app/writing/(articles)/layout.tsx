"use client";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/markdown-it-texmath/css/texmath.min.css"
      />
      <div className="flex justify-center w-full">
        <div className="max-w-[800px]">{children}</div>
      </div>
    </>
  );
}
