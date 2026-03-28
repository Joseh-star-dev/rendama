import Navbar from "@/components/Navbar";
import "./globals.css";
import AppProvider from "@/context/AppProvider";

export const metadata = {
  metadataBase: new URL("https://yourdomain.com"),

  title: {
    default: "Rent Management System Kenya | Automate Rent Collection",
    template: "%s | RentFlow",
  },

  description:
    "Smart rent management software for Kenyan landlords. Automate M-Pesa reminders, track payments, and stop chasing tenants.",

  keywords: [
    "Rent management Kenya",
    "Landlord software Kenya",
    "Property management system Kenya",
    "M-Pesa rent tracking",
    "Apartment management app",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Rent Management System for Kenyan Landlords",
    description:
      "Automate rent collection, track defaulters and manage your properties in one dashboard.",
    url: "https://yourdomain.com",
    siteName: "RentFlow",
    type: "website",
    locale: "en_KE",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rent Management System Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rent Management System Kenya",
    description: "Automate rent reminders and track payments easily.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased font-sanss">
        <AppProvider>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
