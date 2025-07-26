import '../styles/style_slug.css'
import '../styles/style_index.css'
import '../styles/country.css'
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} 