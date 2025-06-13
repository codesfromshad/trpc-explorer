import { useTree } from "@headless-tree/react";
import {
  hotkeysCoreFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { flattenTree, type FlattenedTreeNode } from "./flatten-tree-node";
import { TrpcNodeTypeIcon } from "~/components/features/trpc/trpc-node-type-icon";
import data from "./data";

function RouteTree() {

}

function syncDataLoader(data: FlattenedTreeNode) {
    return {
      getItem: (id: string) => data[id],
      getChildren: (id: string) => data[id]?.children ?? [],
    };
  }