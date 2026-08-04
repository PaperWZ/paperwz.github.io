import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";

const postsDirectory = path.join(process.cwd(), "content");

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  contentHtml?: string;
}

// 1. 获取所有文章列表（用于 /blog 页面）
export function getSortedPostsData(): PostData[] {
  // 如果 content 目录不存在则自动创建，防止报错
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // 拿文件名（去掉 .md 后缀）作为 slug
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // 用 gray-matter 解析 Frontmatter 元数据
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string }),
      };
    });

  // 按日期由近到远排序
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. 根据 slug 获取单篇文章内容并把 Markdown 转化为 HTML（用于 /blog/[slug] 页面）
export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found for slug: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // 转换链：Markdown 语法 -> GFM扩展 -> 转为HTML语法树 -> 给外链加 target="_blank" -> 输出HTML字符串
  const processedContent = await remark()
    .use(remarkGfm) // 支持删除线 ~~、表格、任务列表等 GFM 语法
    .use(remarkRehype) // 将 Remark 树转为 Rehype HTML 树
    .use(rehypeExternalLinks, {
      target: "_blank", // 自动给所有外部链接添加新窗口打开
      rel: ["noopener", "noreferrer"], // 自动添加安全与隐私保护属性
    })
    .use(rehypeStringify) // 导出为最终的 HTML 字符串
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string }),
  };
}