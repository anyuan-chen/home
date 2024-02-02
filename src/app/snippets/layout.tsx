export default function SnippetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-4 w-full">{children}</div>;
}
