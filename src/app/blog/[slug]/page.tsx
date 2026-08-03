import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getPostData } from "@/lib/posts";
import CopyButton from "@/components/CopyButton";
import CodeCopy from "@/components/CodeCopy";

// 1. 生成静态路径
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);

  return files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
    }));
}

// 辅助函数：估算阅读时间（按照中文约 300字/分钟，英文约 200词/分钟 计算）
function calculateReadingTime(content: string): number {
  const cleanedContent = content.replace(/<[^>]*>/g, ""); // 去除 HTML 标签
  const chineseChars = (cleanedContent.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (cleanedContent.replace(/[\u4e00-\u9fa5]/g, " ").match(/\b\w+\b/g) || []).length;
  
  const minutes = Math.ceil(chineseChars / 300 + englishWords / 200);
  return minutes < 1 ? 1 : minutes;
}

// 2. 页面主组件
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const availableSlugs = await generateStaticParams();

  if (!availableSlugs.some((item) => item.slug === slug)) {
    notFound();
  }

  const post = await getPostData(slug);
  const readingTime = calculateReadingTime(post.contentHtml ?? "");

  return (
    <article className="max-w-none">
      <CodeCopy />
      {/* 文章头部信息 */}
      <header className="border-b border-slate-100 pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-y-2 text-sm text-slate-500">
          <span>{post.date}</span>
          <span className="mx-2">·</span>
          <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            {post.tag}
          </span>
          <span className="mx-2">·</span>
          {/* 阅读时间估算提示 */}
          <span className="flex items-center text-slate-500">
          阅读需要大约 {readingTime} 分钟
          </span>
        </div>
      </header>

      {/* 文章正文与自定义样式修复（修复选中颜色 & 改善代码块样式） */}
      <div
        className="prose prose-slate max-w-none leading-8 text-slate-700
          selection:bg-indigo-500 selection:text-white
          prose-pre:relative prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-sm"
        dangerouslySetInnerHTML={{ __html: post.contentHtml ?? "" }}
      />

      {/* 底部分隔线 & 开源许可协议卡片 */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 text-sm text-slate-600 shadow-sm">
          <div className="flex items-center gap-2 text-base font-semibold text-slate-800 mb-2">
            <span>许可协议</span>
          </div>
          <p className="leading-relaxed">
            文章标题：<strong className="text-slate-900">{post.title}</strong>
          </p>
          <p className="mt-1 leading-relaxed">
            本文采用 {" "}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
            >
              CC BY-NC-SA 4.0 许可协议
            </a>
            进行许可 xwx
          </p>
          <p className="mt-1 text-xs text-slate-400">
            转载恳请保留原文出处及作者信息
          </p>
        </div>
      </div>
    </article>
  );
}