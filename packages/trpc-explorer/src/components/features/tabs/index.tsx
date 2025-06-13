import { Badge } from "#components/ui/badge";
import { cn } from "#lib/utils/cn";
import { XIcon } from "lucide-react";
import { Button } from "#components/ui/button";
import { MeasuringStrategy } from "@dnd-kit/core";
import {
  type AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { horizontalListSortingStrategy } from "#components/features/tabs/strategies";
import { Sortable } from "#components/ui/dnd-kit/sortable";
import { List } from "#components/ui/dnd-kit/components/list/list";

export function Tabs() {
  const animateLayoutChanges: AnimateLayoutChanges = (args) =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true });

  return (
    <Sortable
      // {...props}
      Container={(props: any) => <List horizontal {...props} />}
      itemCount={3}
      items={[
        {
          id: "0194272a-f52c-76b4-8d47-8501c81a93b7",
          isInPreview: false,
          name: "getCountry",
          trpcNodeType: "query",
        },
        {
          id: "0194272b-20d6-79e9-9311-af77ddcc9203",
          isInPreview: true,
          name: "page.tsx",
          trpcNodeType: "query",
        },
        {
          id: "0194272b-20d6-79e9-9311-af77ddcc9103",
          isInPreview: false,
          name: "dest",
          trpcNodeType: "subscription",
        },
      ]}
      strategy={horizontalListSortingStrategy}
      animateLayoutChanges={animateLayoutChanges}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      activationConstraint={{ distance: 6 }}
      removable
    />
  );
}
