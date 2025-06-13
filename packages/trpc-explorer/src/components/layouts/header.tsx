import { motion, useScroll, useTransform } from "motion/react";
// import Link from "next/link"
import { forwardRef } from "react";
import { CodeXmlIcon, SquareArrowOutUpRightIcon } from "lucide-react";

import { Button } from "#components/ui/button";
import { TRPCExplorerLogo } from "#components/ui/trpc-explorer-logo";
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from "#components/features/mobile-navigation";
import { MobileSearch, Search } from "#components/features/search";
import { ToggleColorScheme } from "#components/features/toggle-color-scheme";
import { CloseButton } from "@headlessui/react";
import { cn } from "#lib/utils/cn";
import { Tabs } from "#components/features/tabs/index";

function TopLevelNavItem({
  href,
  target,
  children,
}: {
  href: string;
  target?: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target={target}
        className="text-xs text-nowrap text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
        {target === "_blank" && (
          <SquareArrowOutUpRightIcon className="mb-px ml-1 inline size-3 stroke-[1.5] align-text-bottom" />
        )}
      </a>
    </li>
  );
}

export const Header = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<typeof motion.div>
>(function Header({ className, ...props }, ref) {
  const { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
  const isInsideMobileNavigation = useIsInsideMobileNavigation();

  const { scrollY } = useScroll();
  const bgOpacityLight = useTransform(scrollY, [0, 72], ["50%", "90%"]);
  const bgOpacityDark = useTransform(scrollY, [0, 72], ["20%", "80%"]);

  return (
    <motion.div
      {...props}
      ref={ref}
      className={cn(
        className,
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
        !isInsideMobileNavigation &&
          "backdrop-blur-xs lg:left-72 xl:left-80 dark:backdrop-blur-sm",
        isInsideMobileNavigation
          ? "bg-white dark:bg-zinc-900"
          : "bg-white/(--bg-opacity-light) dark:bg-zinc-900/(--bg-opacity-dark)",
      )}
      style={
        {
          "--bg-opacity-light": bgOpacityLight,
          "--bg-opacity-dark": bgOpacityDark,
        } as React.CSSProperties
      }
    >
      {/* Bottom border for the Header */}
      <div
        className={cn(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) && "bg-border",
        )}
      />
      
      <div className="absolute inset-0 top-full transition mt-[1.333px]">

        <Tabs/>

        {/* Bottom border for the Tabs */}
        <div
          className={cn(
            " inset-x-0 top-full bg-border h-px transition -z-50",
            // (isInsideMobileNavigation || !mobileNavIsOpen) &&
            //   "bg-zinc-900/7.5 dark:bg-white/7.5",
          )}
        />
      
      </div>

      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation />
        <TRPCExplorerLogo className="h-7" />
        {/* <CloseButton  aria-label="Home">
        </CloseButton> */}
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden min-[900px]:block">
          <ul role="list" className="-mt-0.5 flex items-center gap-8">
            <TopLevelNavItem href="/" target="_blank">
              tRPC v11 Docs
            </TopLevelNavItem>
            <TopLevelNavItem href="#" target="_blank">
              Create an Issue
            </TopLevelNavItem>
            <TopLevelNavItem href="#">Changelog</TopLevelNavItem>
          </ul>
        </nav>
        <div className="hidden min-[900px]:block h-5 w-px bg-border" />
        <div className="flex gap-4">
          <MobileSearch />
          <ToggleColorScheme />
        </div>
        <div className="hidden min-[416px]:contents">
          <Button className="h-8 text-xs">
            <CodeXmlIcon className="size-4 stroke-[1.5]" />
            Headers
          </Button>
        </div>
      </div>
    </motion.div>
  );
});
