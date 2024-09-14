import React from 'react'
import Image from 'next/image'
import Link from 'next/link';


interface Props {
    title: string;
    description: string;
    image: string;
    link: string;
}

function ProjectCard(props: Props) {
    const { title, description, image, link } = props

    return (
        <Link href={"/projects/" + link}>
            <div className='w-[326px] h-[435px] font-ubuntu'>
                <div className=''>
                    <Image src={"/images/project_cards/" + image} height={500} width={500} alt='network' className='rounded-t-xl'></Image>
                    <h1 className='text-2xl font-bold mt-4'>{title}</h1>
                    <p className='text-base mt-2'>{description}</p>
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard
