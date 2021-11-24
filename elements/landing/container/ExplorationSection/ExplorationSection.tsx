import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import ITopic from '../../../../models/ITopic';
import IUser from '../../../../models/IUser';
import {
  ExplorationAvatar,
  ExplorationAvatarInfos,
  ExplorationContent,
  ExplorationHeading,
  ExplorationSectionWrapper,
  ExplorationText,
  ExplorationTextContainer,
  ExplorationVideoContent,
  ExplorationVideoInfos,
  ExplorationVideoPlay,
  Video1,
  Video2,
  Video3,
} from './ExplorationSection.styles';
import { backendURL } from '../../../../util/api';
import ICategory from '../../../../models/ICategory';
import findObject from '../../../../util/finder';
import getYouTubeId from '../../../../util/youtube';
import IBadge from '../../../../models/IBadge';
import Badge from '../../../profile/components/Badge/Badge';
import { CategoryWrapper } from '../../../core/container/MovieCard/MovieCard.styles';
import Tag from '../../../core/components/Tag/Tag';
import { Icon } from '../../../core/components/Icon/Icon.styles';

interface ExplorationProps {
  movieList: null | ITopic[],
  userList: null | IUser[],
  authorList: null | IUser[],
  categories: null | ICategory[];
  badges: null | IBadge[],
}

const ExplorationSection = ({
  movieList,
  userList,
  authorList,
  categories,
  badges,
}: ExplorationProps) => {
  const data = [];
  data.push(userList[0]);
  data.push(movieList[0]);
  data.push(movieList[1]);
  data.push(userList[1]);
  data.push(userList[2]);
  data.push(movieList[2]);

  const filterCategories = (movie) => (
    categories.filter((category: ICategory) => {
      for (const cat of movie.relationships.categories.data) {
        if (cat.id === category.id) return category;
      }
      return null;
    }));
  const findAuthor = (movie) => {
    let author = { attributes: { display_name: 'Unbekannter Nutzer' } };
    if (movie.relationships.user.data) {
      author = findObject(authorList, movie.relationships.user.data.id);
    }
    return author;
  };

  return (
    <ExplorationSectionWrapper>
      <ExplorationTextContainer>
        <ExplorationHeading>Entdecke das Board!</ExplorationHeading>
        <ExplorationText>
          {`
          Im Brickboard sammeln sich hauptsächlich Brickfilm begeisterte aus dem deutschsprachigen Raum.
          Hier sind immer verschiedene Mitglieder unserer Community gelistet. Kennst du sie schon alle? Schau doch am besten auf ihren Profilen vorbei!
        `}
        </ExplorationText>
      </ExplorationTextContainer>
      <ExplorationContent>
        <Link href={`/profil/${data[0].id}`} passHref>
          <ExplorationAvatar>
            <Image src={data[0].attributes.avatar ? `${backendURL}${data[0].attributes.avatar}` : '/assets/images/default_profile.svg'} objectFit="cover" layout="fill" alt={data[0].attributes.display_name} />
            <ExplorationAvatarInfos>
              <h3>{data[0].attributes.display_name}</h3>
              <Badge
                owned
                small
                badge={
                  data[0].relationships.thredded_main_badge.data
                    ? findObject(badges, data[0].relationships.thredded_main_badge.data.id)
                    : null
                }
              />
            </ExplorationAvatarInfos>
          </ExplorationAvatar>
        </Link>
        <Link href={`/forum/filmvorstellungen/${data[1].id}`} passHref>
          <Video1>
            <Image
              layout="fill"
              objectFit="cover"
              src={data[1].attributes.video_url ? `https://img.youtube.com/vi/${getYouTubeId(data[1].attributes.video_url)}/0.jpg` : '/assets/images/default_thumbnail.png'}
            />
            <ExplorationVideoInfos>
              <div>
                <h3>{data[1].attributes.title}</h3>
                <p>
                  Von:&nbsp;
                  {findAuthor(data[1]).attributes.display_name}
                </p>
                <CategoryWrapper>
                  {filterCategories(data[1]).map((category) => (
                    <Tag
                      key={category.attributes.name}
                      name={category.attributes.name}
                      icon={category.attributes.category_icon}
                    />
                  ))}
                </CategoryWrapper>
              </div>
              <ExplorationVideoPlay>
                <Icon icon={faPlayCircle} width={50} height={50} />
              </ExplorationVideoPlay>
            </ExplorationVideoInfos>
          </Video1>
        </Link>
        <Link href={`/forum/filmvorstellungen/${data[2].id}`} passHref>
          <Video2>
            <Image
              layout="fill"
              objectFit="cover"
              src={data[2].attributes.video_url ? `https://img.youtube.com/vi/${getYouTubeId(data[2].attributes.video_url)}/0.jpg` : '/assets/images/default_thumbnail.png'}
            />
            <ExplorationVideoInfos>
              <div>
                <h3>{data[2].attributes.title}</h3>
                <p>
                  Von:&nbsp;
                  {findAuthor(data[2]).attributes.display_name}
                </p>
                <CategoryWrapper>
                  {filterCategories(data[2]).map((category) => (
                    <Tag
                      key={category.attributes.name}
                      name={category.attributes.name}
                      icon={category.attributes.category_icon}
                    />
                  ))}
                </CategoryWrapper>
              </div>
              <ExplorationVideoPlay>
                <Icon icon={faPlayCircle} width={50} height={50} />
              </ExplorationVideoPlay>
            </ExplorationVideoInfos>
          </Video2>
        </Link>
        <Link href={`/profil/${data[3].id}`} passHref>
          <ExplorationAvatar>
            <Image src={data[3].attributes.avatar ? `${backendURL}${data[3].attributes.avatar}` : '/assets/images/default_profile.svg'} objectFit="cover" layout="fill" alt={data[3].attributes.display_name} />
            <ExplorationAvatarInfos>
              <h3>{data[3].attributes.display_name}</h3>
              <Badge
                owned
                small
                badge={
                  data[3].relationships.thredded_main_badge.data
                    ? findObject(badges, data[3].relationships.thredded_main_badge.data.id)
                    : null
                }
              />
            </ExplorationAvatarInfos>
          </ExplorationAvatar>
        </Link>
        <Link href={`/profil/${data[4].id}`} passHref>
          <ExplorationAvatar>
            <Image src={data[4].attributes.avatar ? `${backendURL}${data[4].attributes.avatar}` : '/assets/images/default_profile.svg'} objectFit="cover" layout="fill" alt={data[4].attributes.display_name} />
            <ExplorationAvatarInfos>
              <h3>{data[4].attributes.display_name}</h3>
              <Badge
                owned
                small
                badge={
                  data[4].relationships.thredded_main_badge.data
                    ? findObject(badges, data[4].relationships.thredded_main_badge.data.id)
                    : null
                }
              />
            </ExplorationAvatarInfos>
          </ExplorationAvatar>
        </Link>
        <Link href={`/forum/filmvorstellungen/${data[5].id}`} passHref>
          <Video3>
            <Image
              layout="fill"
              objectFit="cover"
              src={data[5].attributes.video_url ? `https://img.youtube.com/vi/${getYouTubeId(data[5].attributes.video_url)}/0.jpg` : '/assets/images/default_thumbnail.png'}
            />
            <ExplorationVideoInfos>
              <ExplorationVideoContent>
                <h3>{data[5].attributes.title}</h3>
                <p>
                  Von:&nbsp;
                  {findAuthor(data[5]).attributes.display_name}
                </p>
                <CategoryWrapper>
                  {filterCategories(data[5]).map((category) => (
                    <Tag
                      key={category.attributes.name}
                      name={category.attributes.name}
                      icon={category.attributes.category_icon}
                    />
                  ))}
                </CategoryWrapper>
              </ExplorationVideoContent>
              <ExplorationVideoPlay>
                <Icon icon={faPlayCircle} width={50} height={50} />
              </ExplorationVideoPlay>
            </ExplorationVideoInfos>
          </Video3>
        </Link>
      </ExplorationContent>
    </ExplorationSectionWrapper>
  );
};

export default ExplorationSection;
