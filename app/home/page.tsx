import { Locales, getDict } from "@/dictionaries/tools"
import { Button } from "@/packages/ui/src/components/button"
import { Metadata } from "next"
import { cookies } from "next/headers"
import Link from "next/link"
import { AdBanner } from "../(threads)/(routes)/ad-banner"
import { Header } from "../_components/header"
import { LeftSide } from "../_components/left"
import { RightSide } from "../_components/right"
import { SplitViewContainer } from "../_components/split-view-container"
import { Library } from "./library"

export async function generateMetadata(): Promise<Metadata> {
  const cks = cookies()
  const locale = (cks.get("locale")?.value || "").slice(0, 2) as Locales
  const localeMetadata: Metadata = await getDict("metadata", locale)
  return localeMetadata
}
const page = async () => {
  return (
    <SplitViewContainer>
      <LeftSide>
        <div className="relative w-full h-full min-h-[50dvh] p-6 max-w-5xl mx-auto gap-2 flex flex-col items-center justify-center">
          <h1 className="text-5xl text-center font-bold">Help you get what you want</h1>
          <p className="text-xl text-center text-secondary">web developer</p>
        </div>
      </LeftSide>
      <RightSide className="divide-y">
        <Header />
        <AdBanner />
        <div className="p-6 space-y-6">
          <Library />
        </div>
        <div className="w-full flex flex-col gap-3 p-6">
          <p className="inline-flex flex-col text-2xl font-semibold text-secondary">
            <b className="text-foreground shrink-0">Ready for work?</b>
            Book a call, we ready to start
          </p>
          <Button className="w-fit" asChild>
            <Link href="/contact">
              Book a call
            </Link>
          </Button>
        </div>
        <footer
          className="w-full p-6 mx-auto h-fit"
          dangerouslySetInnerHTML={{ __html: "Build by <a class='underline' href='https://github.com/yz13-env'>YZ13</a>, the source code is available on <a class='underline' href='https://github.com/yz13-env/yz13.space'>Github</a>" }}
        >
        </footer>
      </RightSide>
    </SplitViewContainer>
  )
}
export default page