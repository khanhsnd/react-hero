import StyledComponentsRegistry from "@/lib/registry";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import "./globals.css";
import MainLayout from "./layout/MainLayout";
import { Providers } from "@/component/provider";
const inter = Inter({ subsets: ["latin"] });

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
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <AntdRegistry>

              <MainLayout>
                {children}
              </MainLayout>

            </AntdRegistry>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
