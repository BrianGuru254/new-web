import { Play, ExternalLink } from "lucide-react";
import type { SiteContent } from "../data/types";

function extractYouTubeVideoId(url: string) {
  const embedMatch = url.match(/embed\/([^?&]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = url.match(/[?&]v=([^?&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  return shortMatch?.[1] ?? "";
}

export function SermonsSection({ content }: { content: SiteContent }) {
  const featuredVideo = content.sermons[0]?.videoUrl || content.livestreamUrl || "";
  const featuredVideoId = extractYouTubeVideoId(featuredVideo);

  return (
    <section id="sermons" className="py-20 lg:py-28 bg-stone-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold tracking-widest uppercase text-amber-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Sermons
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight mb-4">
            Recent worship messages
          </h2>
          <p className="text-stone-600 text-lg">
            Stay connected with biblical teaching from {content.churchName}.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Featured video */}
          {featuredVideoId && (
            <div className="lg:col-span-3">
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-stone-300/30 bg-stone-900 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideoId}`}
                  title={content.sermons[0]?.title || "Featured Sermon"}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-stone-900 text-lg">
                  {content.sermons[0]?.title}
                </h3>
                <p className="text-stone-500 text-sm mt-1">
                  {content.sermons[0]?.preacher} · {content.sermons[0]?.series}
                </p>
              </div>
            </div>
          )}

          {/* Sermon list */}
          <div className="lg:col-span-2 space-y-3">
            {content.sermons.slice(1).map((sermon) => {
              const videoId = extractYouTubeVideoId(sermon.videoUrl);
              return (
                <a
                  key={sermon.title}
                  href={sermon.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-200">
                    {videoId && (
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={sermon.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-stone-900 text-sm leading-tight mb-1 line-clamp-2">
                      {sermon.title}
                    </h4>
                    <p className="text-stone-500 text-xs">{sermon.preacher}</p>
                    <p className="text-stone-400 text-xs mt-1 line-clamp-2">
                      {sermon.summary}
                    </p>
                  </div>
                </a>
              );
            })}

            <a
              href={content.livestreamUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-4 bg-amber-50 text-amber-800 font-semibold rounded-2xl border border-amber-200 hover:bg-amber-100 transition-all duration-200 text-sm"
            >
              View All on YouTube <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
