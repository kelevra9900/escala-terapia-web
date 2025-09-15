import {GetServerSideProps} from "next";

import {MainLayout} from "@/components/organisms";
import {SectionHero,SectionHowItWork,SectionSubscribe,PricingItem} from "@/components/molecules";
import {BackgroundSection,BgGlassmorphism,Seo} from "@/components/atoms";

import {pricings} from "@/types";
import {getAuthCredentials} from "@/utils/auth";
import {useStartSubscription} from "@/hooks/useStartSubscription";

export default function Home() {
  const {mutate: startSubscription} = useStartSubscription();

  const handleSubscribeClick = () => {
    startSubscription();
  }

  return (
    <div className="relative overflow-hidden bg-white dark:bg-neutral-900">.
      <Seo
        title="Escala Terapia | Plataforma de Terapia Psicológica Profesional en Línea"
        description="Accede a sesiones de terapia en línea con profesionales certificados. Agenda fácilmente, responde formularios clínicos y lleva el control de tu progreso emocional."
        url="https://escala-terapia.com"
        image="https://escala-terapia.com/images/og-image.jpg"
        keywords={[
          "terapia en línea",
          "terapia psicológica",
          "terapeutas profesionales",
          "psicología online",
          "plataforma de salud mental",
        ]}
      />

      <BgGlassmorphism />

      <div className="container mx-auto px-4 mb-24 space-y-24 lg:mb-28 lg:space-y-28">
        <SectionHero />
        <SectionHowItWork />

        <div className="pb-24 lg:pb-32">
          <header className="mx-auto my-20 max-w-2xl text-center">
            <h2 className="flex font-(family-name:--font-playfair) items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
              <span className="me-4 text-3xl leading-none md:text-4xl">💎</span>
              Suscripciones
            </h2>
          </header>
          <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
            <div className="mx-auto max-w-2xl">
              {pricings?.length ? (
                <PricingItem pricing={pricings[0]} onClick={handleSubscribeClick} key={pricings?.length} />
              ) : null}
            </div>
          </section>
        </div>

        <SectionSubscribe />

        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20" />
        </div>
      </div>
    </div>
  );
}

Home.Layout = MainLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {permissions} = getAuthCredentials(ctx)
  return {
    props: {
      userPermissions: permissions,
    },
  };
};
