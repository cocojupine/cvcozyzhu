import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "朱可思 · 面试展示",
  description: "朱可思的产品经理面试展示界面。",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function InterviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
