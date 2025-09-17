import Document,{
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import {GoogleAnalytics} from '@next/third-parties/google'

export const metadata = {
  title: "Escala Terapia",
  keywords: ["Escala","Terapia","Saúde Mental","Bem-estar"],
  authors: [{name: "Roger Torres",url: "https://www.goolgle.com"}],
  description: "Escala Terapia",
};


export default class CustomDocument extends Document {

  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="es">
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-WDQTLN0HJM"></script>
        <Head>
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <GoogleAnalytics gaId="G-WDQTLN0HJM" />
      </Html>
    );
  }
}
