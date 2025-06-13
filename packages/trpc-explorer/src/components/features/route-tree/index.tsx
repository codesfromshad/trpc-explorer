import { cn } from "#lib/utils/cn";
import { useTree } from "@headless-tree/react";
import {
  hotkeysCoreFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core";
import { motion, AnimatePresence } from "framer-motion";
import { flattenTree, type FlattenedTreeNode } from "#components/features/route-tree/flatten-tree-node";
import data from "./data";
import { ChevronDownIcon } from "lucide-react";
import { TrpcNodeTypeIcon } from "#components/features/trpc/trpc-node-type-icon";

export const RouteTree = () => {
  // Flatten once, not on every function call
  const flattened = flattenTree(data);
  const syncDataLoader = {
    getItem: (id: string) => flattened[id],
    getChildren: (id: string) => flattened[id]?.children ?? [],
  };

  const tree = useTree<FlattenedTreeNode>({
    initialState: {
      expandedItems: ["a3c5bfa0-d416-4f44-bb43-1eac9fa2a002"],
    },
    rootItemId: "a3c5bfa0-d416-4f44-bb43-1eac9fa2a002",
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => item.getItemData().type === "route",
    dataLoader: syncDataLoader,
    indent: 20,
    features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
  });

  const renderItem = (item: ReturnType<typeof tree.getItems>[number]) => {
    const isFolder = item.isFolder();
    const isExpanded = item.isExpanded();
    const children = item.getChildren();
    const itemType = item.getItemData().type;
    const itemProcedureType =
      item.getItemData().type === "procedure"
        ? item.getItemData().procedureType
        : null;

    return (
      <div key={item.getId()} className="relative w-full">
        {/* Vertical line for this folder's children */}
        {isFolder && isExpanded && children.length > 0 && (
          <div
            className="bg-muted absolute top-[1.5rem] bottom-0 w-px rounded-md"
            style={{
              left: `calc(${item.getItemMeta().level * 2.625}rem + 0.375rem)`,
            }}
          />
        )}
        <button
          {...item.getProps()}
          style={{ paddingLeft: `${item.getItemMeta().level * 2.625}rem` }}
          className="w-full text-left"
        >
          <div
            className={cn("flex items-center gap-1.5 rounded-md text-xs", {
              focused: item.isFocused(),
              selected: item.isSelected(),
              folder: isFolder,
            })}
          >
            {isFolder && (
              <motion.div
                animate={{ rotate: isExpanded ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="size-3.5 stroke-[1.5]" />
              </motion.div>
            )}
            <TrpcNodeTypeIcon
              trpcNodeType={
                itemType === "route"
                  ? "router"
                  : itemProcedureType
                    ? itemProcedureType
                    : undefined
              }
            />
            {item.getItemName()}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && children.length > 0 && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative overflow-hidden"
            >
              {children.map(renderItem)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      {...tree.getContainerProps()}
      className="flex h-full w-full flex-col items-start justify-start overflow-y-auto p-2"
    >
      {tree
        .getItems()
        .filter((item) => item.getItemMeta().level === 0)
        .map(renderItem)}
    </div>
  );
};
