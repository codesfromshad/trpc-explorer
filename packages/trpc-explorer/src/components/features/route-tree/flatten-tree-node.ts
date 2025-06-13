import type { TreeNode } from "#components/features/route-tree/types";

type BaseFlattenedNode = {
  name: string;
  isDisabled: boolean;
  children?: string[];
};

type RouteFlattenedNode = BaseFlattenedNode & {
  type: "route";
};

type ProcedureFlattenedNode = BaseFlattenedNode & {
  type: "procedure";
  procedureType: "query" | "mutation" | "subscription";
};

export type FlattenedTreeNode = RouteFlattenedNode | ProcedureFlattenedNode;

export type FlattenedTreeNodeRecord = Record<string, FlattenedTreeNode>;

export function flattenTree(nodes: TreeNode[]): FlattenedTreeNodeRecord {
  const result = {} as FlattenedTreeNodeRecord;

  function traverse(node: TreeNode) {
    const { id, name, isDisabled, type, children } = node;

    if (type === "route") {
      const entry: RouteFlattenedNode = {
        name,
        isDisabled,
        type,
        children: children?.map((child) => child.id),
      };
      result[id] = entry;
    } else {
      const entry: ProcedureFlattenedNode = {
        name,
        isDisabled,
        type,
        procedureType: node.procedureType!,
      };
      result[id] = entry;
    }

    if (children) {
      children.forEach(traverse);
    }
  }

  nodes.forEach(traverse);

  return result;
}