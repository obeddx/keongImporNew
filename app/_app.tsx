// pages/_app.tsx
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import "../globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
