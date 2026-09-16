import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata = {
  title: "灰",
  description: "欢迎来到我的独立空间",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const savedTheme = localStorage.getItem("theme");
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add("dark");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="isolate bg-slate-50 text-slate-800 antialiased min-h-screen flex flex-col justify-between selection:bg-slate-200 dark:bg-slate-950 dark:text-slate-200 dark:selection:bg-slate-700">
        {/* 全局统一页头导航 */}
        <Navbar />

        {/* 主体内容 */}
        <main className="relative z-10 max-w-4xl w-full mx-auto px-6 py-12 grow">
          <PageTransition>{children}</PageTransition>
        </main>

        {/* 全局页脚 */}
        <footer className="relative z-10 border-t border-slate-200 py-8 text-center text-xs text-slate-400 select-none dark:border-slate-800 dark:text-slate-500">
          © {new Date().getFullYear()} 灰.
        </footer>
      </body>
    </html>
  );
}