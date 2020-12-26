import React from "react";
import { TopicItem, TopicHeading, TopicIcon, TopicInfo, TopicInfoDetails, TopicActivity} from "./TopicItem.styles";
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faEye, faCommentAlt, faAlignJustify, faQuestion, faExclamation} from '@fortawesome/free-solid-svg-icons';
import {format} from 'date-fns';
import formatISO from 'date-fns/formatISO';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

function whichIcon(type: IconType): IconProp {
    switch (type) {
      case IconType.Standard:
        return faAlignJustify;    
        case IconType.Question:
        return faQuestion;    
        case IconType.Announcement:
        return faExclamation;
    }
  }


enum IconType {
    Standard,
    Question,
    Announcement,
  }

interface TopicItemProps {
  id: number;
  slug: string;
  type: IconType;
  title: string;
  author?: string;
  created?: Date;
  changed?: Date;
  views?: number | 0;
  comments?: number | 0;
  updated?: boolean;

}

const TopicItemComponent = ({
  id,
  slug,
  type,
  title,
  author="Not defined",
  created,
  changed,
  views,
  comments,
  updated,
}: TopicItemProps) => (
  <TopicItem updated={updated}>
    <TopicIcon><FontAwesomeIcon icon={whichIcon(type)} /></TopicIcon>
    <TopicInfo>
      <div>
        <TopicHeading updated={updated}><Link href={`/forum/${slug}/${id}`}>{`${title}`}</Link></TopicHeading>
        <p>
          von: {author}, <span>{format(created,"dd.mm.yyyy, HH:mm ")}</span>
        </p>
      </div>
      <TopicInfoDetails>
        <p><span aria-label="Aufrufe" data-balloon-pos="down"><FontAwesomeIcon icon={faEye}/></span>{views}</p>
        <p><span aria-label="Antworten" data-balloon-pos="down"><FontAwesomeIcon icon={faCommentAlt} /></span>{comments}</p>
      </TopicInfoDetails>
    </TopicInfo>
    <TopicActivity>Letzte Antwort: <br/> {format(changed,"dd.mm.yyyy, HH:mm ")}</TopicActivity>
  </TopicItem>
);

export default TopicItemComponent;
