import "./global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <link rel="icon" href="./images/logo.png" />
      <body>{children}</body>
    </html>
  )
}
