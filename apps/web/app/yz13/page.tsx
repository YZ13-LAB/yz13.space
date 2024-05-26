import { getMDXData } from "@/utils/mdx"
import { Button } from "@repo/ui/button"
import { cn } from "@repo/ui/cn"
import { getProjects } from "@yz13/api/db/project"
import { getStorageItem } from "@yz13/supabase/storage"
import dayjs from "dayjs"
import { MDXRemote } from "next-mdx-remote/rsc"
import Image from "next/image"
import Link from "next/link"
import path from "path"
import { TbBrandAppgallery, TbCalendar } from "react-icons/tb"
import { SidebarLarge } from "./sidebar-large"

// # need types for feed

const page = async () => {
  const { data } = await getProjects()
  const projects = (data || [])
  const allMDX = getMDXData(path.join(process.cwd(), 'app', 'event', 'events'))
  const pr_feed = projects.map(pr => ({ type: pr.type, created_at: pr.created_at, item: pr }))
  const mdx_feed = allMDX.map(mdx => ({ type: "event", created_at: mdx.metadata.created_at, item: mdx }))
  const feed = [...pr_feed, ...mdx_feed].sort((a, b) => {
    const a_date = dayjs(a.created_at)
    const b_date = dayjs(b.created_at)
    return b_date.diff(a_date)
  })
  // console.log(feed)
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="md:block hidden w-full no-scrollbar overflow-y-auto h-full p-3 space-y-3">
        <div className="max-w-xl mx-auto w-full space-y-6">
          {
            feed.map(({ created_at, item, type }) => {
              const time_created_at = dayjs(created_at).format("HH:ss")
              const date_created_at = dayjs(created_at).format("DD MMMM YYYY")
              if (item.type === "app" || item.type === "package") {
                const attachments = item.attachments.map(attachment => getStorageItem([attachment]))

                return (
                  <section key={item.id} className="w-full p-6">
                    <div className="flex items-center gap-2 relative">
                      <Link href={`/yz13/${item.id}`} className="w-full h-full absolute left-0 top-0" prefetch />
                      <h2 className="text-4xl font-bold">{item.name}</h2>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <TbBrandAppgallery size={14} />
                          <span className="text-xs">{time_created_at}</span>
                        </div>
                        <span className="text-xs">{date_created_at}</span>
                      </div>
                    </div>
                    <div className="w-full py-3">
                      {
                        item.description &&
                        <p className="font-headings text-2xl">{item.description}</p>
                      }
                    </div>
                    <div className="flex flex-row items-start gap-1 flex-wrap">
                      {
                        item.tags.map(tag =>
                          <span key={tag} className="px-2 py-1 rounded-full border text-xs">{tag}</span>

                        )
                      }
                    </div>
                    <div className="w-full gap-4 attachments-grid grid mt-6">
                      {
                        attachments.map(
                          (attachment, index) =>
                            <Image
                              key={attachment}
                              src={attachment}
                              className={cn("!relative rounded-xl object-cover", index === 0 ? "attachment-a" : index === 1 ? "attachment-b" : "attachment-c")}
                              fill alt="attachment"
                            />
                        )
                      }
                    </div>
                  </section>
                )
              }
              return (
                <section key={item.type + "-" + created_at} className="w-full p-6">
                  <div className="flex items-center gap-2 relative">
                    <Link href={`/yz13/event/${item.slug}`} className="w-full h-full absolute left-0 top-0" prefetch />
                    <h2 className="text-4xl font-bold">{item.metadata.title}</h2>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <TbCalendar size={14} />
                        <span className="text-xs">{time_created_at}</span>
                      </div>
                      <span className="text-xs">{date_created_at}</span>
                    </div>
                  </div>
                  <div className="w-full py-3">
                    {
                      item.metadata.description &&
                      <p className="font-headings text-2xl">{item.metadata.description}</p>
                    }
                  </div>
                  <div className="flex flex-row items-start gap-1 flex-wrap">
                    <span className="px-2 py-1 rounded-full border text-xs">{item.metadata.theme}</span>
                  </div>
                  <div className="w-full line-clamp-3 md-layout">
                    <MDXRemote source={item.content} />
                  </div>
                  <div className="flex items-center mt-6">
                    <Button variant="outline" asChild>
                      <Link href={`/yz13/event/${item.slug}`}>
                        Read more
                      </Link>
                    </Button>
                  </div>
                </section>
              )
            })
          }
        </div>
      </div>
      <SidebarLarge />
    </div>
  )
}
export default page