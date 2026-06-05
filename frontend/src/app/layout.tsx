import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "抖音出游灵感转行动方案工具",
  description: "将抖音旅行视频灵感转化为可执行的穿搭、拍照与打包方案。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
