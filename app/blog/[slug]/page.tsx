export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <main style={{ padding: "120px 24px", color: "#fff" }}>
      <h1>ブログ詳細テスト</h1>
      <p>slug: {slug}</p>
    </main>
  )
}
