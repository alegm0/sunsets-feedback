
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "./globals.css";



export const metadata = {
  title: "Sunsets Feedback",
  description: "Sistema de gestión de feedback",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-inter antialiased">{children}</body>
    </html>
  );
}
