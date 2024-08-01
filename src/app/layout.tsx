import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Web3ModalProvider from "./../contexts/Web3ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edubuk",
  description: "Edubuk eSeal dApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} m-0 p-0`}>
        <Web3ModalProvider>
          <Navbar />
          {children}
          <Footer />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
