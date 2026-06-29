import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from 'next/script';
import WhatsAppFloating from "@/components/WhatsAppFloating";
import AppFloatingButton from "@/components/AppFloatingButton";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "2GO Travel | Planejamento de Viagem Personalizado",
  description: "Crie roteiros sob medida organizados automaticamente. Tecnologia e consultoria para sua próxima viagem.",
  metadataBase: new URL("https://2go-travel-web-app.vercel.app"),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "2GO Travel | Planejamento de Viagem Personalizado",
    description: "Crie roteiros sob medida organizados automaticamente. Tecnologia e consultoria para sua próxima viagem.",
    url: "https://2go-travel-web-app.vercel.app",
    siteName: "2GO Travel",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "2GO Travel | Planejamento de Viagem Personalizado",
    description: "Crie roteiros sob medida organizados automaticamente."
  }
};

export default function RootLayout({ children }) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MOCK123';
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID || 'PIXEL-MOCK123';

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        {/* Meta Pixel Code init */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager init */}
        <Script id="google-gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      </head>
      
      <body className="min-h-full flex flex-col bg-[#F7F8FA] text-[#1E293B] relative">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {children}

        {/* Floating Contextual Smart WhatsApp button */}
        <WhatsAppFloating />

        {/* Global Floating Mobile Download button */}
        <AppFloatingButton />
      </body>
    </html>
  );
}
