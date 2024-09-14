import React from 'react'
import Navbar from '@/app/components/Navbar'
import ProjectSite from '@/app/components/projects/ProjectSite'

interface Props {
}

function Page(props: Props) {
    const { } = props

    return (
        <>
            <Navbar selected="Projects"></Navbar>
            <ProjectSite
                title='WebRTC ChatApp – Direkt und Sicher'
                subtitle='Ein Echtzeit-Chatroom, in dem Sie direkt mit anderen Nutzern kommunizieren und Dateien austauschen – ohne Server dazwischen, dank der direkten Peer-to-Peer-Verbindung über WebRTC.'
                image='network.jpg'
                überblick='Ein Echtzeit-Chatroom, in dem Sie direkt mit anderen Nutzern kommunizieren und Dateien austauschen – ohne Server dazwischen, dank der direkten Peer-to-Peer-Verbindung über WebRTC.'
                schlüsselerkenntnisse='WebRTC, Peer-to-Peer, Echtzeitkommunikation'
                bedeutungUndImplikationen='Die direkte Peer-to-Peer-Verbindung über WebRTC ermöglicht eine sichere und schnelle Kommunikation ohne Server dazwischen. Die Nutzer können direkt miteinander kommunizieren und Dateien austauschen, ohne dass ihre Daten über einen zentralen Server laufen. Dies erhöht die Sicherheit und Privatsphäre der Nutzer und ermöglicht eine schnellere Übertragung von Daten.'
                ></ProjectSite>

        </>
    )
}

export default Page
