import "@repo/tailwind-config/styles";
import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import { ReactNode } from "react";
import { BodyWrapper } from "./_components/body-wrapper";
import "./globals.css";
const font = Geologica({
  subsets: ["latin", "cyrillic"],
  weight: "variable",
  variable: "--root-font",
});

export const metadata: Metadata = {
  title: "YZ13",
  description: "Created by Darkmaterial Team",
};

type LayoutProps = Readonly<{
  children?: ReactNode
}>
export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`${font.className} ${font.variable}`}>
      <BodyWrapper>
        {children}
      </BodyWrapper>
    </html>
  );
}