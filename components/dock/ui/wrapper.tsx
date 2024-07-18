"use client"
import { cn } from "@repo/ui/cn"
import { useDebounceFn, useMutationObserver } from "ahooks"
import { cubicBezier, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ElementRef, ReactNode, useEffect, useRef, useState } from "react"
import { useDockTab } from "../store/dock.store"

type Props = {
  children?: ReactNode
}
const DockWrapper = ({ children }: Props) => {
  const pathname = usePathname()
  const ref = useRef<ElementRef<"div">>(null)
  const [width, setWidth] = useState<number>(36)
  const [show, setShow] = useState<boolean>(false)
  const { setTab, tab } = useDockTab()
  const updateDockWidth = () => {
    const div = ref.current
    if (div) {
      const width = div.clientWidth
      setWidth(width)
    }
  }
  const { run } = useDebounceFn(() => setTab(undefined), {
    wait: 1000
  })
  useMutationObserver(
    () => updateDockWidth(),
    ref,
    { attributes: true, childList: true },
  );
  useEffect(() => {
    setTab(undefined)
  }, [pathname])
  useEffect(() => {
    if (typeof document !== "undefined") setShow(true)
  }, [typeof document])
  useEffect(() => {
    const div = ref.current
    if (div) updateDockWidth()
  }, [ref, tab])
  return (
    <motion.footer
      layout
      initial={{ width: "36px" }}
      animate={{ width: "fit-content" }}
      // @ts-expect-error
      style={{ "--dock-width": `${width}px` }}
      onMouseLeave={run}
      transition={{
        easings: cubicBezier(.67, 0, .37, 1),
        damping: .600,
        bounce: .350
      }}
      ref={ref}
      id="dock"
      className={cn("dock-wrapper bg-background max-w-fit", "rounded-3xl")}
    >
      {
        show &&
        children
      }
    </motion.footer>
  )
}
export { DockWrapper }
