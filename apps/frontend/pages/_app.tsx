import { AppProps } from 'next/app';
import { ThemeProvider } from 'shadcn-ui';
import '../styles/globals.css';
import { setupMockYouTubeAPI } from '../utils/mockYouTubeAPI';

setupMockYouTubeAPI();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
