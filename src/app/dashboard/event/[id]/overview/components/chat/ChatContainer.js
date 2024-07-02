import { useEffect, useRef } from "react";

export default function ChatContainer({ children }) {
  const elementRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    if (!elementRef.current || !bottomRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
    resizeObserver.observe(elementRef.current);
    return () => resizeObserver.disconnect();
  }, [elementRef, bottomRef]);

  return (
    <div className="relative h-[30rem] flex-1 overflow-y-auto">
      <div className="space-y-4 p-4" ref={elementRef}>
        {children}
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
