'use client';

import { useEffect } from 'react';

export default function CodeCopy() {
  useEffect(() => {
    // 找到页面中所有的 pre 代码块
    const pres = document.querySelectorAll('pre');

    pres.forEach((pre) => {
      // 避免重复添加按钮
      if (pre.querySelector('.copy-code-btn')) return;

      // 确保 pre 有 relative 定位
      pre.style.position = 'relative';

      // 创建复制按钮
      const button = document.createElement('button');
      button.className =
        'copy-code-btn absolute top-2.5 right-2.5 rounded bg-slate-700/80 px-2 py-1 text-xs text-slate-200 transition-colors hover:bg-slate-600 hover:text-white border border-slate-600/50 backdrop-blur-sm z-10';
      button.innerText = '复制';

      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        try {
          await navigator.clipboard.writeText(code);
          button.innerText = '已复制';
          button.classList.add('text-emerald-400', 'border-emerald-500/50');
          setTimeout(() => {
            button.innerText = '复制';
            button.classList.remove('text-emerald-400', 'border-emerald-500/50');
          }, 2000);
        } catch (err) {
          console.error('复制失败', err);
        }
      });

      pre.appendChild(button);
    });
  }, []);

  return null;
}