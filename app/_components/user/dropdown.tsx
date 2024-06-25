"use client"
import { createClient } from "@/packages/supabase/src/supabase/client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/packages/ui/src/components/dropdown-menu"
import { Separator } from "@/packages/ui/src/components/separator"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { ReactNode, useState } from "react"
import { LuCog, LuLayoutGrid, LuLogOut } from "react-icons/lu"

type Props = {
  children?: ReactNode
  user: User
}
const UserDropdown = ({ children, user }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const metadata = user.user_metadata
  const name = metadata.name
  const email = metadata.email
  const router = useRouter()
  const signOut = async () => {
    const sp = createClient()
    sp.auth.signOut()
      .then(() => router.refresh())
  }
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild={!!children}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 gap-0 p-0 space-y-0 rounded-xl h-fit">
        <DropdownMenuLabel className="flex flex-col p-3">
          <span className="text-lg">{name}</span>
          <span className="text-sm text-secondary">{email}</span>
        </DropdownMenuLabel>
        <Separator />
        <div className="w-full p-2">
          <DropdownMenuItem className="gap-2 h-9">
            <LuLayoutGrid size={14} />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 h-9">
            <LuCog size={14} />
            Account settings
          </DropdownMenuItem>
        </div>
        <Separator />
        <div className="w-full p-2">
          <DropdownMenuItem onClick={signOut} className="gap-2 h-9">
            <LuLogOut />
            Log out
          </DropdownMenuItem>
        </div>
        <Separator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export { UserDropdown }
