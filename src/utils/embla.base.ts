import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import ClassNames from 'embla-carousel-class-names';


export function createSlider(classPrefix: string, userOptions?: EmblaOptionsType) {
  function init() {
    const wrapperNode = document.querySelector<HTMLElement>(`.${classPrefix}-wrapper`)!;
    const viewportNode = wrapperNode.querySelector<HTMLElement>(`.${classPrefix}__viewport`)!;
    const prevButtonNode = wrapperNode.querySelector<HTMLElement>(`.${classPrefix}__prev`)!;
    const nextButtonNode = wrapperNode.querySelector<HTMLElement>(`.${classPrefix}__next`)!;

    const emblaApi = EmblaCarousel(viewportNode, userOptions, [
      Autoplay({
        delay: 4000,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
      ClassNames(),
    ]);

    const handlePrev = () => emblaApi.scrollPrev();
    const handleNext = () => emblaApi.scrollNext();

    prevButtonNode.addEventListener('click', handlePrev, false);
    nextButtonNode.addEventListener('click', handleNext, false);

    return () => {
      prevButtonNode.addEventListener('click', handlePrev);
      nextButtonNode.addEventListener('click', handleNext);
    };
  }

  let cleanup: (() => void) | undefined;
  const setCleanup = (value?: () => void) => {
    if (cleanup) cleanup();
    cleanup = value;
  };

  document.addEventListener('astro:page-load', () => setCleanup(init()));
  document.addEventListener('astro:before-swap', () => setCleanup());
}