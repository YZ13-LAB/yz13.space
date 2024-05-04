import { Project } from "@/types"
import { Button } from "@repo/ui/button"
import { Separator } from "@repo/ui/separator"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image"
import Link from "next/link"
import { BiDotsHorizontalRounded, BiGroup, BiRightArrowAlt, BiShow, BiStar, BiTime } from "react-icons/bi"
import { BsGithub } from "react-icons/bs"
import { GrStatusGoodSmall } from "react-icons/gr"

type Props = {
  project: Project
}
dayjs.extend(relativeTime)
const ProjectCard = ({ project }: Props) => {
  const created_at = dayjs(project.created_at).fromNow(true)
  const repo = project.repo_id
  return (
    <div className="w-full h-fit flex flex-col gap-4 border hover:border-primary transition-colors p-4 cursor-pointer rounded-xl">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 aspect-square rounded-full overflow-hidden relative">
            {
              project.icon
                ? <Image src={project.icon} fill className="p-1" alt="project-icon" />
                : <div className="w-full h-full rounded-full bg-muted" />
            }
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-base">{project.name}</span>
            <span className="text-muted-foreground text-sm">{project.link}</span>
          </div>
        </div>
        <Button size="icon" variant="ghost" className="text-muted-foreground" asChild>
          <Link href={`/${project.id}`}>
            <BiRightArrowAlt size={24} />
          </Link>
        </Button>
      </div>
      <div className="w-full flex items-center justify-between gap-3">
        {
          repo
            ?
            <span className="inline-flex border items-center w-fit h-fit gap-1 rounded-full bg-muted/50 px-2.5 py-1">
              <BsGithub size={16} className="" />
              <span className="text-sm">{repo}</span>
            </span>
            : <span></span>
        }
        <div className="flex items-center gap-2">
          <Button className="w-8 h-8" size="icon" variant="ghost">
            <BiStar size={18} className="text-muted-foreground" />
          </Button>
          <Button className="w-8 h-8" size="icon" variant="ghost">
            <BiDotsHorizontalRounded size={18} className="text-muted-foreground" />
          </Button>
        </div>
      </div>
      <div className="w-full h-10 p-1 rounded-lg border gap-1 flex items-center">
        <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
          <BiGroup size={18} />
          <span className="text-sm">10</span>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
          <BiShow size={18} />
          <span className="text-sm">1.1k</span>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/4 h-full flex hover:bg-muted transition-colors p-1 rounded-md items-center justify-center gap-1">
          <BiTime size={18} />
          <span className="text-sm">{created_at}</span>
        </div>
        <Separator orientation="vertical" />
        <div className="w-1/4 h-full flex bg-green-900/60 group/status hover:bg-green-600 transition-colors p-1 rounded-md items-center justify-center gap-1">
          <GrStatusGoodSmall size={10} className="transition-colors text-green-600 group-hover/status:text-accent-foreground" />
          <span className="transition-colors text-sm text-green-600 group-hover/status:text-accent-foreground">Good</span>
        </div>
      </div>
    </div>
  )
}
export { ProjectCard }
