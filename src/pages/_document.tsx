import Document,{
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

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
        <Head>
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
