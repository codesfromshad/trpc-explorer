import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#components/ui/dropdown-menu";
import { SunIcon, MoonIcon, LaptopMinimalIcon } from "lucide-react";
import { useLocalStorage } from "#lib/hooks/use-local-storage";
import { Button } from "#components/ui/button";

export function ToggleColorScheme() {
  const [colorScheme, setColorScheme, removeColorScheme] = useLocalStorage<
    "dark" | "light" | undefined
  >("color-scheme", undefined, { raw: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex">
        <Button variant="ghost" size="icon" className="size-6 hover:text-foreground/80 text-foreground/60">
        {colorScheme === "dark" ? (
          <MoonIcon className="size-4 stroke-[1.5]" />
        ) : colorScheme === "light" ? (
          <SunIcon className="size-4 stroke-[1.5]" />
        ) : (
          <LaptopMinimalIcon className="h-4 stroke-[1.5]" />
        )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={10} >
        <DropdownMenuItem
          onSelect={() => {
            setColorScheme("dark");
            document.documentElement.classList.add("dark");
          }}
        >
          <span className="flex items-center gap-x-2">
            <MoonIcon className="size-4 stroke-[1.5]" />
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            setColorScheme("light");
            document.documentElement.classList.remove("dark");
          }}
        >
          <span className="flex items-center gap-x-2">
            <SunIcon className="size-4 stroke-[1.5]" />
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => {
          removeColorScheme();
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }}
        >
          <span className="flex items-center gap-x-2">
            <LaptopMinimalIcon className="size-4 stroke-[1.5]" />
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
