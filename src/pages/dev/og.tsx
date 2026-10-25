import Head from "next/head";
import type { GetStaticProps } from "next";
import { cards } from "@/content/cards";
import { profile } from "@/content/resume";
import { CardFace } from "@/components/Card";

/**
 * Dev-only: the 1200x630 share image, laid out with the site's own fonts and
 * card components, captured to public/og.png by scripts/og.mjs.
 */
export const getStaticProps: GetStaticProps = async () => (process.env.NODE_ENV === "production" ? { notFound: true } : { props: {} });

// left to right behind the pack; the contact card sits lowest, its details tucked under the others
const fan = [
  { id: "contact", k: 0, z: 1 },
  { id: "digitalocean", k: 1, z: 2 },
  { id: "yum", k: 2, z: 3 },
].map((f) => ({ ...f, card: cards.find((c) => c.id === f.id)!, index: cards.findIndex((c) => c.id === f.id) }));

export default function Og() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="og">
        <div className="og-lamp" />
        <div className="og-copy">
          <p className="og-name">{profile.name}</p>
          <p className="og-title">{profile.title}</p>
          <p className="og-line">{profile.line}</p>
        </div>
        <div className="og-stage">
          {fan.map(({ card, index, k, z }) => (
            <div key={card.id} className="og-card" style={{ ["--k" as string]: k, zIndex: z }}>
              <CardFace card={card} index={index} eager />
            </div>
          ))}
          {/* the live 3D pack, rendered from the site (public/og-pack.webp) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="og-pack" src="/og-pack.webp" alt="" />
        </div>
      </div>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          background: #16111d;
        }
        .og {
          position: relative;
          width: 1200px;
          height: 630px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 520px 1fr;
          align-items: center;
          padding: 0 0 0 72px;
          background: #16111d;
        }
        .og-lamp {
          position: absolute;
          inset: -30% -10% -10% 30%;
          background: radial-gradient(40% 50% at 60% 45%, rgba(255, 196, 128, 0.36), transparent 70%);
        }
        .og-copy {
          position: relative;
        }
        .og-name {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-variation-settings: "wdth" 85, "opsz" 96;
          font-size: 96px;
          line-height: 0.9;
          letter-spacing: -0.035em;
          color: #f7efe3;
        }
        .og-title {
          margin: 22px 0 0;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 34px;
          color: #ffc37a;
        }
        .og-line {
          margin: 16px 0 0;
          font-size: 24px;
          line-height: 1.35;
          color: #d7cadd;
          max-width: 22ch;
        }
        .og-stage {
          position: relative;
          height: 630px;
        }
        .og-card {
          position: absolute;
          top: 110px;
          left: calc(250px + var(--k) * 105px);
          width: 240px;
          container-type: inline-size;
          transform: rotate(calc(-14deg + var(--k) * 14deg)) translateY(calc(var(--k) * -8px));
          transform-origin: 50% 120%;
        }
        .og-pack {
          position: absolute;
          z-index: 5;
          left: 10px;
          top: 34px;
          width: 380px;
          height: auto;
          filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.6)) drop-shadow(0 8px 12px rgba(0, 0, 0, 0.4));
        }
      `}</style>
    </>
  );
}
