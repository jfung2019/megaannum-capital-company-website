import { ArrowRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Node = {
  lines: [string, string];
  filled?: boolean;
};

const NODES: Node[] = [
  { lines: ["Chinese", "tech"] },
  { lines: ["Hong", "Kong"], filled: true },
  { lines: ["Global", "capital"] },
];

/** The two connectors read outward from Hong Kong: white-to-orange on the
 * left (China feeding in), orange-to-white on the right (reaching out to
 * global capital) -- Hong Kong is visually the pivot either way you read it. */
const CONNECTOR_GRADIENTS = [
  "linear-gradient(90deg, rgba(255,255,255,0.35), #ed7d24)",
  "linear-gradient(90deg, #ed7d24, rgba(255,255,255,0.35))",
];
const CONNECTOR_ARROW_CLASSES = ["text-[#ed7d24]", "text-white/40"];

export default function BridgeDiagram() {
  return (
    <div
      className="flex items-center justify-center"
      role="img"
      aria-label="Chinese technology connects through Hong Kong to global capital"
    >
      {NODES.map((node, index) => (
        <div key={node.lines.join("-")} className="flex items-center">
          {index > 0 ? (
            <div className="mx-1 flex w-10 items-center sm:mx-2 sm:w-16 md:w-20">
              <div
                className="h-px flex-1"
                style={{ background: CONNECTOR_GRADIENTS[index - 1] }}
                aria-hidden
              />
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className={CONNECTOR_ARROW_CLASSES[index - 1]}
                aria-hidden
              />
            </div>
          ) : null}

          <div
            className={`${playfair.className} flex shrink-0 items-center justify-center rounded-full text-center leading-tight font-medium ${
              node.filled
                ? "h-20 w-20 bg-[#ed7d24] text-sm text-[#0b1d36] shadow-[0_0_0_6px_rgba(237,125,36,0.15)] sm:h-24 sm:w-24 sm:text-base"
                : "h-16 w-16 border border-white/25 text-xs text-white sm:h-[4.5rem] sm:w-[4.5rem] sm:text-sm"
            }`}
          >
            <span>
              {node.lines[0]}
              <br />
              {node.lines[1]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
