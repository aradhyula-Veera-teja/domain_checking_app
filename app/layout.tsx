import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Headers from "@/components/Headers/Headers";
import { Box, Flex } from "@chakra-ui/react";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import AppContextProvider from "@/context/AppContext/AppContextProvider";
import CustomFooter from "@/components/CustomFooter/CustomFooter";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Challenge 3",
  description: "Challenge 3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={null}>
          <Providers>
            <AppContextProvider>
              <ReactQueryProvider>
                <Headers />
                <Flex direction="column" minH="100vh">
                  <Box flex="1" p={8}>
                    {children}
                  </Box>
                  <CustomFooter />
                </Flex>
              </ReactQueryProvider>
            </AppContextProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
