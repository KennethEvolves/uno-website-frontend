import {
  CallDetailsInfo,
  EventDetailsInfo,
  NewsDetailsInfo,
  PostHeader,
} from "@/components/posts";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { getPostBySlug } from "@/lib/posts/post.service";
import { endpoints, getSeo, Props, query_seo } from "@/lib/shared";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const args = {
    slug,
    endpoint: endpoints.posts,
    query: query_seo,
  };

  const seo = await getSeo(args);

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      images: seo.image.url ? [seo.image.url] : [],
    },
  };
}

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mt-20 flex w-full flex-col items-center pb-24">
      <section className="container mx-auto max-w-4xl px-6 pt-16 lg:px-8">
        <PostHeader
          title={post.title}
          type={post.type}
          publishDate={post.publishDate}
          autor={post.autor}
          coverImage={post.coverImage}
        />

        <div className="my-12 w-full">
          <MarkdownRenderer content={post.content} />
        </div>

        {post.type === "convocatoria" && (
          <CallDetailsInfo data={post.callsDetails} />
        )}

        {post.type === "evento" && (
          <EventDetailsInfo data={post.eventsDetails} />
        )}

        {post.type === "noticia" && <NewsDetailsInfo data={post.newsDetails} />}
      </section>
    </main>
  );
};

export default PostPage;
