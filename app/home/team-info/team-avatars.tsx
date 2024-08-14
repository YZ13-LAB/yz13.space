"use client"

import { TeamMember } from "@/actions/team-members"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/mono/components/avatar"

type TeamAvatarsProps = {
  members?: TeamMember[]
  max?: number
}

const TeamAvatars = ({ max, members = [] }: TeamAvatarsProps) => {
  const sliced = max ? members.slice(0, max) : members
  const isMoreThanSlice = max ? members.length >= 5 : false
  const aboveSliceCount = members.length - 5
  return (
    <div className="h-9 w-full -space-x-3">
      {
        sliced.map(
          (member, index) =>
            <Avatar key={`${member.uid}#${index}`} className="size-9 inline-block rounded-full border bg-yz-neutral-100">
              <AvatarImage src={member.avatar_url ?? ""} />
              <AvatarFallback className="uppercase">{member.username.slice(0, 2)}</AvatarFallback>
            </Avatar>
        )
      }
      {
        isMoreThanSlice &&
        <div className="size-9 inline-block rounded-full border bg-yz-neutral-100">
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-sm text-secondary">{aboveSliceCount}</span>
          </div>
        </div>
      }
    </div>
  )
}
export { TeamAvatars }
