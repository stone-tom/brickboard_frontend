import React from "react";
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
import { ImageWrapper, ProfileAside, ProfileAsideHeading, ProfileCondensedInfo } from "./ProfileAside.style";
import Image from "next/image";

interface ProfileAsideProps {
  author?: string;
  authorRegistered?: Date;
  authorProfilePic?: string;
  postsCount?: number;
  authorBadge?: string;
  authorCity?: string;
}

const ProfileAsideComponent = ({
  author = "Not defined",
  authorRegistered,
  authorBadge,
  postsCount=1,
  authorProfilePic="/501.jpg",
  authorCity="Legoland",
}: ProfileAsideProps) => (
  <ProfileAside>
    <ProfileCondensedInfo>    
    <div
      style={{
        position: "relative",
        maxHeight: "200px",
        maxWidth: "200px",
      }}
    >
        <Image quality={100} src={authorProfilePic} alt="Profilbild" layout="fill"  />
    </div>
    </ProfileCondensedInfo>

      <ProfileAsideHeading>{author}</ProfileAsideHeading>
      <div>
            <p>Beiträge: {postsCount}</p>
            <p>Aus: {authorCity}</p>
        </div>
  </ProfileAside>
);

export default ProfileAsideComponent;
