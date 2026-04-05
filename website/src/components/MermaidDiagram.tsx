'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

export default function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [svg, setSvg] = useState<string>('');
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 10)}`);

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(({ default: mermaid }) => {
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
      });
      const id = idRef.current;
      mermaid.render(id, chart).then(({ svg }) => {
        if (!cancelled) setSvg(svg);
      }).catch(() => {
        if (!cancelled) setSvg(`<pre class="text-red-500">Mermaid 渲染失败</pre>`);
      });
    });
    return () => { cancelled = true; };
  }, [chart, theme]);

  return (
    <div
      ref={containerRef}
      className="my-6 overflow-x-auto flex justify-center"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
