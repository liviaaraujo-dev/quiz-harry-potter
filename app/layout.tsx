import "./global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <link rel="icon" type="image/png" href="logo-icon1.svg" />
      <body>{children}</body>
    </html>
  )
}
