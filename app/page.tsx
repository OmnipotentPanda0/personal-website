import PageTemplate from "./components/PageTemplate";
import Image from "next/image";

export default function Home() {
  return (
    <PageTemplate selected="Home">
      {/* Centered div - absolutely positioned in screen center on desktop, static flow on mobile */}
      <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 
                      w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 lg:mt-0">
        <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-36 flex-col lg:flex-row">
          <div className="w-full sm:w-[28rem] lg:w-[30rem] order-2 lg:order-1">
            <h1
              className="text-center text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight"
              style={{ fontFamily: "Montserrat, sans-serif", color: "#2C3E50" }}
            >
              Servus, ich bin Johann! 👋
            </h1>
            <hr className="mt-3 lg:mt-4 mb-5 lg:mb-7 border-t-2 border-[#4A90E2] w-full mx-auto" />
            <h2
              className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed border-2 border-[#4A90E2] p-4 lg:p-6 bg-white/10 backdrop-blur-sm"
              style={{ fontFamily: "Roboto, sans-serif", color: "#2C3E50" }}
            >
              On this website, you can learn more about me. In the future, blog posts will appear here covering topics that interest me and provide value to others - especially around my file-sharing app SparkShare.
            </h2>
            {/* Emoji row spanning the width of the box */}
            <div
              className="mt-4 lg:mt-5 grid grid-cols-5 lg:grid-cols-10 place-items-center text-xl sm:text-2xl lg:text-2xl select-none w-full gap-1 lg:gap-0"
              style={{ fontFamily: "Montserrat, sans-serif" }}
              aria-hidden="true"
            >
              <span>💰</span>
              <span>📈</span>
              <span>💻</span>
              <span>🧠</span>
              <span>✈️</span>
              <span>🌍</span>
              <span>🚀</span>
              <span>💡</span>
              <span>🗳️</span>
              <span>🏛️</span>
            </div>
          </div>
          <div className="flex-shrink-0 order-1 lg:order-2">
            <Image
              src="/images/head.png"
              alt="Head"
              width={384}
              height={384}
              priority
              sizes="(min-width: 1024px) 24rem, (min-width: 768px) 16rem, (min-width: 640px) 14rem, 12rem"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-96 lg:h-96 object-cover rounded-full shadow-[0_6px_20px_rgba(74,144,226,0.18)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(74,144,226,0.28)]"
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
