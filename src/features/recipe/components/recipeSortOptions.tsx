import { type SortOption } from "@/shared/components/SortDropDown";

export const RECIPE_SORT_OPTIONS: SortOption[] = [
  { label: "최신순", value: "inDate" },
  { label: "후기많은순", value: "reviewCount" },
];