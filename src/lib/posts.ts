import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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

  // 使用 remark 把 Markdown 转换成 HTML 字符串（解决 ### 和 **粗体** 不显示的问题）
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string; date: string; tag: string; excerpt: string }),
  };
}