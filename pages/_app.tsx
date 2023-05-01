import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookProvider } from "../context/BookProvider";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ToastContainer />
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </SessionProvider>
  );
}

export default MyApp;
