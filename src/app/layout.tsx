import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PrismaClient } from "@prisma/client";
import Bar from "@/components/navigation/bar";
import { KBarProvider } from "kbar";
import LayoutClientWrap from "./(components)/layoutclientwrap";

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/neuemontreal/PPNeueMontreal-Bold.otf",
      weight: "800",
    },
    {
      path: "../../public/neuemontreal/PPNeueMontreal-Italic.otf",
      weight: "450",
      style: "italic",
    },
    {
      path: "../../public/neuemontreal/PPNeueMontreal-Book.otf",
      weight: "400",
    },
    {
      path: "../../public/neuemontreal/PPNeueMontreal-Thin.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/neuemontreal/PPNeueMontreal-Medium.otf",
      weight: "530",
      style: "normal",
    },
    {
      path: "../../public/neuemontreal/PPNeueMontreal-SemiBolditalic.otf",
      weight: "700",
    },
  ],
  variable: "--font-neue-montreal",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={neueMontreal.variable}>
        <LayoutClientWrap>{children}</LayoutClientWrap>
        <Bar></Bar>
      </body>
      {/* <Toaster></Toaster> */}
    </html>
  );
}
