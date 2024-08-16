import { getI18n } from "@/locales/server"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@yz13/mono/components/command"
import "dayjs/locale/en"
import "dayjs/locale/ru"
import { cookies } from "next/headers"
import Link from "next/link"
import { PiHouseSimpleDuotone } from "react-icons/pi"
import { cn } from "yz13/cn"
import { createClient } from "yz13/supabase/server"

const Menu = async ({ className = "" }: { className?: string }) => {
  const cks = cookies()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const t = await getI18n()
  return (
    <Command className={cn("w-full", className)}>
      <CommandInput placeholder={t("dock.search.placeholder")} />
      <CommandList className="overflow-hidden">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup className="uppercase text-secondary" heading={t("dock.nav.group.name")}>

          <CommandItem
            className="gap-2 cursor-pointer capitalize transition-colors rounded-lg text-foreground/60 hover:text-foreground"
            asChild
          >
            <Link href="/home">
              <PiHouseSimpleDuotone size={16} className="text-inherit" />
              <span className="text-inherit">{t("dock.nav.home.label")}</span>
            </Link>
          </CommandItem>

        </CommandGroup>
      </CommandList>
    </Command>
  )
}
export { Menu }
