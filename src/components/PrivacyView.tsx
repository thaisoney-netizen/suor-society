import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { dictionaries, type Lang } from "@/i18n/dictionaries";

// Google's own add-on, the one honest opt-out available now that the site sets
// analytics cookies without asking. Linked from "Your choices" below.
const GA_OPT_OUT = "https://tools.google.com/dlpage/gaoptout";

// Privacy policy, shared by the English and Portuguese routes. Copy lives in
// dictionaries.ts like every other page. Reuses the article body styles so it
// reads like the rest of the site instead of a pasted legal template.
export default function PrivacyView({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].privacy;

  return (
    <>
      <SiteNav lang={lang} />

      <main>
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">{t.eyebrow}</div>
            <h1 className="article-headline">{t.headline}</h1>
          </div>
        </section>

        <section className="article-body">
          <div className="page">
            <p className="privacy-updated">{t.updated}</p>

            {t.sections.map((section) => (
              <div key={section.title} id={section.id}>
                <h2>{section.title}</h2>
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <h2 id="cookies">{t.cookies.title}</h2>
            {t.cookies.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="privacy-table-wrap">
              <table className="privacy-table">
                <thead>
                  <tr>
                    <th>{t.cookies.headers.name}</th>
                    <th>{t.cookies.headers.purpose}</th>
                    <th>{t.cookies.headers.life}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.cookies.rows.map((row) => (
                    <tr key={row.name}>
                      <td>
                        <code>{row.name}</code>
                      </td>
                      <td>{row.purpose}</td>
                      <td>{row.life}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 id="providers">{t.providers.title}</h2>
            {t.providers.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <ul>
              {t.providers.list.map((provider) => (
                <li key={provider.name}>
                  <a href={provider.href} target="_blank" rel="noopener noreferrer">
                    {provider.name}
                  </a>{" "}
                  {provider.role}
                </li>
              ))}
            </ul>

            <h2 id="choices">{t.choices.title}</h2>
            <p>
              {t.choices.optOut}{" "}
              <a href={GA_OPT_OUT} target="_blank" rel="noopener noreferrer">
                {t.choices.optOutLink}
              </a>
            </p>
            {t.choices.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {t.tailSections.map((section) => (
              <div key={section.title} id={section.id}>
                <h2>{section.title}</h2>
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <h2 id="contact">{t.contact.title}</h2>
            <p>
              {t.contact.body}{" "}
              <a href="mailto:hello@suorsociety.com">hello@suorsociety.com</a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  );
}
