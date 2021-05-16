import Image from 'next/image';
import React from 'react';
import {
  PrivacyPolicyContainer,
  PrivacyPolicyHeading,
  PrivacyPolicyImageWrapper,
  PrivacyPolicyTextWrapper,
} from './PrivacyPolicy.styles';

const PrivacyPolicyWrapper = () => (
  <PrivacyPolicyContainer>
    <PrivacyPolicyTextWrapper>
      <div>
        <PrivacyPolicyHeading>Datenschutzerklärung</PrivacyPolicyHeading>
        <h2>Über brickboard.de</h2>
        <p>
          brickboard.de ist ein Informationsportal und Diskussionsforum,
          das als Hobbyprojekt betrieben wird. Die Betreiber von brickboard.de
          verfolgen mit dem Betrieb keine kommerziellen Interessen.
          Insbesondere finden auf brickboard.de kein Verkauf oder Angebot
          von Waren oder Dienstleistungen statt, es wird nicht für Waren
          oder Angebote anderer geworben und es befinden sich auf
          brickboard.de keine Links auf Angebote, für die die Betreiber
          eine Provision erhalten würden (sog. „Affiliate Links“).
        </p>
        <p>
          Ein Browsen durch das Brickboard ist grundsätzlich ohne
          jede Angabe personenbezogener Daten möglich. Sofern eine
          betroffene Person sich am Brickboard anmelden möchte, könnte
          jedoch eine Verarbeitung personenbezogener Daten erforderlich werden.
        </p>
        <h2>Zweck dieser Datenschutzerklärung</h2>
        <p>
          Diese Datenschutzerklärung klärt Sie über die Art,
          den Umfang und Zweck der Verarbeitung von personenbezogenen
          Daten (nachfolgend kurz „Daten“)
          innerhalb unseres Onlineangebotes auf.
          Im Hinblick auf die verwendeten Begrifflichkeiten,
          wie z.B. „Verarbeitung“ oder „Verantwortlicher“ verweisen
          wir auf die Definitionen im
          Art. 4 der Datenschutzgrundverordnung (DSGVO).
        </p>
        <h2>Verantwortlicher</h2>
        <p>Andreas Bitzan</p>
        <address>
          <p>Luegerstraße 17</p>
          <p>9020 Klagenfurt</p>
          <p>Österreich</p>
        </address>
        <a href="mailto:andreas.bitzan@gmail.com">andreas.bitzan@gmail.com</a>
        <h2>Verwendete Begrifflichkeiten</h2>
        <p>
          „Personenbezogene Daten“ sind alle Informationen,
          die sich auf eine identifizierte oder identifizierbare natürliche Person
          (im Folgenden „betroffene Person“) beziehen;
          als identifizierbar wird eine natürliche Person angesehen,
          die direkt oder indirekt, insbesondere mittels Zuordnung
          zu einer Kennung wie einem Namen, zu einer Kennnummer,
          zu Standortdaten, zu einer Online-Kennung (z.B. Cookie)
          oder zu einem oder mehreren besonderen Merkmalen
          identifiziert werden kann, die Ausdruck der
          physischen, physiologischen, genetischen
          , psychischen, wirtschaftlichen,
          kulturellen oder sozialen Identität dieser natürlichen Person sind.
        </p>
        <p>
          „Verarbeitung“ ist jeder mit oder ohne Hilfe
          automatisierter Verfahren ausgeführte Vorgang oder
          jede solche Vorgangsreihe im Zusammenhang mit
          personenbezogenen Daten. Der Begriff reicht
          weit und umfasst praktisch jeden Umgang mit Daten.
        </p>
        <p>
          „Pseudonymisierung“ die Verarbeitung personenbezogener
          Daten in einer Weise, dass die personenbezogenen Daten ohne
          Hinzuziehung zusätzlicher Informationen nicht mehr einer
          spezifischen betroffenen Person zugeordnet werden können,
          sofern diese zusätzlichen Informationen gesondert aufbewahrt
          werden und technischen und organisatorischen Maßnahmen unterliegen,
          die gewährleisten, dass die personenbezogenen Daten nicht einer
          identifizierten oder identifizierbaren natürlichen Person
          zugewiesen werden.
        </p>
        <p>
          „Profiling“ jede Art der automatisierten Verarbeitung
          personenbezogener Daten, die darin besteht, dass
          diese personenbezogenen Daten verwendet werden,
          um bestimmte persönliche Aspekte, die sich auf
          eine natürliche Person beziehen, zu bewerten,
          insbesondere um Aspekte bezüglich Arbeitsleistung,
          wirtschaftliche Lage, Gesundheit, persönliche Vorlieben,
          Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort
          oder Ortswechsel dieser natürlichen Person
          zu analysieren oder vorherzusagen.
        </p>
        <p>
          Als „Verantwortlicher“ wird die natürliche oder
          juristische Person, Behörde, Einrichtung oder andere
          Stelle, die allein oder gemeinsam mit anderen über
          die Zwecke und Mittel der Verarbeitung von
          personenbezogenen Daten entscheidet, bezeichnet.
        </p>
        <p>
          „Auftragsverarbeiter“ eine natürliche oder
          juristische Person, Behörde,
          Einrichtung oder andere Stelle,
          die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
        </p>
        <h2>Arten der verarbeiteten Daten</h2>
        <p>
          Je nachdem, wie Sie brickboard.de verwenden unterscheidet sich die
          Art der Daten, die erhoben oder verarbeitet werden.
        </p>
        <h3>Beim Besuch von brickboard.de automatisch erhobene Daten</h3>
        <p>
          brickboard.de erfasst mit
          jedem Aufruf der Internetseite durch eine betroffene Person
          oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen.
          Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert.
          Erfasst werden können:
        </p>
        <p>(1) verwendete Browsertypen und Versionen,</p>
        <p>(2) das vom zugreifenden System verwendete Betriebssystem und dessen Version,</p>
        <p>
          (3) die Internetseite, von welcher ein zugreifendes System
          auf unsere Internetseite gelangt (sogenannte Referrer),
        </p>
        <p>
          (4) die Unterwebseiten, welche über
          ein zugreifendes System auf unserer
          Internetseite angesteuert werden,
        </p>
        <p>
          (5) das Datum und die Uhrzeit eines
          Zugriffs auf die Internetseite,
        </p>
        <p>(6) eine Internet-Protokoll-Adresse (IP-Adresse),</p>
        <p>(7) der Internet-Service-Provider des zugreifenden Systems und</p>
        <p>
          (8) sonstige ähnliche Daten und
          Informationen, die der Gefahrenabwehr
          im Falle von Angriffen auf unsere
          informationstechnologischen Systeme dienen.
        </p>
        <p>
          Bei der Nutzung dieser allgemeinen
          Daten und Informationen ziehen die Betreiber
          von brickboard.de keine Rückschlüsse auf die
          betroffene Person. Diese Informationen werden
          vielmehr benötigt, um
        </p>
        <p>
          (1) die Inhalte unserer
          Internetseite korrekt auszuliefern,
        </p>
        <p>
          (2) die dauerhafte Funktionsfähigkeit
          unserer informationstechnologischen Systeme
          und der Technik unserer Internetseite
          zu gewährleisten sowie
        </p>
        <p>
          (3) um Strafverfolgungsbehörden im Falle eines Cyberangriffes
          die zur Strafverfolgung notwendigen Informationen
          bereitzustellen.
        </p>
        <p>
          Diese anonym erhobenen Daten und Informationen werden durch die Betreiber von
          brickboard.de daher einerseits statistisch und ferner mit dem Ziel ausgewertet,
          den Datenschutz und die Datensicherheit auf der Plattform zu erhöhen,
          um letztlich ein optimales Schutzniveau für die von uns
          verarbeiteten personenbezogenen Daten sicherzustellen.
        </p>
        <h3>Bei der Registrierung bzw. der Anmeldung im Forum erhobene Daten</h3>
        <p>
          Nutzer können im Forum von brickboard.de ein Nutzerkonto anlegen.
          Im Rahmen der Registrierung werden die erforderlichen Pflichtangabe
          den Nutzern mitgeteilt und auf Grundlage des Art. 6 Abs. 1 lit.
          DSGVO zu Zwecken der Bereitstellung des Nutzerkontos verarbeitet.
          Zu den verarbeiteten Daten gehören insbesondere die Login-Informationen:
        </p>
        <p>(1) Benutzername,</p>
        <p>(2) Passwort,</p>
        <p>(3) E-Mailadresse,</p>
        <p>
          Optional haben Nutzer die Möglichkeit,
          in ihrem Profil die folgenden optionalen
          Angaben zu machen, die bei Aufruf des Profils durch andere Nutzer,
          sowie im Zusammenhang mit geschriebenen Beiträgen angezeigt werden:
        </p>
        <p>(1) Websiten des Nutzers</p>
        <p>(2) Wohnort</p>
        <p>(3) Tätigkeit</p>
        <p>(4) Interessen</p>

        <p>
          Die im Rahmen der Registrierung eingegebenen Daten werden
          für die Zwecke der Nutzung des Nutzerkontos verwendet.
        </p>
        <p>
          Die Nutzer können über Informationen,
          die für deren Nutzerkonto relevant sind,
          wie z.B. technische Änderungen,
          per E-Mail informiert werden. Wenn Nutzer ihr Nutzerkonto
          gekündigt haben, werden deren Daten im Hinblick auf das Nutzerkonto,
          vorbehaltlich einer gesetzlichen Aufbewahrungspflicht,
          gelöscht. Es obliegt den Nutzern, ihre Daten bei erfolgter
          Kündigung vor dem Vertragsende zu sichern.
          Wir sind berechtigt, sämtliche während der Vertragsdauer
          gespeicherten Daten des Nutzers unwiederbringlich zu löschen.
        </p>
        <p>
          Wenn Nutzer Kommentare oder sonstige Beiträge hinterlassen,
          können ihre IP-Adressen auf Grundlage unserer berechtigten
          Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO für 7 Tage gespeichert werden.
          Das erfolgt zu unserer Sicherheit, falls jemand in Kommentaren
          und Beiträgen widerrechtliche
          Inhalte hinterlässt (Beleidigungen, verbotene politische Propaganda, etc.).
          In diesem Fall können wir selbst für den Kommentar oder Beitrag belangt werden
          und sind daher an der Identität des Verfassers interessiert.
        </p>
        <p>
          Des Weiteren behalten wir uns vor, auf Grundlage unserer berechtigten Interessen
          gem. Art. 6 Abs. 1 lit. f. DSGVO, die Angaben der Nutzer zwecks Spamerkennung
          zu verarbeiten.
        </p>
        <p>
          Die im Rahmen der Kommentare und Beiträge angegebenen Daten,
          werden von uns bis zum Widerspruch der Nutzer dauerhaft gespeichert.
        </p>
        <h2>Maßgebliche Rechtsgrundlagen</h2>
        <p>
          Nach Maßgabe des Art. 13 DSGVO teilen
          wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit.
          Sofern die Rechtsgrundlage in der Datenschutzerklärung nicht
          genannt wird, gilt Folgendes: Die Rechtsgrundlage für
          die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a
          und Art. 7 DSGVO, die Rechtsgrundlage für die
          Verarbeitung zur Erfüllung unserer Leistungen
          und Durchführung vertraglicher Maßnahmen sowie
          Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO,
          die Rechtsgrundlage für die Verarbeitung zur
          Erfüllung unserer rechtlichen Verpflichtungen ist
          Art. 6 Abs. 1 lit. c DSGVO, und die Rechtsgrundlage
          für die Verarbeitung zur Wahrung unserer berechtigten
          Interessen ist Art. 6 Abs. 1 lit. f DSGVO. Für den Fall,
          dass lebenswichtige Interessen der betroffenen Person
          oder einer anderen natürlichen Person eine Verarbeitung
          personenbezogener Daten erforderlich machen,
          dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.
        </p>
        <h2>Sicherheitsmaßnahmen</h2>
        <p>
          Wir treffen nach Maßgabe des Art. 32 DSGVO unter
          Berücksichtigung des Stands der Technik, der Implementierungskosten
          und der Art, des Umfangs, der Umstände und der
          Zwecke der Verarbeitung sowie der
          unterschiedlichen Eintrittswahrscheinlichkeit
          und Schwere des Risikos für die Rechte
          und Freiheiten natürlicher Personen,
          geeignete technische und organisatorische
          Maßnahmen, um ein dem Risiko angemessenes
          Schutzniveau zu gewährleisten.
        </p>
        <p>
          Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit,
          Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen
          Zugangs zu den Daten, als auch des sie betreffenden Zugriffs,
          der Eingabe, Weitergabe, der Sicherung der Verfügbarkeit
          und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet,
          die eine Wahrnehmung von Betroffenenrechten, Löschung von
          Daten und Reaktion auf Gefährdung der Daten gewährleisten.
          Ferner berücksichtigen wir den Schutz personenbezogener
          Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware,
          Software sowie Verfahren, entsprechend dem Prinzip des
          Datenschutzes durch Technikgestaltung und durch
          datenschutzfreundliche Voreinstellungen (Art. 25 DSGVO).
        </p>
        <h2>Zusammenarbeit mit Auftragsverarbeitern und Dritten</h2>

        <p>
          Sofern wir im Rahmen unserer Verarbeitung
          Daten gegenüber anderen Personen und Unternehmen
          (Auftragsverarbeitern oder Dritten) offenbaren,
          sie an diese übermitteln oder ihnen sonst
          Zugriff auf die Daten gewähren, erfolgt dies
          nur auf Grundlage einer gesetzlichen Erlaubnis
          (z.B. wenn eine Übermittlung der Daten an Dritte,
          wie an Zahlungsdienstleister,
          gem. Art. 6 Abs. 1 lit. b DSGVO zur Vertragserfüllung
          erforderlich ist),
          Sie eingewilligt haben,
          eine rechtliche Verpflichtung dies vorsieht
          oder auf Grundlage unserer berechtigten
          Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).
        </p>
        <p>
          Sofern wir Dritte mit der Verarbeitung von
          Daten auf Grundlage eines sog.
          „Auftragsverarbeitungsvertrages“ beauftragen,
          geschieht dies auf Grundlage des Art. 28 DSGVO.
        </p>
        <h2>Übermittlungen in Drittländer</h2>
        <p>
          Sofern wir Daten in einem Drittland
          (d.h. außerhalb der Europäischen Union (EU)
          oder des Europäischen Wirtschaftsraums
          (EWR)) verarbeiten oder dies im
          Rahmen der Inanspruchnahme von Diensten
          Dritter oder Offenlegung, bzw. Übermittlung
          von Daten an Dritte geschieht, erfolgt dies
          nur, wenn es zur Erfüllung unserer
          (vor)vertraglichen Pflichten, auf
          Grundlage Ihrer Einwilligung, aufgrund
          einer rechtlichen Verpflichtung oder
          auf Grundlage unserer berechtigten
          Interessen geschieht. Vorbehaltlich
          gesetzlicher oder vertraglicher Erlaubnisse,
          verarbeiten oder lassen wir die Daten in einem
          Drittland nur beim Vorliegen der besonderen Voraussetzungen
          der Art. 44 ff. DSGVO verarbeiten.
          D.h. die Verarbeitung erfolgt z.B. auf Grundlage
          besonderer Garantien, wie der offiziell
          anerkannten Feststellung eines der EU
          entsprechenden Datenschutzniveaus
          (z.B. für die USA durch das „Privacy Shield“)
          oder Beachtung offiziell anerkannter spezieller
          vertraglicher Verpflichtungen
          (so genannte „Standardvertragsklauseln“).
        </p>
        <h2>Rechte der betroffenen Personen</h2>
        <p>
          Sie haben das Recht, eine Bestätigung darüber
          zu verlangen, ob betreffende Daten verarbeitet
          werden und auf Auskunft über diese Daten
          sowie auf weitere Informationen und Kopie
          der Daten entsprechend Art. 15 DSGVO.
        </p>
        <p>
          Sie haben entsprechend. Art. 16
          DSGVO das Recht, die Vervollständigung
          der Sie betreffenden Daten oder die
          Berichtigung der Sie betreffenden
          unrichtigen Daten zu verlangen.
        </p>
        <p>
          Sie haben nach Maßgabe des Art.
          17 DSGVO das Recht zu verlangen,
          dass betreffende Daten unverzüglich
          gelöscht werden, bzw. alternativ
          nach Maßgabe des Art. 18 DSGVO
          eine Einschränkung der Verarbeitung
          der Daten zu verlangen.
        </p>
        <p>
          Sie haben das Recht zu verlangen,
          dass die Sie betreffenden Daten,
          die Sie uns bereitgestellt
          haben nach Maßgabe des Art. 20 DSGVO
          zu erhalten und deren Übermittlung an
          andere Verantwortliche zu fordern.
        </p>
        <p>
          Sie haben ferner gem. Art. 77 DSGVO das Recht,
          eine Beschwerde bei der zuständigen
          Aufsichtsbehörde einzureichen.
        </p>
        <h2>Widerrufsrecht</h2>
        <p>
          Sie haben das Recht, erteilte Einwilligungen
          gem. Art. 7 Abs. 3 DSGVO mit
          Wirkung für die Zukunft zu widerrufen
        </p>
        <h2>Widerspruchsrecht</h2>
        <p>
          Sie können der künftigen Verarbeitung der
          Sie betreffenden Daten nach Maßgabe
          des Art. 21 DSGVO jederzeit widersprechen.
        </p>
        <h2>Cookies und Widerspruchsrecht bei Direktwerbung</h2>
        <p>
          Als „Cookies“ werden kleine Dateien bezeichnet,
          die auf Rechnern der Nutzer gespeichert werden.
          Innerhalb der Cookies können unterschiedliche
          Angaben gespeichert werden. Ein Cookie dient primär
          dazu, die Angaben zu einem Nutzer
          (bzw. dem Gerät auf dem das Cookie gespeichert ist)
          während oder auch nach seinem Besuch
          innerhalb eines Onlineangebotes zu speichern.
          Als temporäre Cookies, bzw. „Session-Cookies“
          oder „transiente Cookies“, werden Cookies bezeichnet,
          die gelöscht werden, nachdem ein Nutzer
          ein Onlineangebot verlässt und seinen Browser schließt.
          In einem solchen Cookie kann z.B. der Inhalt
          eines Warenkorbs in einem Onlineshop oder ein
          Login-Status gespeichert werden.
          Als „permanent“ oder „persistent“ werden
          Cookies bezeichnet, die auch nach dem Schließen
          des Browsers gespeichert bleiben. So kann z.B.
          der Login-Status gespeichert werden, wenn die
          Nutzer diese nach mehreren Tagen aufsuchen.
          Ebenso können in einem solchen Cookie die
          Interessen der Nutzer gespeichert werden,
          die für Reichweitenmessung oder
          Marketingzwecke verwendet werden.
          Als „Third-Party-Cookie“ werden Cookies
          bezeichnet, die von anderen Anbietern als
          dem Verantwortlichen, der das Onlineangebot
          betreibt, angeboten werden (andernfalls, wenn
          es nur dessen Cookies sind spricht man von „First-Party Cookies“).
        </p>
        <p>
          Wir können temporäre und permanente Cookies
          einsetzen und klären hierüber im Rahmen
          unserer Datenschutzerklärung auf.
        </p>
        <p>
          Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner gespeichert werden,
          werden sie gebeten die entsprechende Option
          in den Systemeinstellungen ihres Browsers zu deaktivieren.
          Gespeicherte Cookies können in den Systemeinstellungen des
          Browsers gelöscht werden. Der Ausschluss von Cookies
          kann zu Funktionseinschränkungen dieses Onlineangebotes führen.
        </p>
        <p
        >Ein genereller Widerspruch gegen den Einsatz der
          zu Zwecken des Onlinemarketing eingesetzten Cookies
          kann bei einer Vielzahl der Dienste,
          vor allem im Fall des Trackings, über die US-amerikanische Seite
          <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/</a>
          oder die EU-Seite <a href="http://www.youronlinechoices.com/">http://www.youronlinechoices.com/</a>
          erklärt werden. Des Weiteren kann die Speicherung von Cookies
          mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden.
          Bitte beachten Sie, dass dann gegebenenfalls nicht
          alle Funktionen dieses Onlineangebotes genutzt werden können.
        </p>
        <h2>Löschung von Daten</h2>
        <p>
          Die von uns verarbeiteten Daten werden nach Maßgabe der
          Art. 17 und 18 DSGVO gelöscht oder in ihrer Verarbeitung
          eingeschränkt. Sofern nicht im Rahmen dieser
          Datenschutzerklärung ausdrücklich angegeben, werden die bei uns
          gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung
          nicht mehr erforderlich sind und der Löschung keine gesetzlichen
          Aufbewahrungspflichten entgegenstehen. Sofern die Daten nicht
          gelöscht werden, weil sie für andere und gesetzlich zulässige
          Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt.
          D.h. die Daten werden gesperrt und nicht für andere
          Zwecke verarbeitet. Das gilt z.B. für Daten,
          die aus handels- oder steuerrechtlichen
          Gründen aufbewahrt werden müssen.
        </p>
        <h2>Hosting und E-Mail-Versand</h2>
        <p>
          Die von uns in Anspruch genommenen Hosting-Leistungen
          dienen der Zurverfügungstellung der folgenden
          Leistungen: Infrastruktur- und Plattformdienstleistungen,
          Rechenkapazität, Speicherplatz und Datenbankdienste,
          E-Mail-Versand, Sicherheitsleistungen sowie technische
          Wartungsleistungen, die wir zum Zwecke des Betriebs
          dieses Onlineangebotes einsetzen.
        </p>
        <p>
          Hierbei verarbeiten wir, bzw. unser Hostinganbieter
          Bestandsdaten, Kontaktdaten, Inhaltsdaten,
          Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten
          von Nutzern dieses Onlineangebotes auf Grundlage
          unserer berechtigten Interessen an einer
          effizienten und sicheren Zurverfügungstellung
          dieses Onlineangebotes
          gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art.
          28 DSGVO (Abschluss Auftragsverarbeitungsvertrag).
        </p>
        <h2>Einbindung von Diensten und Inhalten Dritter</h2>
        <p>
          Wir setzen innerhalb unseres Onlineangebotes
          auf Grundlage unserer berechtigten Interessen
          (d.h. Interesse an der Analyse, Optimierung und
          wirtschaftlichem Betrieb unseres Onlineangebotes
          im Sinne des Art. 6 Abs. 1 lit. f. DSGVO)
          Inhalts- oder Serviceangebote von Drittanbietern ein,
          um deren Inhalte und Services, wie z.B. Videos oder Schriftarten
          einzubinden (nachfolgend einheitlich bezeichnet als “Inhalte”).
        </p>
        <p>
          Dies setzt immer voraus, dass die Drittanbieter
          dieser Inhalte, die IP-Adresse der Nutzer wahrnehmen,
          da sie ohne die IP-Adresse die Inhalte nicht an deren
          Browser senden könnten. Die IP-Adresse ist damit fü
          r die Darstellung dieser Inhalte erforderlich.
          Wir bemühen uns nur solche Inhalte zu verwenden,
          deren jeweilige Anbieter die IP-Adresse lediglich
          zur Auslieferung der Inhalte verwenden.
          Drittanbieter können ferner so genannte
          Pixel-Tags (unsichtbare Grafiken, auch als „Web Beacons“ bezeichnet)
          für statistische oder Marketingzwecke verwenden.
          Durch die „Pixel-Tags“ können Informationen,
          wie der Besucherverkehr auf den Seiten dieser
          Website ausgewertet werden. Die pseudonymen
          Informationen können ferner in Cookies auf dem
          Gerät der Nutzer gespeichert werden und unter
          anderem technische Informationen zum Browser
          und Betriebssystem, verweisende Webseiten,
          Besuchszeit sowie weitere Angaben zur Nutzung
          unseres Onlineangebotes enthalten, als auch mit
          solchen Informationen aus anderen Quellen verbunden werden.
        </p>
        <p>
          Insbesondere binden wir Videos der Plattform “YouTube”
          des Anbieters Google LLC, 1600 Amphitheatre Parkway,
          Mountain View, CA
          <br />
          94043, USA, ein. Datenschutzerklärung:
          <a href="https://www.google.com/policies/privacy/" target="_blank">
            https://www.google.com/policies/privacy/
          </a>
          , Opt-Out:
          <a href="https://adssettings.google.com/authenticated" target="_blank">
            https://adssettings.google.com/authenticated
          </a>
          .
        </p>
        <p>
          Diese Datenschutzerklärung verwendet Texte von
          <a href="https://datenschutz-generator.de/" target="_blank">
            https://datenschutz-generator.de/
          </a>
          und
          <a href="https://www.wbs-law.de/it-recht/datenschutzrecht/datenschutzerklaerung-generator/" target="_blank">
            https://www.wbs-law.de/it-recht/datenschutzrecht/datenschutzerklaerung-generator/
          </a>
        </p>
        <p>Vom Websiteinhaber angepasst.</p>
      </div>
    </PrivacyPolicyTextWrapper>
    <PrivacyPolicyImageWrapper>
      <Image src="/assets/images/signup.webp" objectFit="contain" layout="fill" />
    </PrivacyPolicyImageWrapper>
  </PrivacyPolicyContainer >
);

export default PrivacyPolicyWrapper;
