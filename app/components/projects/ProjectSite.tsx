import React from 'react'
import Image from 'next/image'
import { FaFileDownload } from "react-icons/fa";


interface Props {
    title: string;
    subtitle: string;
    image: string;
    überblick: string;
    schlüsselerkenntnisse: string[];
    bedeutungUndImplikationen: string;
    projectLink?: string;
}

function ProjectSite(props: Props) {
    const { title, subtitle, image, überblick, schlüsselerkenntnisse, bedeutungUndImplikationen, projectLink } = props

    return (
        <div className='flex w-full h-full justify-center'>
            <div className='w-[1000px] font-ubuntu'>
                <h1 className='text-2xl font-bold mt-4'>{title}</h1>
                <p className='mt-2'>{subtitle}</p>
                <div className='overflow-hidden'>
                    <Image className='w-full mt-5' src={"/images/projects/" + image} width={2000} height={2000} alt='image'></Image>
                </div>
                <h2 className='font-bold mt-5'>Überblick</h2>
                <p>{überblick}</p>
                <h2 className='font-bold mt-5'>Schlüsselerkenntnisse</h2>
                <ul className='list-disc list-inside'>
                    {schlüsselerkenntnisse.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <h2 className='font-bold mt-5'>Bedeutung und Implikationen</h2>
                <p className=''>{bedeutungUndImplikationen}</p>

                <div className='flex w-full justify-between p-5 mt-10 mb-14 bg-purple-400 rounded-lg'>
                    <div className='flex gap-3 items-center'>
                        <Image src="/images/project_cards/github.svg" height={30} width={30} alt='github' className=''></Image>
                        <p className='text-xl'>Get Source Code</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <a href={projectLink || "https://google.de/"} target="_blank" rel="noopener noreferrer" className='text-xl hover:underline'>
                            Visit Project Website
                        </a>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <FaFileDownload size={30}></FaFileDownload>
                        <p className='text-xl'>Download File</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProjectSite
