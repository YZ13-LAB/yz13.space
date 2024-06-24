import { createClient } from "@/packages/supabase/src/supabase/server"
import { Button } from "@/packages/ui/src/components/button"
import { Separator } from "@/packages/ui/src/components/separator"
import { cookies } from "next/headers"
import { Logo } from "../_components/logo"
import { NavMenu } from "./nav-menu"
import { UserProfile } from "./user"

const Header = async () => {
  const cks = cookies()
  const locale = (cks.get("locale")?.value || "").slice(0, 2)
  const localeCode = locale.toUpperCase()
  const sp = createClient(cks)
  const { data: { user } } = await sp.auth.getUser()
  const isLogged = !!user
  return (
    <header className="w-full h-16">
      <div className="z-10 flex items-center justify-between w-full h-full max-w-full px-6 mx-auto">
        <div className="flex items-center gap-6">
          <Logo size={42} lang={localeCode} withTitle />
          <NavMenu className="md:flex hidden" />
        </div>
        <div className="z-10 flex items-center gap-3">
          <Button size="sm" variant="outline">Contact</Button>
          <Separator orientation="vertical" className="h-8" />
          {
            isLogged
              ?
              <UserProfile user={user} />
              :
              <>
                <Button size="sm" variant="outline">Login</Button>
                <Button className="md:flex hidden" size="sm" variant="default">Sign up for free</Button>
              </>
          }
        </div>
      </div>
    </header>
  )
}
export { Header }
