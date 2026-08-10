import Provider from "./Provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMS - Project Management System",
  description: "Streamline your workflow, manage projects, track tasks, and collaborate with your team efficiently in one centralized platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
