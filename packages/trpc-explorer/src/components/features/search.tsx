import { SearchIcon } from "lucide-react";

import { useOS } from "#lib/hooks/use-os";
import { Button } from "#components/ui/button";
import { cn } from "#lib/utils/cn";

export function Search({ ...props }) {
  const { os, device } = useOS();

  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto min-w-0">
      <Button
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-between rounded-[0.5rem] bg-muted/50 text-xs font-normal text-muted-foreground shadow-none overflow-hidden min-w-0 pe-[0.313rem]",
        )}
        // onClick={() => setOpen(true)}
        {...props}
      >
          <span className="truncate min-w-0">
            Search routes and procedures...
          </span>
        {device === "Desktop" && <kbd className="pointer-events-none right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          {os === "Mac" && (<><span className="text-xs">⌘</span>K</>)}
          {os !== "Mac" && (<>Ctrl K</>)}
        </kbd>}
      </Button>
    </div>
  );
}

export function MobileSearch() {
  // let { close } = useMobileNavigationStore()
  // let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 lg:hidden dark:hover:bg-white/5"
        aria-label="Find something..."
        // {...buttonProps}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <SearchIcon className="size-4 stroke-[1.5] stroke-zinc-900 dark:stroke-white" />
      </button>
      {/* <Suspense fallback={null}>
        <SearchDialog
          className="lg:hidden"
          onNavigate={close}
          {...dialogProps}
        />
      </Suspense> */}
    </div>
  )
}