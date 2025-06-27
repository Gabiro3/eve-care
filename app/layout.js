import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { PublicFooter } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eve Care - Improving Reproductive Health and Wellness in Africa",
  description:
    "Eve Care connects you with trusted gynecologists and reproductive health specialists anytime, anywhere in Africa. Empower your wellness journey today.",
  icons: {
    icon: "/favicon.png", // path to your favicon file in public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <PublicFooter />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
