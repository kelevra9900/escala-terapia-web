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
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
