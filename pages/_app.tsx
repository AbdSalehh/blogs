import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <style jsx global>{`
        html {
          font-family: ${plusJakartaSans.style.fontFamily} !important;
        }

        body {
          background-color: white !important;
        }

        div {
          font-family: ${plusJakartaSans.style.fontFamily} !important;
        }
      `}</style>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
