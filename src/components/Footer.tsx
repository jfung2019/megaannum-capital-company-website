import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import { FOOTER_CONTENT, FOOTER_LINKS } from "./footer/footer.config";
import { CONTACT_CONTENT } from "./sections/contact/contact.config";

type FooterProps = {
  className?: string;
};

export default function Footer({ className = "" }: FooterProps) {
  const year = new Date().getFullYear();
  const { brand, tagline, copyrightOwner, address, phone } = FOOTER_CONTENT;
  const emailDetail = CONTACT_CONTENT.details.find((d) => d.href?.startsWith("mailto:"));

  return (
    <footer
      id="contact"
      className={`w-full border-t border-black/10 bg-[#f6f3ec] text-[#1a1714] ${className}`.trim()}
    >
      <div className="w-full px-6 pt-14 pb-3 md:px-10 md:pt-16 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          <div>
            <Image
              src="/images/logo_megaannum.png"
              alt={brand}
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 font-mono text-[11px] font-medium tracking-[0.2em] text-[#ed7d24] uppercase">
              {brand}
            </p>
            <p className="mt-2 text-sm text-black/60">{tagline}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.2em] text-black/45 uppercase">
              Contact Us
            </p>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              {CONTACT_CONTENT.heading}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/55">
              {CONTACT_CONTENT.subhead}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-black/70">
              {emailDetail?.href ? (
                <li>
                  <a
                    href={emailDetail.href}
                    className="inline-flex items-center gap-2 transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#ed7d24]"
                  >
                    <Mail size={16} strokeWidth={2} aria-hidden />
                    Email us
                  </a>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <Phone size={16} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} strokeWidth={2} className="mt-0.5 shrink-0" aria-hidden />
                <span>{address}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.2em] text-black/45 uppercase">
              Links
            </p>
            <ul className="mt-4 space-y-3 text-sm text-black/70">
              {FOOTER_LINKS.map((link) =>
                link.disabled ? (
                  <li key={link.href} className="cursor-not-allowed text-black/35">
                    {link.label}
                  </li>
                ) : (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#ed7d24]"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <p className="mt-5 border-t border-black/10 pt-3 text-center font-mono text-[9px] tracking-[0.12em] text-black/40 uppercase">
          © {year} {copyrightOwner}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
