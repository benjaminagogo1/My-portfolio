import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Check,
  FileText,
  GitBranch,
  LockKeyhole,
} from "lucide-react";

export function ProjectPreview({
  kind,
  large = false,
}: {
  kind: "screenshot" | "architecture";
  large?: boolean;
}) {
  if (kind === "screenshot")
    return (
      <div
        className={`project-preview nurse-preview${large ? " preview-large" : ""}`}
      >
        <div className="preview-eyebrow">
          <span>NURSE.NG</span>
          <span>THE NURSING ECOSYSTEM</span>
        </div>
        <div className="browser-preview">
          <div className="browser-toolbar">
            <span className="browser-dots">
              <i />
              <i />
              <i />
            </span>
            <span>
              <LockKeyhole aria-hidden="true" size={9} /> Local development
              preview
            </span>
            <span>↗</span>
          </div>
          <Image
            src="/images/nurse-ng-preview.webp"
            alt="Actual Nurse.ng public page with the headline Better Careers, Stronger Nurses, Healthier Communities and nursing career search"
            width={1440}
            height={1030}
            sizes={
              large
                ? "(max-width: 900px) 90vw, 1000px"
                : "(max-width: 760px) 90vw, 46vw"
            }
            className="nurse-screenshot"
          />
        </div>
        <span className="preview-caption">
          ACTUAL APPLICATION · LOCAL PAGE CAPTURE
        </span>
      </div>
    );
  return (
    <div
      className={`project-preview hmsi-preview${large ? " preview-large" : ""}`}
    >
      <div className="preview-eyebrow">
        <span>HMSI-API</span>
        <span>INFORMATION THAT FOLLOWS CARE</span>
      </div>
      <div className="exchange-visual">
        <div className="facility facility-one">
          <Building2 aria-hidden="true" />
          <span>Referring facility</span>
          <small>Clinical summary</small>
        </div>
        <div className="exchange-path">
          <span />
          <ArrowRight aria-hidden="true" size={16} />
        </div>
        <div className="exchange-core">
          <div className="core-icon">
            <FileText aria-hidden="true" size={27} />
            <span>
              <LockKeyhole aria-hidden="true" size={12} />
            </span>
          </div>
          <strong>HMSI</strong>
          <small>Referral exchange</small>
        </div>
        <div className="exchange-path">
          <span />
          <ArrowRight aria-hidden="true" size={16} />
        </div>
        <div className="facility facility-two">
          <Building2 aria-hidden="true" />
          <span>Receiving facility</span>
          <small>Care & outcome</small>
        </div>
      </div>
      <div className="exchange-properties">
        <span>
          <LockKeyhole aria-hidden="true" size={12} /> Facility-scoped access
        </span>
        <span>
          <GitBranch aria-hidden="true" size={12} /> Explicit lifecycle
        </span>
        <span>
          <Check aria-hidden="true" size={12} /> Audit history
        </span>
      </div>
      <span className="preview-caption">
        EXPLANATORY ARCHITECTURE · NOT A PRODUCT SCREENSHOT
      </span>
    </div>
  );
}
