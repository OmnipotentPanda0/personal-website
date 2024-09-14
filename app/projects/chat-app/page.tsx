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
                image='WebRTCApp.png'
                überblick='Dieses Projekt implementiert eine Peer-to-Peer (P2P) Kommunikationsanwendung, die den Austausch von Nachrichten und Dateien zwischen Nutzern ermöglicht. Dabei werden React für die Benutzeroberfläche und PeerJS sowie WebSockets für die Echtzeitkommunikation verwendet. Die Anwendung unterstützt sowohl Nachrichtenübermittlung als auch das Versenden von Dateien in Chunks, die über eine intuitive Benutzeroberfläche gesteuert werden können.'
                schlüsselerkenntnisse={
                    [
                        'PeerJS ermöglicht effiziente P2P-Verbindungen ohne Zwischenschaltung eines Servers',
                        'Dateien können sicher und performant in Chunks übertragen werden',
                        'Die Integration von WebSockets sorgt für eine reibungslose Verwaltung der Peer-IDs und Echtzeitkommunikation',
                    ]
                }
                bedeutungUndImplikationen='Dieses Projekt zeigt das Potenzial von P2P-Technologien für direkte, schnelle und sichere Kommunikation zwischen Nutzern ohne zentrale Server. Die Kombination von PeerJS und WebSockets ermöglicht nicht nur Echtzeitkommunikation, sondern vereinfacht auch den Austausch von Dateien, was es zu einer robusten Grundlage für dezentrale Anwendungen macht. Dies könnte auf verschiedene Anwendungsfälle übertragen werden, darunter sichere Datenübertragungen, verschlüsselte Kommunikationsdienste und andere dezentrale Netzwerkanwendungen.'
            ></ProjectSite>

        </>
    )
}

export default Page
