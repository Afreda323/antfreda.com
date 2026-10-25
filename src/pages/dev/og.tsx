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

const fan = ["digitalocean", "yum", "contact"].map((id) => ({ card: cards.find((c) => c.id === id)!, index: cards.findIndex((c) => c.id === id) }));

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
          {fan.map(({ card, index }, k) => (
            <div key={card.id} className="og-card" style={{ ["--k" as string]: k }}>
              <CardFace card={card} index={index} eager />
            </div>
          ))}
          <div className="og-pack">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/pack.webp" alt="" />
            <span className="og-pack-name">{profile.name}</span>
          </div>
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
          top: 120px;
          left: calc(150px + var(--k) * 120px);
          width: 250px;
          container-type: inline-size;
          transform: rotate(calc(-14deg + var(--k) * 14deg)) translateY(calc(var(--k) * -8px));
          transform-origin: 50% 120%;
        }
        .og-pack {
          position: absolute;
          left: 40px;
          top: 70px;
          width: 300px;
          height: 470px;
          border-radius: 10px;
          overflow: hidden;
          transform: rotate(-8deg);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
        }
        .og-pack img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .og-pack-name {
          position: absolute;
          top: 52px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-variation-settings: "wdth" 80;
          font-size: 40px;
          letter-spacing: -0.03em;
          color: #fff;
          -webkit-text-stroke: 0.04em #2a1240;
          paint-order: stroke fill;
        }
      `}</style>
    </>
  );
}
