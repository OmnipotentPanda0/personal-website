import React from 'react'
import Link from 'next/link'

interface Props {
    // define if Home, Projects, or Contact is selected
    selected: 'Home' | 'Projects' | 'Contact'
}

function Navbar({ selected }: Props) {

    return (
        <div className='font-ubuntu flex justify-around h-24 items-center'>
            {/* Sieht geil aus aber passt nicht
            <h1 className='font-bold text-2xl bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent'>Johann Setzer</h1> */}
            <h1 className='font-bold text-2xl bg-gradient-to-r from-foreground to-purple-900 bg-clip-text text-transparent'>Johann Setzer</h1>
            <div className='flex gap-4 font-bold'>
                <Link href="/">
                    <h2 className={selected === 'Home' ? 'underline underline-offset-4' : ''} >Home</h2>
                </Link>
                <Link href="/projects">
                    <h2 className={selected === 'Projects' ? 'underline underline-offset-4' : ''} >Projects</h2>
                </Link>
                <Link href="/contact">
                    <h2 className={selected === 'Contact' ? 'underline underline-offset-4' : ''} >Contact</h2>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
