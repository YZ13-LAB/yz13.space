"use client"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip"
import { team } from "@yz13/api/db"
import { TeamMember } from "@yz13/api/db/types"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  author: string
  size?: number
}
const Author = ({ author, size = 36 }: Props) => {
  const [member, setMember] = useState<TeamMember | null>(null)
  useEffect(() => {
    team.getTeamMember(author)
      .then(res => {
        const member_res = res.data
        setMember(member_res)
      })
  }, [author])
  return (
    <Tooltip>
      <TooltipTrigger className="z-20" asChild>
        {
          member
            ?
            <Image
              className="aspect-square shrink-0 rounded-full border-2 border-background bg-accents-2"
              src={member?.avatar_url || ""}
              width={size} height={size}
              alt="author-photo"
            />
            : <div style={{ width: `${size}px`, height: `${size}px` }} className="aspect-square shrink-0 rounded-full border-2 border-background bg-accents-2 animate-pulse" />
        }
      </TooltipTrigger>
      <TooltipContent side="left" align="end" avoidCollisions sideOffset={6} className="rounded-l-xl rounded-tr-xl rounded-br-sm flex flex-col">
        <span className="font-semibold text-foreground">{member?.username}</span>
        <span>{member?.position}</span>
      </TooltipContent>
    </Tooltip>
  )
}
export { Author }
