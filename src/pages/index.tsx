import {BackgroundSection,BgGlassmorphism} from "@/components/atoms";
import {SectionHero,SectionHowItWork,SectionSubscribe} from "@/components/molecules";
import PricingItem from "@/components/molecules/Pricing";
import {pricings} from "@/types";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-neutral-900">
      <BgGlassmorphism />

      {/* Contenedor principal centrado */}
      <div className="container mx-auto px-4 mb-24 space-y-24 lg:mb-28 lg:space-y-28">
        <SectionHero />
        <SectionHowItWork />

        <div className="pb-24 lg:pb-32">
          <header className="mx-auto my-20 max-w-2xl text-center">
            <h2 className="flex font-(family-name:--font-playfair) items-center justify-center text-3xl font-semibold leading-[115%] text-neutral-900 dark:text-neutral-100 md:text-5xl md:leading-[115%]">
              <span className="me-4 text-3xl leading-none md:text-4xl">💎</span>
              Suscripciones
            </h2>
            <span className="mt-2 block text-sm font-(family-name:--font-inter) text-neutral-700 dark:text-neutral-200 sm:text-base">
              Pricing to fit the needs of any companie size.
            </span>
          </header>
          <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
            <div className="grid gap-5 lg:grid-cols-3 xl:gap-8">
              {pricings.map((pricing,index) => (
                <PricingItem key={index} pricing={pricing} />
              ))}
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
