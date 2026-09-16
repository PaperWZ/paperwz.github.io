"use client"; // 必须加上这行，才能使用 usePathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname(); // 获取当前页面的路径，例如 "/" 或 "/blog"
  const [isDark, setIsDark] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>(null);
  const themeTransitionRef = useRef(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    themeButtonRef.current?.setAttribute("aria-pressed", String(dark));
    themeButtonRef.current?.setAttribute(
      "aria-label",
      dark ? "切换到浅色模式" : "切换到暗色模式",
    );
    themeButtonRef.current?.setAttribute(
      "title",
      dark ? "切换到浅色模式" : "切换到暗色模式",
    );
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (themeTransitionRef.current) return;

    const nextIsDark = !document.documentElement.classList.contains("dark");
    const backdrop = document.createElement("span");
    const overlay = document.createElement("span");

    themeTransitionRef.current = true;
    backdrop.className = "theme-transition-backdrop";
    backdrop.style.setProperty(
      "--theme-backdrop-color",
      nextIsDark ? "#f8fafc" : "#020617",
    );
    overlay.className = "theme-transition-overlay";
    overlay.style.setProperty("--theme-x", `${event.clientX}px`);
    overlay.style.setProperty("--theme-y", `${event.clientY}px`);
    overlay.style.setProperty("--theme-color", nextIsDark ? "#020617" : "#ffffff");

    const finishTransition = () => {
      backdrop.remove();
      overlay.remove();
      themeTransitionRef.current = false;
    };

    overlay.addEventListener("animationend", finishTransition, { once: true });
    document.body.appendChild(backdrop);
    document.body.appendChild(overlay);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  const navItems = [
    { name: "主页", href: "/" },
    { name: "文章", href: "/blog" },
    { name: "关于", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/80 dark:bg-slate-950/70 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 左侧 Logo */}
        <Link href="/" className="font-bold text-lg tracking-tight hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
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
                    ? "bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <button
            ref={themeButtonRef}
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "切换到浅色模式" : "切换到暗色模式"}
            aria-pressed={isDark}
            title={isDark ? "切换到浅色模式" : "切换到暗色模式"}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <span aria-hidden="true" className="dark:hidden">☾</span>
            <span aria-hidden="true" className="hidden dark:inline">☀</span>
          </button>
        </nav>
      </div>
    </header>
  );
}