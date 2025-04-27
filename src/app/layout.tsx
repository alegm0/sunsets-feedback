
import { AuthProvider } from "../lib/authContext";

export const metadata = {
  title: 'Sunsets Rooftop Feedback System',
  description: 'Admin system for collecting and analyzing customer feedback at Sunsets Rooftop Bar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}





