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

export function ShanghaiElectricLogo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/images/partners/shanghai-electric.png"
      alt="Shanghai Electric"
      width={2000}
      height={540}
      className={`h-full w-auto object-contain ${className}`.trim()}
    />
  );
}

export function SdicLogo({ className = "" }: LogoProps) {
  return (
    <Image
      src="/images/partners/sdic.png"
      alt="SDIC"
      width={595}
      height={161}
      className={`h-full w-auto object-contain ${className}`.trim()}
    />
  );
}
