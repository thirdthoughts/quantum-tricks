import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Toaster } from "~/components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/providers";

export const metadata: Metadata = {
  title: "Quantum Tricks",
  description: "A quantum trick-taking game",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} dark`}>
        <CSPostHogProvider>
          <body>
            <SignedIn>
              <div className="float-right p-4">
                <UserButton />
              </div>
            </SignedIn>
            <div className="p-4 text-center text-4xl">
              WELCOME TO QUANTUM TRICKS
            </div>
            <SignedOut>
              <div className="flex items-center justify-center">
                <div className="rounded-lg bg-slate-700 p-3 text-center">
                  <SignInButton />
                </div>
              </div>
            </SignedOut>
            <SignedIn>{children}</SignedIn>
            <Toaster></Toaster>
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  );
}
