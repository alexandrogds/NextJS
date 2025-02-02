import { AppProps } from 'next/app';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* Ensure the router context is available */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
