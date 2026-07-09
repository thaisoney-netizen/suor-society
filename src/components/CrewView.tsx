import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

// ── NEXT RUN ──
// No run on the calendar yet. When one is set, swap scheduled to true
// and fill in the date / time / meet lines below.
const NEXT_RUN = {
  scheduled: false,
  date: "",
  time: "",
  meet: "",
};

const IG_HREF = "https://instagram.com/suorsociety";

// Crew page, shared by the English and Portuguese routes.
export default function CrewView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].crew;
  return (
    <>
      <SiteNav lang={lang} />

      <main>
        {/* HERO */}
        <section className="about-pg-hero crew-hero">
          <div className="page">
            <p className="about-pg-eye">{t.eyebrow}</p>
            <h1 className="about-pg-headline">{t.headline}</h1>
            <p className="about-pg-deck">
              {t.deck1}<br />
              {t.deck2}
            </p>
          </div>
        </section>

        {/* NEXT RUN — split: text one side, photo the other */}
        <section className="crew-split">
          <div className="crew-split-text">
            <div className="crew-split-inner">
              <p className="about-pg-crew-eye">{t.nextRunEye}</p>
              {NEXT_RUN.scheduled ? (
                <>
                  <h2 className="about-pg-crew-title">{NEXT_RUN.date}</h2>
                  <div className="about-pg-crew-table">
                    <div className="about-pg-crew-row">
                      <span>{t.timeLabel}</span>
                      <span>{NEXT_RUN.time}</span>
                    </div>
                    <div className="about-pg-crew-row">
                      <span>{t.meetLabel}</span>
                      <span>{NEXT_RUN.meet}</span>
                    </div>
                    <div className="about-pg-crew-row">
                      <span>{t.costLabel}</span>
                      <span>{t.costValue}</span>
                    </div>
                  </div>
                  <p className="about-pg-crew-note">
                    {t.scheduledNotePre}
                    <a href={IG_HREF} target="_blank" rel="noopener noreferrer">
                      @suorsociety
                    </a>
                    {t.scheduledNotePost}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="about-pg-crew-title">{t.unscheduledTitle}</h2>
                  <p className="about-pg-crew-note">
                    {t.unscheduledNotePre}
                    <a href={IG_HREF} target="_blank" rel="noopener noreferrer">
                      @suorsociety
                    </a>
                    {t.unscheduledNotePost}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="crew-split-media">
            <img src="/crew-run.jpg" alt={t.splitImgAlt} />
          </div>
        </section>

        {/* THE FORMAT */}
        <section className="crew-lines">
          <div className="page">
            <p className="about-pg-eye">{t.formatEye}</p>
            {t.lines.map((line) => (
              <p key={line} className="crew-line">{line}</p>
            ))}
          </div>
        </section>

        {/* SCENES */}
        <section className="crew-scenes">
          <div className="page">
            <p className="about-pg-eye">{t.scenesEye}</p>
          </div>
          <div className="crew-scenes-grid">
            <img src="/road-run.jpg" alt={t.scenesAlts.road} />
            <img src="/trail-run.jpg" alt={t.scenesAlts.trail} />
            <img src="/crew-suor.webp" alt={t.scenesAlts.crew} />
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
