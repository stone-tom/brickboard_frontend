import React from "react";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import TopicItem from "../../elements/core/components/TopicItem/TopicItem";
import { Params } from "next/dist/next-server/server/router";
import { ContentContainer } from "../../global.styles";

//Welche Pfade prerendered werden können
export const getStaticPaths: GetStaticPaths=async ()=>{
    return {
        paths: [
            { params: { slug: 'brickfilme-im-allgemeinen' } },
            { params: { slug: 'neuigkeiten' } }
        ],
        fallback: true, 
      };
};

export const getStaticProps: GetStaticProps = async ({params}:Params) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/Topics");
  const userData = await res.json();
  const users = userData;
  return {
    props: {
      users,
    },
    revalidate: 1,
  };
};


function Subforum({ users }) {
  return (
    <>
    <ContentContainer>
      <TopicItem
        type={0}
        title="Brickboard for president, community event"
        author="Knauser"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
        updated
      />
       <TopicItem
        type={2}
        title="Das neue Brickboard ist da!"
        author="Andreas Bitzan"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
      />
       <TopicItem
        type={1}
        title="Wer macht alles bei meinem Wettberwerb mit"
        author="Legostudio01"
        views={420}
        comments={69}
        created={new Date(2020,10,14,16,5)}
        changed={new Date(2020,10,26,8,14)}
        updated
      />
    </ContentContainer>
    </>
  );
}

export default Subforum;
