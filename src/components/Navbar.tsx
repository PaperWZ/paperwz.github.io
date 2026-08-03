"use client"; // 必须加上这行，才能使用 usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); // 获取当前页面的路径，例如 "/" 或 "/blog"

  const navItems = [
    { name: "主页", href: "/" },
    { name: "文章", href: "/blog" },
    { name: "关于", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左侧 Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight hover:text-indigo-600 transition-colors">
        Yuuri  
        </Link>

        {/* 右上角导航按钮组 */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => {
            // 判断当前路径是否与当前导航项匹配：
            // - 对于主页 "/"，需要精确匹配 pathname === "/"
            // - 对于子页面如 "/blog"，匹配以 "/blog" 开头的路径（包含文章详情页 /blog/xxx）
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all select-none ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm" // 选中状态：深色背景 + 白色文字
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100" // 未选中状态：淡色 + hover效果
                }`}
              >
                {item.name}
              </Link>
            );
          })}

        </nav>
      </div>
    </header>
  );
}