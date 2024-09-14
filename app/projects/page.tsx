import React from 'react'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/projects/ProjectCard'

interface Props { }

function Page(props: Props) {
    const { } = props

    return (
        <>
            <Navbar selected="Projects"></Navbar>
            <div className='flex justify-center pt-10'>
                <div className='grid grid-cols-3 gap-6 '>
                    <ProjectCard link='project1' title='WebRTC ChatApp – Direkt und Sicher' description='Ein Echtzeit-Chatroom, in dem Sie direkt mit anderen Nutzern kommunizieren und Dateien austauschen – ohne Server dazwischen, dank der direkten Peer-to-Peer-Verbindung über WebRTC.' image='network.jpg'></ProjectCard>
                    <ProjectCard link='project1' title='Einmalzahlung oder Rente – Was lohnt sich mehr?' description='Mit dieser Excel-Tabelle berechnen Sie, ob eine Einmalzahlung oder eine lebenslange Rente finanziell vorteilhafter ist. Die Berechnungen basieren auf finanzmathematischen Modellen für eine fundierte Entscheidung.' image='money.jpg'></ProjectCard>
                    <ProjectCard link='project1' title='DAX-Korrelationen – Aktien im Vergleich' description='In diesem Projekt berechne und visualisiere ich den Korrelationsindex aller DAX-Aktien. So wird deutlich, wie stark die Kurse der einzelnen Aktien miteinander verbunden sind.' image='stocks.jpg'></ProjectCard>
                </div>
            </div>

        </>
    )
}

export default Page
