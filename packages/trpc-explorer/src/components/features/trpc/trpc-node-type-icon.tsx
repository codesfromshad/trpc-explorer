import { Badge } from "#components/ui/badge";
import { cn } from "#lib/utils/cn";

type TrpcNodeType = "router" | "query" | "mutation" | "subscription";

const getTrpcNodeTypeInitial = (trpcNodeType: TrpcNodeType) => {
  switch (trpcNodeType) {
    case "router":
      return "R";
    case "query":
      return "Q";
    case "mutation":
      return "M";
    case "subscription":
      return "S";
    default:
      return "P";
  }
};

const variantMap: Record<
  TrpcNodeType,
  React.ComponentProps<"div">["className"]
> = {
  router:
    "bg-trpc-router-background border-trpc-router-border text-trpc-router-foreground",
  query:
    "bg-trpc-query-background border-trpc-query-border text-trpc-query-foreground",
  mutation:
    "bg-trpc-mutation-background border-trpc-mutation-border text-trpc-mutation-foreground",
  subscription:
    "bg-trpc-subscription-background border-trpc-subscription-border text-trpc-subscription-foreground",
};

function TrpcNodeTypeIcon({ trpcNodeType }: { trpcNodeType: TrpcNodeType }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-3xs size-4 rounded-sm p-1 font-mono uppercase",
        variantMap[trpcNodeType],
      )}
    >
      {getTrpcNodeTypeInitial(trpcNodeType)}
    </Badge>
  );
}

export { 
  TrpcNodeTypeIcon,
  getTrpcNodeTypeInitial,
  variantMap,
  type TrpcNodeType,
};