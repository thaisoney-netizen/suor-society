import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { pageMeta } from "@/lib/seo";

// Mobile terms for the Klaviyo text message program. Klaviyo requires a public
// URL for these before SMS can be switched on, and carriers read them during
// number verification. English only: the SMS program is US only, so there is
// no pt-BR twin and the copy lives here instead of dictionaries.ts.
//
// Opt-out and help instructions say "reply to any message" rather than naming
// a sending number, so the page stays correct if Klaviyo changes the number.
// Layout reuses the privacy policy's article styles.

export const metadata = pageMeta({
  path: "/mobile-terms",
  title: "Mobile terms of service, Suor Society",
  description:
    "The terms for Suor Society text messages: what we send, how often, what it costs, and how to stop them.",
  ogType: "website",
});

export default function MobileTerms() {
  return (
    <>
      <SiteNav lang="en" />

      <main>
        <section className="article-masthead">
          <div className="page">
            <div className="article-eye">Text message program</div>
            <h1 className="article-headline">Mobile terms of service</h1>
          </div>
        </section>

        <section className="article-body">
          <div className="page">
            <div className="privacy-updated">Last updated October 4, 2026</div>

            <p>
              The Suor Society mobile message service (the “Service”) is operated by Suor Society
              (“Suor Society”, “we”, or “us”). Your use of the Service constitutes your agreement to
              these terms and conditions (“Mobile Terms”). We may modify or cancel the Service or any
              of its features without notice. To the extent permitted by applicable law, we may also
              modify these Mobile Terms at any time and your continued use of the Service following
              the effective date of any such changes shall constitute your acceptance of such
              changes.
            </p>

            <h2 id="what-we-send">What we send</h2>
            <p>
              By consenting to Suor Society’s SMS/text messaging service, you agree to receive
              recurring SMS/text messages from and on behalf of Suor Society through your wireless
              provider to the mobile number you provided, even if your mobile number is registered on
              any state or federal Do Not Call list. Text messages may be sent using an automatic
              telephone dialing system or other technology. Service-related messages may include
              updates, alerts, and information (for example, confirming your signup). Promotional
              messages may include news from Suor Society, offers, and other marketing messages.
            </p>
            <p>
              You understand that you do not have to sign up for this program in order to make any
              purchases, and your consent is not a condition of any purchase with Suor Society. Your
              participation in this program is completely voluntary.
            </p>

            <h2 id="cost-and-frequency">Cost and frequency</h2>
            <p>
              We do not charge for the Service, but you are responsible for all charges and fees
              associated with text messaging imposed by your wireless provider. Message frequency
              varies. Message and data rates may apply. Check your mobile plan and contact your
              wireless provider for details. You are solely responsible for all charges related to
              SMS/text messages, including charges from your wireless provider.
            </p>

            <h2 id="opt-out">How to stop messages</h2>
            <p>
              You may opt out of the Service at any time. Reply with the single keyword STOP to any
              text message from us, or click the unsubscribe link (where available) in any text
              message, to cancel. You’ll receive a one-time opt-out confirmation text message. No
              further messages will be sent to your mobile device, unless initiated by you. If you
              have subscribed to other Suor Society mobile message programs and wish to cancel,
              except where applicable law requires otherwise, you will need to opt out separately
              from those programs by following the instructions provided in their respective mobile
              terms.
            </p>

            <h2 id="help">Help</h2>
            <p>
              For Service support or assistance, reply HELP to any text message from us or email{" "}
              <a href="mailto:hello@suorsociety.com">hello@suorsociety.com</a>.
            </p>

            <h2 id="numbers-and-delivery">Numbers and delivery</h2>
            <p>
              We may change any short code or telephone number we use to operate the Service at any
              time and will notify you of these changes. You acknowledge that any messages, including
              any STOP or HELP requests, you send to a short code or telephone number we have changed
              may not be received and we will not be responsible for honoring requests made in such
              messages.
            </p>
            <p>
              The wireless carriers supported by the Service are not liable for delayed or
              undelivered messages. You agree to provide us with a valid mobile number. If you get a
              new mobile number, you will need to sign up for the program with your new number.
            </p>
            <p>
              To the extent permitted by applicable law, you agree that we will not be liable for
              failed, delayed, or misdirected delivery of any information sent through the Service,
              any errors in such information, and/or any action you may or may not take in reliance
              on the information or Service.
            </p>

            <h2 id="privacy">Privacy</h2>
            <p>
              We respect your right to privacy. To see how we collect and use your personal
              information, please see our <a href="/privacy">privacy policy</a>.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter lang="en" />
    </>
  );
}
