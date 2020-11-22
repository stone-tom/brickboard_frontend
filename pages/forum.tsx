import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ForumItem from "../elements/core/components/ForumItem/ForumItem";
import { ContentContainer } from "../global.styles";
import ForumHeading from "../elements/core/components/ForumHeading/ForumHeading";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const userData = await res.json();
  const users = userData;
  return {
    props: {
      users,
    },
    revalidate: 1,
  };
};

function Forum({ users }) {
  return (
    <>
      <ContentContainer>
        <ForumHeading title="Ankündigungen" />
        <ForumItem
          title="Neuigkeiten"
          description="Neuigkeiten und Ankündigungen um das Brickboard."
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumItem
          title="Steinerei und Wettbewerbe"
          description="Informationen, Ankündigungen und Diskussionen rund um die Steinerei und andere Wettbewerbe!"
          topics={1337}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumHeading title="Das Board" />
        <ForumItem
          title="Brickfilme im Allgemeinen"
          description="Alles rund ums Brickfilmen, die Werkzeuge und Techniken, bahnbrechende Einfälle und sogar Projektvorstellungen finden hier ihren Platz. "
          topics={1337}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumItem
          title="Filmvorstellungen"
          description="Hier geht es zur Übersicht der Brickfilme aus der Community. Ob fertiges Projekt, Tutorial oder Teaser, hier ist alles willkommen!"
          topics={5}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumItem
          title="Gemeinschaftsprojekte"
          description="Mach mit und beteilige dich an den Gemeinschaftsprojekten auf brickboard.de!"
          topics={42}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
        <ForumItem
          title="Sonstiges"
          description="Themen die nicht direkt mit Brickfilmen zu tun haben, oder die keinen Platz in den anderen Kanälen gefunden haben."
          topics={42}
          lastTopic={new Date(2020, 10, 14, 16, 5)}
          lastAuthor="Andreas"
          slug="brickfilme-im-allgemeinen"
        />
      </ContentContainer>
    </>
  );
}

export default Forum;
