import Footer from "./Footer";
import MotionEffects from "./MotionEffects";
import Navigation from "./Navigation";

type PageShellProps = {
  children: React.ReactNode;
  tallGlow?: boolean;
};

export default function PageShell({ children, tallGlow = false }: PageShellProps) {
  return (
    <div className="page">
      <div className={`page-glow${tallGlow ? " page-glow--tall" : ""}`} aria-hidden>
        <span className="orb orb--violet" />
        <span className="orb orb--orange" />
        <span className="orb orb--lime" />
      </div>
      <Navigation />
      <main className="main container">{children}</main>
      <Footer />
      <MotionEffects />
    </div>
  );
}
