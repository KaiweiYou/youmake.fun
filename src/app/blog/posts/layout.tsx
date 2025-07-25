export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="prose mx-auto px-4 py-8">
      {children}
    </article>
  )
} 