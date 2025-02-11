import "@/styles/globals.css";

export const metadata = {
  title: "Todo List",
  description: "Manage your daily tasks easily",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-lt-installed="true" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
