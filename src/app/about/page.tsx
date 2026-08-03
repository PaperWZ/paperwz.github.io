export default function AboutPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">关于 Yuuri 的美食小站</h1>
      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          这里是 Yuuri 的美食记录，虽然这里并没有吃的。
        </p>
        <h2 className="text-xl font-semibold text-slate-800 pt-2">做好吃的要用到的</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
          <li>前端：React / Next.js / Tailwind CSS</li>
          <li>后端？好像被吃掉了，其实我没打算做后端，先用静态网页试试吧</li>
        </ul>
        <h2 className="text-xl font-semibold text-slate-800 pt-2">跟网页风格无关的一些注释</h2>
        <p>
          又是一个心血来潮，不知道这几分热度能维持多久，不过我想尽量把这个地方改的舒服一点。<br />
          我去这个关于页好像要我手敲HTML 还好我学了一点点:P <br />
          不过总之感谢你的来访，这个博客可能会改的比较慢，请晚点再来看吧
        </p>
      </div>
    </div>
  );
}