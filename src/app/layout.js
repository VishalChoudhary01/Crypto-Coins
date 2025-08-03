import {Poppins,Roboto,Merriweather,Michroma,Noto_Serif,Work_Sans,Arimo} from 'next/font/google';

import "./globals.css";
import Navbar from "@/components/moleclues/Navbar"; 
import Footer from "@/components/moleclues/Footer";
import {WatchListProvider} from "./context/WatchListContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});
const merriweather = Merriweather({
  subsets: ["latin"], 
  weight: [  "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-merriweather",
});
const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-serif",
});
const workSans = Work_Sans({
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-work-sans",
});
const arimo = Arimo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arimo",
});


export const metadata = {
  title: "Crypto Coins Listing",
  description: "Track your favorite cryptocurrencies with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
        ${poppins.variable} ${roboto.variable} ${merriweather.variable} ${michroma.variable} ${notoSerif.variable} ${workSans.variable} ${arimo.variable}
           antialiased relative flex flex-col min-h-screen`}

      >
      <WatchListProvider>
       <Navbar />
       <main className="grow md:mt-14">
        {children}
        </main> 
        <Footer />
      </WatchListProvider>
      </body>
    </html>
  );
}
