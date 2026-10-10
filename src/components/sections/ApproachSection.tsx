import ApproachSectionContent from "./ApproachSectionContent";
import {
  APPROACH_CONTENT,
  type ApproachContent,
} from "./approach/approach.config";

type ApproachSectionProps = {
  className?: string;
  content?: ApproachContent;
};

export default function ApproachSection({
  className = "",
  content = APPROACH_CONTENT,
}: ApproachSectionProps) {
  return (
    <section
      id="approach"
      className={`relative min-h-svh w-full origin-center ${className}`.trim()}
      style={{ backgroundColor: content.background }}
      aria-labelledby="approach-heading"
      data-approach-section
    >
      <ApproachSectionContent content={content} />
    </section>
  );
}
