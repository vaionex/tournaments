"use client";
import { format } from "date-fns";

export default function TimeWithTimezone({ time }) {
  return format(time, "hh:mm O");
}
