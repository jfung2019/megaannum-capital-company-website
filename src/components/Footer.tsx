import { FOOTER_CONTENT } from "./footer/footer.config";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const year = new Date().getFullYear();
  const { brand, tagline, copyrightOwner, legal } = FOOTER_CONTENT;

  return (
    <footer
      className={`w-full border-t border-white/10 bg-[#0b1d36] text-white ${className}`.trim()}
    >
      <div className="flex w-full flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10 md:py-12 lg:px-14 xl:px-20">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-[0.28em] text-[#ed7d24] uppercase">
            {brand}
          </p>
          <p className="mt-2 text-sm text-white/55">{tagline}</p>
        </div>

        <p className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase md:text-right">
          © {year} {copyrightOwner}
        </p>
      </div>

      <p className="border-t border-white/10 px-6 py-6 text-xs leading-relaxed text-white/40 md:px-10 lg:px-14 xl:px-20">
        {legal}
      </p>
    </footer>
  );
}
