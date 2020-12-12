import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faCommentAlt,
  faAlignJustify,
  faQuestion,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { Post, PostContent, PostDetails } from "./Post.styles";
import  ProfileAside  from "../ProfileAside/ProfileAside";
import  { useObserver } from 'mobx-react-lite';

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

interface PostProps {
  type: IconType;
  title: string;
  content: string;
  author?: string;
  authorRegistered?: Date;
  authorProfilePic?: string;
  authorBadge?: string;
  created?: Date;
  changed?: Date;
  views?: number;
  comments?: number;
  updated?: boolean;
}

const PostComponent = ({
  type,
  title,
  content,
  author = "Not defined",
  authorRegistered,
  authorBadge,
  created,
  changed,
  views,
  comments,
  updated,
}: PostProps) => (

  <Post>
    <PostDetails>
    <p>{format(created,"dd.mm.yyyy, HH:mm ")}</p>
    <PostContent>{content}</PostContent>
    </PostDetails>

    <ProfileAside author={author} ></ProfileAside>
  </Post>
);

export default PostComponent;
