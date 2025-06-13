import {
  type AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  horizontalListSortingStrategy,
  arrayMove,
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  type SortingStrategy,
  rectSortingStrategy,
  type NewIndexGetter,
} from "@dnd-kit/sortable";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { List } from "./components/list/list";
import { Item } from "./components/item/item";

import {
  type Active,
  type Announcements,
  closestCenter,
  type CollisionDetection,
  DragOverlay,
  DndContext,
  type DropAnimation,
  KeyboardSensor,
  type KeyboardCoordinateGetter,
  type Modifiers,
  MouseSensor,
  type MeasuringConfiguration,
  type PointerActivationConstraint,
  type ScreenReaderInstructions,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import { Wrapper } from "#components/ui/dnd-kit/components/wrapper/wrapper";
import { cn } from "#lib/utils/cn";
import { TrpcNodeTypeIcon, type TrpcNodeType } from "#components/features/trpc/trpc-node-type-icon";
import type { UUID } from "crypto";

export type NodePath = {
  id: UUID;
  name: string;
}[];

export interface TabsProps {
  id: UUID;
  name: string;
  path?: NodePath;
  isInPreview: boolean;
  trpcNodeType: TrpcNodeType;
}

export interface Props {
  activationConstraint?: PointerActivationConstraint;
  animateLayoutChanges?: AnimateLayoutChanges;
  adjustScale?: boolean;
  collisionDetection?: CollisionDetection;
  coordinateGetter?: KeyboardCoordinateGetter;
  Container?: any; // TODO: Fix me
  dropAnimation?: DropAnimation | null;
  getNewIndex?: NewIndexGetter;
  handle?: boolean;
  itemCount?: number;
  items?: TabsProps[]; // Changed this from `UniqueIdentifier[]`
  measuring?: MeasuringConfiguration;
  modifiers?: Modifiers;
  renderItem?: any;
  removable?: boolean;
  reorderItems?: typeof arrayMove;
  strategy?: SortingStrategy;
  style?: React.CSSProperties;
  useDragOverlay?: boolean;
  getItemStyles?(args: {
    id: UniqueIdentifier;
    index: number;
    isSorting: boolean;
    isDragOverlay: boolean;
    overIndex: number;
    isDragging: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: {
    active: Pick<Active, "id"> | null;
    index: number;
    isDragging: boolean;
    id: UniqueIdentifier;
  }): React.CSSProperties;
  isDisabled?(id: UniqueIdentifier): boolean;
}

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

export function Sortable({
  activationConstraint,
  animateLayoutChanges,
  adjustScale = false,
  Container = List,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getItemStyles = () => ({}),
  getNewIndex,
  handle = false,
  itemCount = 16,
  items: initialItems,
  isDisabled = () => false,
  measuring,
  modifiers,
  removable,
  renderItem,
  reorderItems = arrayMove,
  strategy = rectSortingStrategy,
  style,
  useDragOverlay = true,
  wrapperStyle = () => ({}),
}: Props) {
  const [items, setItems] = useState<TabsProps[]>(
    () =>
      initialItems ?? [
        {
          id: "0194272a-f52c-76b4-8d47-8501c81a93b7",
          isInPreview: true,
          name: "getCountry",
          trpcNodeType: "query",
        },
        {
          id: "0194272b-20d6-79e9-9311-af77ddcc9203",
          isInPreview: true,
          name: "page.tsx",
          trpcNodeType: "query",
        },
      ], // Changed this from `initialItems ??`
    // ?? createRange<UniqueIdentifier>(itemCount, (index) => index + 1)
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeTabId, setActiveTabId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: "Cypress" in window ? "auto" : undefined,
      coordinateGetter,
    }),
  );
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id);
  const getPosition = (id: UniqueIdentifier) => getIndex(id) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const handleClick = (id: UniqueIdentifier) => setActiveTabId(id);
  const handleRemove = removable
    ? (id: UniqueIdentifier) =>
        setItems((items) => items.filter((item) => item.id !== id))
    : undefined;
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id,
      )}. Sortable item ${id} is in position ${getPosition(id)} of ${
        items.length
      }`;
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item"s `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn"t need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id)} of ${items.length}`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id,
      )} of ${items.length}.`;
    },
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);

        if (over) {
          const overIndex = getIndex(over.id);
          if (activeIndex !== overIndex) {
            setItems((items) => reorderItems(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <Wrapper style={style} center>
        <SortableContext items={items} strategy={strategy}>
          <Container>
            {items.map((value, index) => (
              <SortableItem
                key={value.id}
                id={value.id}
                item={value}
                handle={handle}
                index={index}
                style={getItemStyles}
                wrapperStyle={wrapperStyle}
                disabled={isDisabled(value.id)}
                renderItem={renderItem}
                activeTab={activeTabId === value.id}
                onClick={handleClick}
                onRemove={handleRemove}
                animateLayoutChanges={animateLayoutChanges}
                useDragOverlay={useDragOverlay}
                getNewIndex={getNewIndex}
              />
            ))}
          </Container>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeId ? (
                <Item
                  value={
                    <TabBodyItem
                      name={items[activeIndex].name}
                      trpcNodeType={items[activeIndex].trpcNodeType}
                      isInPreview={items[activeIndex].isInPreview}
                    />
                  }
                  handle={handle}
                  activeTab={activeTabId === items[activeIndex].id}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle({
                    active: { id: activeId },
                    index: activeIndex,
                    isDragging: true,
                    id: items[activeIndex].id,
                  })}
                  style={getItemStyles({
                    id: items[activeIndex].id,
                    index: activeIndex,
                    isSorting: activeId !== null,
                    isDragging: true,
                    overIndex: -1,
                    isDragOverlay: true,
                  })}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  );
}

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges;
  disabled?: boolean;
  getNewIndex?: NewIndexGetter;
  id: UniqueIdentifier;
  item: TabsProps;
  index: number;
  handle: boolean;
  useDragOverlay?: boolean;
  activeTab: boolean;
  onClick?(id: UniqueIdentifier): void;
  onRemove?(id: UniqueIdentifier): void;
  style(values: any): React.CSSProperties;
  renderItem?(args: any): React.ReactElement;
  wrapperStyle: Props["wrapperStyle"];
}

export function SortableItem({
  disabled,
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  item,
  index,
  activeTab,
  onClick,
  onRemove,
  style,
  renderItem,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    activeIndex,
  } = useSortable({
    id,
    animateLayoutChanges,
    disabled,
    getNewIndex,
  });

  return (
    <Item
      ref={setNodeRef}
      value={
        <TabBodyItem
          name={item.name}
          trpcNodeType={item.trpcNodeType}
          isInPreview={item.isInPreview}
        />
      }
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef,
            }
          : undefined
      }
      renderItem={renderItem}
      index={index}
      style={style({
        index,
        id,
        isDragging,
        isSorting,
        overIndex,
      })}
      activeTab={activeTab}
      onClick={onClick ? () => onClick(id) : undefined}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}

function TabBodyItem({
  name,
  trpcNodeType,
  isInPreview,
}: {
  name: string;
  trpcNodeType: TrpcNodeType;
  isInPreview: boolean;
}) {
  return (
    <div className="flex h-8 items-center space-x-2 px-2 text-xs">
      <TrpcNodeTypeIcon trpcNodeType={trpcNodeType} />
      <span
        className={cn({
          italic: isInPreview,
        })}
      >
        {name}
      </span>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "3",
    isInPreview: false,
    name: "layout.tsx",
    trpcNodeType: "query",
  },
  {
    id: "4",
    isInPreview: true,
    name: "page.tsx",
    trpcNodeType: "query",
  },
];
