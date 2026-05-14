export function Footer() {
  return (
    <footer className="mt-20 border-t border-border pt-8 pb-16">
      <p className="font-mono text-[11px] text-muted">
        © {new Date().getFullYear()} Yury Khokhlov — built with Cursor
      </p>
    </footer>
  );
}
