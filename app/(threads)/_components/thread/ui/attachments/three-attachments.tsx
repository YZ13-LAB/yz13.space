import { MediaWrapper } from "@/app/_components/media-overlay/ui/media-wrapper"
import { Video } from "@/app/_components/video"
import { SubThread } from "@/packages/api/src/db/types"
import Image from "next/image"


type Props = {
  attachments?: SubThread["attachments"]
}
const ThreeAttachments = ({ attachments = [] }: Props) => {
  return (
    <div className="w-full h-full grid three-attachments divide-x divide-y">
      {
        attachments.map((url, index) => {
          const isVideo = url.endsWith(".mp4")
          return (
            <MediaWrapper key={url} id={url} className="relative h-full">
              {
                isVideo
                  ? <Video
                    src={url}
                    className="relative object-cover rounded-none" autoPlay muted loop
                  />
                  : <Image
                    src={url}
                    fill
                    className="!relative object-cover rounded-none" alt="attachment"
                  />
              }
            </MediaWrapper>
          )
        })
      }
    </div>
  )
}
export { ThreeAttachments }