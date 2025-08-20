import React from 'react'
import Image from 'next/image'
import { FaFileDownload } from "react-icons/fa";


interface Props {
    title: string;
    subtitle: string;
    image: string; // Dateiname lokal oder absolute URL
    überblick: string;
    schlüsselerkenntnisse: string[];
    bedeutungUndImplikationen: string;
    projectLink?: string;
}

function ProjectSite(props: Props) {
    const { title, subtitle, image, überblick, schlüsselerkenntnisse, bedeutungUndImplikationen, projectLink } = props
    const src = image.startsWith('http') ? image : ("/images/projects/" + image);

    return (
        <div className='flex w-full h-full justify-center px-5'>
            <div className='w-[1000px]'>
                <h1 className='text-2xl font-bold mt-4' style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h1>
                <p className='mt-2' style={{ fontFamily: 'Roboto, sans-serif' }}>{subtitle}</p>
                <div className='overflow-hidden'>
                    <Image className='w-full mt-5' src={src} width={2000} height={2000} alt='image'></Image>
                </div>
                <h2 className='font-bold mt-5' style={{ fontFamily: 'Montserrat, sans-serif' }}>Überblick</h2>
                <p style={{ fontFamily: 'Roboto, sans-serif' }}>{überblick}</p>
                <h2 className='font-bold mt-5' style={{ fontFamily: 'Montserrat, sans-serif' }}>Schlüsselerkenntnisse</h2>
                <ul className='list-disc list-inside' style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {schlüsselerkenntnisse.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <h2 className='font-bold mt-5' style={{ fontFamily: 'Montserrat, sans-serif' }}>Bedeutung und Implikationen</h2>
                <p className='' style={{ fontFamily: 'Roboto, sans-serif' }}>{bedeutungUndImplikationen}</p>

                <div className='flex w-full justify-between p-5 mt-10 mb-14 bg-customColor rounded-lg'>
                    <div className='flex gap-3 items-center' style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <Image src="/images/project_cards/github.svg" height={30} width={30} alt='github' className=''></Image>
                        <p className='text-xl'>Get Source Code</p>
                    </div>
                    <div className='flex gap-3 items-center' style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <a href={projectLink || "https://webrtc.johannsetzer.com/"} target="_blank" rel="noopener noreferrer" className='text-xl hover:underline'>
                            Visit Project Website
                        </a>
                    </div>
                    <div className='flex gap-3 items-center' style={{ fontFamily: 'Roboto, sans-serif' }}>
                        <FaFileDownload size={30}></FaFileDownload>
                        <p className='text-xl'>Download File</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProjectSite
