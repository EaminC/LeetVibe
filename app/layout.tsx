import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LeetVibe",
    template: "%s | LeetVibe",
  },
  description:
    "A LeetCode journal for recording what I learned from AI discussions and the final code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            LeetVibe
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/problems">Problems</Link>
            <a
              href="https://github.com/EaminC/LeetVibe"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
