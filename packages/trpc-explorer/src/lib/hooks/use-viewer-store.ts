import { create } from "zustand";

type ProcedureType = "query" | "mutation" | "subscription";

export interface TabsProps {
  id: string;
  name: string;
  isInPreview: boolean;
  procedureType: ProcedureType;
}

type RouteTreeViewElement = {
  id: string;
  name: string;
  procedureType?: ProcedureType;
  isSelectable?: boolean;
  children?: RouteTreeViewElement[];
};

interface ViewerStore {
  selectedId: string | undefined;
  activeTabId: string | undefined;
  expandedItems: string[];
  indicator: boolean;
  tabs: TabsProps[];
  direction: "rtl" | "ltr";

  // Actions
  activateTab: (id: string) => void;
  handleExpand: (id: string) => void;
  selectItem: (id: string) => void;
  setExpandedItems: (items: string[]) => void;
  addTab: (tab: TabsProps) => void;
  closeTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<TabsProps>) => void;
}

const useViewerStore = create<ViewerStore>((set, get) => ({
  selectedId: undefined,
  activeTabId: undefined,
  expandedItems: [],
  indicator: false,
  tabs: [],
  direction: "ltr", // or 'rtl', if needed

  activateTab: (id) => set({ activeTabId: id }),
  handleExpand: (id) => {
    const { expandedItems } = get();
    const exists = expandedItems.includes(id);
    set({
      expandedItems: exists
        ? expandedItems.filter((item) => item !== id)
        : [...expandedItems, id],
    });
  },
  selectItem: (id) => set({ selectedId: id }),

  setExpandedItems: (items) => set({ expandedItems: items }),

  addTab: (tab) =>
    set((state) => ({
      tabs: [...state.tabs, tab],
      activeTabId: tab.id,
    })),

  closeTab: (id) =>
    set((state) => {
      const tabs = state.tabs.filter((tab) => tab.id !== id);
      const activeTabId =
        state.activeTabId === id ? tabs.at(-1)?.id ?? undefined : state.activeTabId;
      return { tabs, activeTabId };
    }),

  updateTab: (id, updates) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === id ? { ...tab, ...updates } : tab
      ),
    })),
}));
