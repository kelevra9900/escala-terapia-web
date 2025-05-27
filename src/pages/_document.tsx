import {Html,Head,Main,NextScript} from "next/document";

export const metadata = {
  title: "Escala Terapia",
  keywords: ["Escala","Terapia","Saúde Mental","Bem-estar"],
  authors: [{name: "Roger Torres",url: "https://www.goolgle.com"}],
  description: "Escala Terapia",
};


export default function Document() {
  return (
    <Html lang="es">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
