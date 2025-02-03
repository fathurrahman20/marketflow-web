import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatIdr(idr: number) {
  const parsed = idr?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${"Rp "}${parsed}`;
}
