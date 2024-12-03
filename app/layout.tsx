import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ScrollArea } from "./_components/ui/scroll-area";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Finance AI",
  description: "Controll finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <div className={`sm:hidden`}>
            <ScrollArea>
              <div className="flex h-full flex-col overflow-hidden">
                {children}
              </div>
            </ScrollArea>
          </div>
          <div className={`hidden sm:block`}>
            <div className="flex h-full flex-col overflow-hidden">
              {children}
            </div>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
