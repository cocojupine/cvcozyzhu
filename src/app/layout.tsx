import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozy Zhu — Product Manager & AI Engineer",
  description:
    "浙江大学工业设计工程硕士，AI创业公司联合创始人，AI Engineering产品经理。Portfolio of Kesi (Cozy) Zhu.",
  openGraph: {
    title: "Cozy Zhu — PM & AI Engineer",
    description: "Product portfolio of Kesi (Cozy) Zhu",
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
      <body>{children}</body>
    </html>
  );
}
