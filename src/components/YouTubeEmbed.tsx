interface Props {
  videoId: string
  aspectRatio?: string
}

export default function YouTubeEmbed({ videoId, aspectRatio = 'aspect-video' }: Props) {
  return (
    <div className={`relative w-full rounded-xl overflow-hidden ${aspectRatio}`}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  )
}
