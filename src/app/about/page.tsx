import { Music, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于 | HsiangNianian",
  description: "关于 HsiangNianian — 音乐人与创作者",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-10">关于</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-3">HsiangNianian</h2>
          <p className="text-muted-foreground leading-relaxed">
            一个用音符记录生活的创作者。从 2021 年开始尝试音乐制作，以 HsiangNianian 的名义发布原创单曲和东方同人编曲。
          </p>
        </section>

        <section className="border-t border-border/40 pt-8">
          <h2 className="text-xl font-semibold mb-3">音乐历程</h2>
          <ul className="space-y-4 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-mono text-sm shrink-0 mt-0.5">2021</span>
              <span>参与 BamBoO₂ノVOICE 专辑《Blank Trauma》，首次尝试东方同人编曲</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-mono text-sm shrink-0 mt-0.5">2022</span>
              <span>发布首支原创单曲《Falita - 陨落》，同年参与专辑《Mutichrome Atmosphere》</span>
            </li>
          </ul>
        </section>

        <section className="border-t border-border/40 pt-8">
          <h2 className="text-xl font-semibold mb-3">风格</h2>
          <p className="text-muted-foreground leading-relaxed">
            作品以电子、Classical / House 为主，尝试在传统与电子之间寻找平衡。
          </p>
        </section>

        <section className="border-t border-border/40 pt-8">
          <h2 className="text-xl font-semibold mb-3">链接</h2>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/HsiangNianian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://www.kugou.com/song-36/xzpm8b6.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Music className="h-5 w-5" />
              酷狗音乐
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
