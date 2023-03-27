import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import custonTheme from "@/styles/theme";
import { AuthProvider } from "@/contexts/authContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={custonTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}
