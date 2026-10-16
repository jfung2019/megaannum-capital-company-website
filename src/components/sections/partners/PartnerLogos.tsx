import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function CasLogo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/images/partners/cas.png"
      alt="Chinese Academy of Sciences"
      width={943}
      height={271}
      className={`h-full w-auto object-contain ${className}`.trim()}
    />
  );
}
