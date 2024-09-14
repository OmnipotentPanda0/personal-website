"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import AppearAnimation from "./components/AppearAnimation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);


  return (
    <div className='font-ubuntu bg-background h-full w-full'>
      <Navbar selected="Home"></Navbar>

      <div className='flex p-10 gap-3 res:gap-12 justify-center res:items-center flex-row res:flex-col'>
        <AppearAnimation duration={1.25} delay={0}>
          <div className='w-80'>
            <div className='border h-80 p-6 flex flex-col gap-2 border-black'>
              <h2 className='text-2xl font-bold'>Hi!👋</h2>
              <p className='leading-snug'>Willkommen auf meiner persönlichen Webseite! Hier bekommst du einen Einblick in meine Projekte und erfährst mehr über mich. Ich teile einige meiner Arbeiten und was mich antreibt, damit du einen besseren Eindruck von meiner Arbeit und meinen Interessen bekommst.</p>
            </div>
            <AppearAnimation type="appearInBottom" duration={0.25} delay={1}>
              <div className="flex justify-between mt-3">
                <Link href="https://www.linkedin.com/in/johann-setzer-845388297/">
                  <div className='flex items-center gap-2 font-bold text-xl'>
                    <Image src="/images/linkedin.svg" height={30} width={30} alt="linkedin" ></Image>
                    <h2 className=''>LinkedIn</h2>
                  </div>
                </Link>
                <div className='flex items-center gap-2'>
                  <Image src="/images/python.svg" height={30} width={30} alt="python" ></Image>
                  <Image src="/images/react.svg" height={30} width={30} alt="react" ></Image>
                  <Image src="/images/typescript.svg" height={30} width={30} alt="typescript" ></Image>


                </div>
              </div>
            </AppearAnimation>

          </div>
        </AppearAnimation>


        <AppearAnimation duration={1.25} delay={0.75}>
          <div className='border w-96 border-black'>
            <Image src='/images/portrait.png' alt='Portrait' width={500} height={500}></Image>
          </div>
        </AppearAnimation>
        <AppearAnimation duration={1.25} delay={1.5} className='mt-auto'>
          <div className='flex flex-col border w-80 border-black items-center mt-auto relative res:hidden'>
            <div className='relative flex justify-center w-full h-full'>
              <Image src='/images/laptop.png' className='z-0 pointer-events-none' alt='Laptop' width={300} height={300}></Image>
              <iframe
                src={currentUrl}
                width="913"
                height="615"
                className='absolute top-[125px] left-1/2 border border-black transform no-scrollbar rounded-2xl'
                style={{ transform: 'translate(-50%, -50%) scale(0.25)' }}
                title="Current Website"
              ></iframe>
            </div>

            <div className='h-32 w-full relative'>
              <p className='absolute bottom-5 left-8 rotate-2 wiggle1'>Finance</p>
              <p className='absolute bottom-10 right-14 -rotate-12 wiggle2'>Programming</p>
              <p className='absolute top-6 left-14 rotate-12 wiggle3'>Economy</p>
              <p className='absolute top-3 right-28 -rotate-45 wiggle4'>Startup</p>
            </div>
          </div>
        </AppearAnimation>
      </div>
    </div>
  );
}