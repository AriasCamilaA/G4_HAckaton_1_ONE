import { Inter } from "next/font/google";
// import { AuthProvider } from '../contexts/AuthContext';
import "./globals.css";


export const metadata = {
  title: "Gestionador de API Keys",
  description: "El API Key Manager es una aplicación web que permite gestionar de manera segura y eficiente las API keys utilizadas en diversos servicios, especialmente en proyectos de inteligencia artificial. La aplicación ofrece funcionalidades para almacenar, categorizar, y monitorear las keys, así como registrar su uso y notificar sobre su expiración.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
