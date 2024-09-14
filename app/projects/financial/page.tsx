import Navbar from '@/app/components/Navbar'
import React from 'react'

interface Props { }

function Page(props: Props) {
    const { } = props

    return (
        <>
            <Navbar selected="Projects"></Navbar>
            <div className='flex w-full h-screen justify-center items-center'>
                <h1 className='text-2xl font-bold mb-52'>Bald Verfügbar...</h1>
            </div>
        </>
    )
}

export default Page
