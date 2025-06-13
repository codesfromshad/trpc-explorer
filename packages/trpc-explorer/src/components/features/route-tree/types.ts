import type { TrpcNodeType } from "../trpc/trpc-node-type-icon";

type BaseNode = {
  id: string;
  name: string;
  isDisabled: boolean;
  path: string[];
  parentId?: string;
  children?: TreeNode[];
};

type RouteNode = BaseNode & {
  type: "route";
};

type ProcedureNode = BaseNode & {
  type: "procedure";
  procedureType: Exclude<TrpcNodeType, "router">;
};

export type TreeNode = RouteNode | ProcedureNode;
