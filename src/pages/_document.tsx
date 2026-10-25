import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <meta name="theme-color" content="#16111d" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preload" href="/art/pack.webp" as="image" type="image/webp" fetchPriority="high" />
        {/* before first paint: if the 3D pack will draw, hold the flat pack back so the visitor never sees one pack swap for another */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var c=document.createElement('canvas');if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&(c.getContext('webgl2')||c.getContext('webgl')))document.documentElement.classList.add('gl-wait')}catch(e){}",
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
