# DICOM
Projekt: <Entwicklung eines webbasierten Datenbanksystems für medizinische Bildinformationen>

Die Motivation der Arbeit besteht darin, eine DICOM-Bildverwaltung für autorisierte Ärzte, Anwendung und den On-Demand-Zugriff auf medizinische Bilder von Patienten aus Anwendungen oder PACS bereitzustellen. Das erläuterte Konzeptdesign, bezieht sich darauf medizinische Bildgebungslösungen zu verwalten, um jederzeit einen sicheren Service zu bieten und überall Zugriff auf medizinische Bilder und sofortiges Abrufen von digitalen Bilddaten jeder Modalität zu ermöglichen. Dies geschieht mit einem Bildspeichersdienst und einem Bildverwaltungsdienst unter Verwendung des DICOM-Protokolls. Diese Anwendung fasst das Framework-Modell auf einer soliden Grundlage für die medizinische Bildgebung mit Plattformen und Software zusammen, um die Infrastruktur für DICOM Image Management zu betreiben, robuste Anwendungen zu erstellen und auszuführen und Endbenutzer-Computing als Service bereitzustellen.

Technologie-Stack : Npm, Vue.js, Koa, Less, MongoDB, Element-UI, Cornerstone.js, Webpack

Vue und Koa wurden verwendet, um Separationen von Frontend und Backend zu implementieren. Dann wurde Element-UI als UI-Design und Cornerstone.JS als DICOM-Viewer benutzt. Außerdem wurde MongoDB verwendet, um das auf JSON basierte Datenbanksystem für medizinische Bilder zu aufbauen. Vuex wurde verwendet, um die während der Ausführung der Anwendung generierte Status- und Datenänderungen einheitlich zu verwalten. Schließlich wurde diese Webanwendung durch  Webpack verpackt.
