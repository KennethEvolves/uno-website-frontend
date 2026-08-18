import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
