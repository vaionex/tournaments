"use client";

import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export default function FormattedTime({ date }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    setFormattedTime(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  return <span>{formattedTime}</span>;
}