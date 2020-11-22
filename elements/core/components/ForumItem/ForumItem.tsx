import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

import {
  ForumItem,
  ForumHeading,
  ForumItemDetails,
  ForumInfo,
  ForumItemImageContainer,
  ForumItemContent,
} from "./ForumItem.styles";

import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import  SmallInfo  from "../SmallInfo/SmallInfo";

interface ForumItemProps {
  title: string;
  description?: string;
  lastTopic?: Date;
  lastAuthor: string;
  topics?: number | 0;
  slug: string;
}

const PostItemComponent = ({
  title,
  description,
  topics = 1,
  lastTopic,
  lastAuthor,
  slug="brickfilme-im-allgemeinen",
}: ForumItemProps) => (
  <ForumItem>
    <ForumItemImageContainer>
      {" "}
      <Image
        src="/redbrick.jpg"
        width="200"
        height="200"
        alt="Red Brick"
      ></Image>
    </ForumItemImageContainer>

    <ForumItemContent>
      <div>
        <ForumHeading><Link href={`/forum/${slug}`}>{title}</Link></ForumHeading> 
        <p>{description}</p>
      </div>
      <ForumItemDetails>
        <SmallInfo title={"Beiträge"} value={topics} icon={faClipboardList} />
    
      </ForumItemDetails>
    </ForumItemContent>

    <ForumInfo>
      <p>{lastAuthor}</p>
      <p>{format(lastTopic, "dd.mm.yyyy, HH:mm ")}</p>
    </ForumInfo>
  </ForumItem>
);

export default PostItemComponent;
