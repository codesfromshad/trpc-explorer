"use client";

import { useState } from "react"

import { TRPCExplorerLogo } from "#components/ui/trpc-explorer-logo"
import { cn } from "#lib/utils/cn";
import { Header } from "#components/layouts/header"
import { RouteTree } from "#components/features/route-tree/index"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-full lg:ml-72 xl:ml-80">
        <header
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-accent bg-muted/40">
            <div className="hidden lg:flex">

              <TRPCExplorerLogo className={cn("h-7 -mt-0.5")} />
              {/* <Link href="/" aria-label="Home">
              </Link> */}
            </div>
            <Header />
            {/* <Navigation className="hidden lg:mt-10 lg:block" /> */}
          </div>
        </header>
        <div className="relative flex h-full flex-col px-4 pt-24 sm:px-6 lg:px-8">
          <main className="flex-auto">
          </main>
          {/* <Footer /> */}
        </div>
      </div>
    </>
  )
}

export { App as default, App };
