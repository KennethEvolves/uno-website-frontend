import type { Metadata } from "next";
import { getSeo, endpoints, query_seo } from "@/lib/shared";

import { PageHeader } from "@/components/ui/PageHeader";
import { getPostsPage } from "../../lib/posts-page/posts-page.service";
import { getPosts } from "@/lib/posts/post.service";
import { PostsGrid } from "@/components/posts-page/PostsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.postspage,
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

const PostsPage = async () => {
  const { header } = await getPostsPage();

  const initialPosts = await getPosts(1, 6);

  return (
    <main className="flex flex-col w-full pb-20 bg-white">
      <PageHeader data={header} />
      <section className="container mx-auto max-w-8xl px-6 lg:px-8 mt-16 md:mt-24">
        <PostsGrid initialData={initialPosts} />
      </section>
    </main>
  );
};

export default PostsPage;
