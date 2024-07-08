import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Quantum Tricks",
  description: "A quantum trick-taking game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="text-center text-4xl p-4">
          WELCOME TO QUANTUM TRICKS
        </div>
        {children}
        </body>
    </html>
  );
}
