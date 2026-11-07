import { h } from "vue";
import { UButton } from "#components";

type HeaderColumn = {
  getIsSorted: () => false | "asc" | "desc";
  toggleSorting: (desc?: boolean) => void;
};

export const sortableColumn = (
  accessorKey: string,
  label: string,
  widthClass?: string,
) => ({
  accessorKey,
  enableSorting: true,
  meta: widthClass ? { class: { th: widthClass, td: widthClass } } : undefined,
  header: ({ column }: { column: HeaderColumn }) => {
    const isSorted = column.getIsSorted();
    return h(UButton, {
      label,
      color: "neutral",
      variant: "ghost",
      class: "-mx-2.5 cursor-pointer",
      icon: isSorted
        ? isSorted === "asc"
          ? "i-lucide-arrow-up-narrow-wide"
          : "i-lucide-arrow-down-wide-narrow"
        : "i-lucide-arrow-up-down",
      onClick: () => column.toggleSorting(isSorted === "asc"),
    });
  },
});
