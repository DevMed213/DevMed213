import { faqs } from "@/lib/site";

export function FaqList() {
  return (
    <div className="border-t border-white/15">
      {faqs.map((item) => (
        <details key={item.q} className="group border-b border-white/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-lg font-medium [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="font-mono text-sm text-white/40 transition group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-white/60">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
