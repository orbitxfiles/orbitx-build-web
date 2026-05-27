"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FILTER_TOPICS } from "@/lib/learn-topics";

export function TopicFilter({ activeTopic }: { activeTopic: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function selectTopic(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") {
      params.delete("topic");
    } else {
      params.set("topic", id);
    }
    const qs = params.toString();
    router.push(qs ? `/learn?${qs}` : "/learn", { scroll: false });
  }

  return (
    <section style={{ background: "#f0f5f8", padding: "32px 0" }}>
      <div className="mx-auto max-w-[1100px] px-8">
        <div className="-mx-2 flex flex-wrap gap-2 overflow-x-auto px-2 pb-1 md:overflow-visible">
          {FILTER_TOPICS.map((t) => {
            const selected = activeTopic === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTopic(t.id)}
                className="shrink-0 rounded-[20px] px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ease-out"
                style={
                  selected
                    ? {
                        background: "#0a3450",
                        color: "#ffffff",
                        border: "1px solid transparent",
                      }
                    : {
                        background: "rgba(255,255,255,0.80)",
                        color: "#4a6b82",
                        border: "1px solid rgba(13,67,102,0.14)",
                      }
                }
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
