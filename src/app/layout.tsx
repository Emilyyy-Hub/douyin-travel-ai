import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "衣边走，衣路拍",
  description: "把抖音旅行灵感，转成一张个性化、可执行、可对话修改的旅行出片行动卡。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* Google Fonts: Plus Jakarta Sans + Work Sans */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Work+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Material Symbols: variable icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
