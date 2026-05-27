import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-[var(--bg-surface)]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-lg font-semibold text-[var(--text-strong)]">OrbitX</p>
            <p className="mt-4 max-w-sm text-[15px] text-[var(--text-muted)]">
              A calm, public AI engineering lab. Less hype. More systems that work.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Explore
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-[var(--text-muted)]">
              {[
                ["/projects", "Projects"],
                ["/learn", "Learn"],
                ["/what-broke", "What Broke"],
                ["/resources", "Resources"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="transition-colors duration-150 ease-out hover:text-[var(--text-primary)]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-[15px] text-[var(--text-muted)]">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-150 ease-out hover:text-[var(--text-primary)]"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors duration-150 ease-out hover:text-[var(--text-primary)]"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} OrbitX — built in public.
        </p>
      </div>
    </footer>
  );
}
