import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import WelcomeDialog from "@/components/WelcomeDialog";
import { setModalController } from "@/utils/api";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  setModalController(setIsDialogVisible);

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
      <WelcomeDialog
        open={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
      />
    </QueryClientProvider>
  );
}

export default App;
