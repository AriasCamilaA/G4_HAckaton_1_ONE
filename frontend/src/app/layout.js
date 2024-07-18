import "./globals.css";
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

export const metadata = {
  title: "keyczar",
  description: "Powerful control over keys",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-background-color">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
