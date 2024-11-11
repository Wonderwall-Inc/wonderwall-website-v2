import Image from 'next/image';

export const HomeHeader = () => {
  return (
    <div className="relative h-[300px] bg-red-50 text-center text-white-100 md:h-[450px] lg:h-[553px]">
      <div className="absolute top-0 left-0 z-10 h-full w-full">
        <Image src={`/ww-hero-image.webp`} fill style={{ objectFit: 'cover' }} alt='image' loading='lazy' />
      </div>
      <div className="w-100p lg:w-960 relative z-20 mx-auto flex h-full flex-col items-start justify-center px-[10px] lg:px-0 py-10 text-left text-white font-thin md:py-15">
        <p className="mb-[24px] text-2xl md:text-3xl">“これできない？”に応える会社</p>
        <p className="text-xl md:text-2xl">パズルのピースを埋めるようにWEBやデザイン分野の<br className="hidden md:inline" />
          あらゆるお客様の課題解決に取り組みます。</p>
      </div>
    </div>
  );
}