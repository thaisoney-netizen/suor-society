import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import DispatchForm from "@/components/DispatchForm";

export const metadata = {
  title: "Dispatch, Suor Society",
  description: "One email a week. The lift-and-run world, edited down.",
};

export default function Dispatch() {
  return (
    <>
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="about-pg-hero">
          <div className="page">
            <p className="about-pg-eye">Suor Society / Dispatch</p>
            <h1 className="about-pg-headline">Get the dispatch.</h1>
            <p className="about-pg-deck">
              One email a week.<br />
              The lift-and-run world, edited down.
            </p>
          </div>
        </section>

        {/* SIGNUP */}
        <section className="download-gate">
          <div className="page">
            <div className="gate-label">The Weekly Dispatch</div>
            <div className="gate-title">Sign up<br />Free</div>
            <p className="gate-desc">
              Races worth signing up for, gear worth knowing about, and the people
              doing both around a full-time job. No noise, no daily blast.
            </p>
            <ul className="gate-what">
              <li>Open-entry races worth your weekend</li>
              <li>Hybrid training and gear we actually use</li>
              <li>San Diego crew runs and meetups</li>
            </ul>
            <DispatchForm />
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
