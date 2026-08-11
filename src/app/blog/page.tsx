import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";

export default function BlogListPage() {
  // 自动从 content 文件夹读取所有 .md 文件
  const posts = getSortedPostsData();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">美食鉴赏</h1>
        <p className="text-slate-500 mt-2">很多好吃的(～￣▽￣)～</p>
        <p className="text-slate-500 mt-2">可能也很少</p>
      </div>

      <div className="space-y-6 animate-fade-in-up">
        {posts.map((post) => (
          <article key={post.slug} className="group relative">
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm group-hover:shadow-md group-hover:border-slate-300 transition-all flex flex-col sm:flex-row gap-6 items-start">
                
                <div className="w-full sm:w-48 h-36 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100 shadow-inner">
                  <img
                    src={post.coverbg || "/head.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out"
                    loading="lazy"
                  />
                </div>
                
                <div className="grow space-y-2">

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{post.date} | {post.tag}</span>
                    <span className="font-medium text-indigo-600 group-hover:translate-x-1 transition-transform">
                      阅读全文 &rarr;
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}