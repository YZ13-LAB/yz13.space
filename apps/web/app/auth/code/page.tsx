import { ThemeSwitcher } from "@/app/_components/entities/theme"
import { Background } from "@/app/_components/widgets/background"
import { ThemedLogo } from "@/components/shared/theme-logo"
import { User } from "@/components/shared/user"
import { Button } from "@repo/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/input-otp"
import Link from "next/link"
import { Suspense } from "react"
import { BiX } from "react-icons/bi"

const page = () => {
  return (
    <div className="w-full h-screen relative">
      <header className="flex items-center justify-between px-6 w-full h-16">
        <div className="flex items-center gap-2">
          <ThemedLogo width={36} height={36} mode="symbol" alt="header-logo" />
          <h1 className="text-2xl font-bold">YZ13 ID</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <Button size="icon" variant="secondary" asChild><Link href="/"><BiX size={20} /></Link></Button>
        </div>
      </header>
      <div style={{ height: "calc(100dvh - 64px)" }} className="p-6 w-full h-full flex flex-col items-center justify-center">
        <div className="max-w-sm px-6 py-12 w-full rounded-xl flex flex-col items-center justify-center gap-12 bg-accents-1/60 backdrop-blur border h-fit">
          <div className="flex flex-col gap-6 justify-center items-center">
            <User size={64} />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Welcome back, YZ13</h1>
              <p className="text-center text-sm text-secondary">Just write code, and thats it</p>
            </div>
          </div>
          <InputOTP maxLength={6} className="mx-auto">
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-12 text-2xl font-bold aspect-square" />
              <InputOTPSlot index={1} className="w-12 h-12 text-2xl font-bold aspect-square" />
              <InputOTPSlot index={2} className="w-12 h-12 text-2xl font-bold aspect-square" />
              <InputOTPSlot index={3} className="w-12 h-12 text-2xl font-bold aspect-square" />
              <InputOTPSlot index={4} className="w-12 h-12 text-2xl font-bold aspect-square" />
              <InputOTPSlot index={5} className="w-12 h-12 text-2xl font-bold aspect-square" />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
      <Suspense fallback={<div className="w-full absolute z-[-3] bg-muted animate-pulse" />}>
        <Background />
      </Suspense>
    </div>
  )
}
export default page