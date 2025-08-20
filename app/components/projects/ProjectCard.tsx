import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import type { Tag } from '@/types/cms_project';


interface Props {
    title: string;
    description?: string; // optional, falls kein Auszug vorhanden ist
    image: string; // kann Dateiname oder absolute URL sein
    link: string; // slug oder vollständiger Pfadteil
    basePath?: string; // optionaler Basis-Pfad, Standard: "/projects"
    tags?: Tag[]; // optional, Tags für den Blog Post
}

function ProjectCard(props: Props) {
    const { title, description, image, link, basePath = "/projects", tags } = props
    const src = image.startsWith('http') ? image : ("/images/project_cards/" + image);
    const desc = description ?? '';

    return (
  <Link href={`${basePath}/${link}`}>
    <div className='w-[326px] h-[435px] transition-transform duration-200 hover:-translate-y-1'>
          <div>
            <Image
              src={src}
              height={500}
              width={500}
              alt={title}
              sizes="326px"
              className='w-full h-48 object-cover rounded-t-xl'
            />
            <h3 className='text-2xl font-bold mt-4' style={{ fontFamily: 'Montserrat, sans-serif' }}>{title}</h3>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2.5 py-0.5 bg-blue-100 text-[#2C3E50] rounded-full text-xs"
                    title={tag.description}
                  >
                    {tag.name}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2.5 py-0.5 bg-blue-100 text-[#2C3E50] rounded-full text-xs">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {desc && (
              <p className='text-base mt-2 line-clamp-2' style={{ fontFamily: 'Roboto, sans-serif' }}>{desc}</p>
            )}
          </div>
        </div>
      </Link>
    )
}

export default ProjectCard
