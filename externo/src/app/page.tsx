import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <div className="bg-[url('/assets/banner.jpg')] h-[600px] bg-cover bg-center flex items-center justify-center">
        <div className="absolute justify-center items-center bottom-0 pt-20 flex w-screen bg-gradient-to-b from-transparent via-[#003A65] to-[#003A65] h-3/4">
          <Image
            src="/assets/logo.png"
            alt="Logo da Empresa"
            width={220}
            height={220}
          />
          <h1 className="text-white text-4xl mx-5 font-bold">
            Bem-vindo ao nosso portal
          </h1>
        </div>
      </div>
    </>
  );
}
