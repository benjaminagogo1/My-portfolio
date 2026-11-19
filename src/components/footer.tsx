import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Facebook,
  Mail,
} from "lucide-react";
import { identity } from "@/lib/content";

export function Footer({ home = false }: { home?: boolean }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <strong>{identity.name}</strong>
            <p>
              Engineering <span>·</span> AI <span>·</span> Healthcare
            </p>
          </div>
          <div className="footer-socials">
            <a href={`mailto:${identity.email}`}>
              <Mail aria-hidden="true" size={17} />
              Email
            </a>
            <a href={identity.github} target="_blank" rel="noopener noreferrer">
              <Github aria-hidden="true" size={17} />
              GitHub
              <ArrowUpRight aria-hidden="true" size={13} />
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin aria-hidden="true" size={17} />
              LinkedIn
              <ArrowUpRight aria-hidden="true" size={13} />
            </a>
            <a
              href={identity.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook aria-hidden="true" size={17} />
              Facebook
              <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Otete Benjamin Agogo.</p>
          <p>Built with intention. Made to connect.</p>
          <a href={home ? "#home" : "#main-content"}>
            Back to top <ArrowUp aria-hidden="true" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
