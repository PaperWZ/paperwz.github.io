import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (

    <div className="min-h-[calc(100vh-18rem)] flex items-center justify-center animate-fade-in-up">
      
      <div className="w-full max-w-4xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-8 py-8">
        
        {/* 左侧：文字介绍内容区域 */}
        <div className="flex-1 space-y-6 text-center sm:text-left">
          {/* 问候与介绍 */}
          <div className="space-y-3">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
              这里是 <span className="text-yellow-400">Yuuri</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              我也不知道为什么在这里，因为偷吃了 Chito 的东西被扔到这里来了。
            </p>
          </div>
          {/* 行动呼吁快捷按钮 */}
          <div className="pt-2 flex items-center justify-center sm:justify-start space-x-4">
            <Link
              href="/blog"
              className="px-5 py-2.5 bg-slate-900 text-white font-medium text-sm rounded-lg hover:bg-slate-800 transition-all shadow-md shadow-slate-200 select-none"
            >
              看看美食 &rarr;
            </Link>
            <Link
              href="/about"
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-all select-none"
            >
              了解 Yuuri
            </Link>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-4">
            <Link
              href="https://space.bilibili.com/88072458"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 px-2.5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-all select-none"
            >
              <Image
              src="/bilibili.svg"
              alt="个人头像"
              width={10}
              height={10}
              draggable={false}
              className="w-full h-full object-cover shadow-xl shadow-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-shadow"
            />
            </Link>
            <Link
              href="https://github.com/PaperWZ"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 px-2.5 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium text-sm rounded-lg hover:bg-slate-50 transition-all select-none"
            >
              <Image
              src="/github.svg"
              alt="个人头像"
              width={10}
              height={10}
              draggable={false}
              className="w-full h-full object-cover shadow-xl shadow-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-shadow"
            />
            </Link>
          </div>
        </div>

        <div className="shrink-0">
          <div className="relative w-35 h-35 sm:w-60 sm:h-60 transition-all duration-300 hover:-translate-y-1 hover:scale-105 select-none">
            <Image
              src="/head.jpg"
              alt="个人头像"
              width={144}
              height={144}
              priority
              draggable={false}
              className="w-full h-full rounded-full object-cover shadow-xl shadow-slate-200 hover:shadow-xl hover:shadow-indigo-100 transition-shadow"
            />
          </div>
        </div>

      </div>
    </div>
  );
}