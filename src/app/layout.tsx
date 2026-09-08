import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kesi Zhu — Product Manager & AI Engineer",
  description:
    "祝可思，浙江大学工业设计工程硕士，AI创业公司联合创始人，AI Engineering产品经理。Portfolio of Kesi Zhu.",
  openGraph: {
    title: "Kesi Zhu — PM & AI Engineer",
    description: "Product portfolio of Kesi Zhu",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased bg-black text-white">{children}</body>
    </html>
  );
}
