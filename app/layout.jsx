import { Outfit } from "next/font/google";
import { AppContextProvider } from "@/context/AppContext";
import CustomCursor from "@/components/CustomCursor";
import CustomToaster from "@/components/CustomToaster";
import "./globals.css";
import faviconImg from "../assets/logos/fav-logo-new.png";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "ATX Research Peptides",
  description: "A modern and scalable e-commerce platform built with cutting-edge technologies.",
  icons: {
    icon: faviconImg?.src || faviconImg,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Bebas+Neue&family=Permanent+Marker&display=swap" rel="stylesheet" />
      </head>
      <body className={`${outfit.className} antialiased text-white bg-[#0b0b0f]`}>
        <CustomCursor />
        <AppContextProvider>
          <CustomToaster />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}