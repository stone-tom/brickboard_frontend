import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Params } from 'next/dist/next-server/server/router';
import React from 'react';
import useSWR from 'swr';
import { useStoreDispatch, useStoreState } from '../../context/custom_store';
import Layout from '../../elements/core/container/Layout/Layout';
import Banner from '../../elements/profile/components/Banner/Banner';
import ProfileInformation from '../../elements/profile/container/ProfileInformation/ProfileInformation';
import IUser from '../../models/IUser';
import IUserDetail from '../../models/IUserDetail';
import getUserDetails from '../../util/api/user/get-user-detail';
import getUsers from '../../util/api/user/get-users';
import updateUserDetail from '../../util/api/user/update-user-detail';
import updateUser from '../../util/api/user/update-user';
import filter from '../../util/filter';
import { get } from '../../util/methods';
import UploadOverlay from '../../elements/profile/container/UploadOverlay/UploadOverlay';
import { MessageType } from '../../models/IMessage';
import { ViewWrapper } from '../../styles/global.styles';
import Loader from '../../elements/core/components/Loader/Loader';
import Restrictions from '../../config/file_upload_restrictions.json';
import ITopic from '../../models/ITopic';
import ICategory from '../../models/ICategory';
import IBadge from '../../models/IBadge';

export const getStaticPaths: GetStaticPaths = async () => {
  const { content } = await getUsers();
  const users = content.data || null;

  return {
    paths: users.map((user) => ({
      params: {
        user_id: user.id,
      },
    })),
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const { content, fetchURL } = await getUserDetails(params.user_id);

  return {
    props: {
      content,
      fetchURL,
    },
    revalidate: 1,
  };
};

interface ProfileProps {
  content: any,
  fetchURL: string,
}

export const isBlocked = (
  accessingUser: IUser,
  currentUser: IUser,
  currentUserDetail: IUserDetail,
) => {
  if (accessingUser && accessingUser.id === currentUser.id) return false;
  if (accessingUser && accessingUser.attributes.admin) return false;
  if (currentUserDetail.attributes.moderation_state === 'pending_moderation'
    || currentUserDetail.attributes.moderation_state === 'blocked') return true;
  return false;
};

const Profile = ({
  content,
  fetchURL,
}: ProfileProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <Layout title="Lädt - Brickboard 2.0">
        <ViewWrapper>
          <Loader isLoading />
        </ViewWrapper>
      </Layout>
    );
  }
  const { data, mutate } = useSWR(fetchURL, get, { initialData: content, revalidateOnMount: true });
  const { setMessage, addComponent, updateUserAvatar } = useStoreDispatch();
  const user: IUser = data.data;
  const userDetail: IUserDetail = filter(data, 'thredded_user_show_detail')[0];
  const userBadges: IBadge[] = filter(data, 'badge');
  const movies: ITopic[] = data.included.filter((item) => item.type === 'topic' && item.attributes.type === 'Thredded::TopicMovie');
  const movieCategories: ICategory[] = filter(data, 'category');
  const { user: currentUser } = useStoreState();
  const getMainBadge = () => {
    const mainBadgeId = data.data.relationships.thredded_main_badge.data.id;
    const mainBadge = filter(data, 'badge').find((elem) => elem.id === mainBadgeId);
    return mainBadge;
  };
  const userMainBadge = getMainBadge();

  const editBanner = (id: string, shouldDelete?: boolean) => {
    addComponent((
      <UploadOverlay
        shouldDelete={shouldDelete}
        deleteMessage="Wollen Sie das Banner wirklich löschen?"
        headline="Profil Banner upload"
        allowedTypes={Restrictions.allowed_file_types_banner}
        maxSize={Restrictions.max_size_banner}
        onAccept={async (file) => {
          const bannerData = new FormData();
          bannerData.append('user_details[profile_banner]', shouldDelete ? '' : file);
          const { content: updatedUser, error } = await updateUserDetail(id, bannerData, true);
          if (updatedUser) {
            const updateData = {
              ...data,
              included: [updatedUser.data],
            };
            setMessage({
              content: 'Profil Banner erfolgreich aktualisiert',
              type: MessageType.success,
            });
            mutate(updateData, false);
          }
          if (error) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
      />
    ));
  };

  const onEditAvatar = (shouldDelete?: boolean) => {
    addComponent((
      <UploadOverlay
        shouldDelete={shouldDelete}
        deleteMessage="Wollen Sie den Avatar wirklich löschen?"
        allowedTypes={Restrictions.allowed_file_types_avatar}
        maxSize={Restrictions.max_size_avatar}
        headline="Avatar upload"
        onAccept={async (file) => {
          const avatarData = new FormData();
          avatarData.append('user[avatar]', shouldDelete ? '' : file);
          const { content: updatedUser, error } = await updateUser(avatarData);
          if (updatedUser) {
            const updateData = {
              ...data,
              data: updatedUser.data,
            };
            setMessage({
              content: 'Avatar erfolgreich aktualisiert',
              type: MessageType.success,
            });
            updateUserAvatar(updatedUser.data.attributes.avatar);
            mutate(updateData, false);
          }
          if (error) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
      />
    ));
  };

  const onUpdateUserDetail = async (newUserDetail: IUserDetail) => {
    const body: any = {
      user_details: {
        ...newUserDetail.attributes,
      },
    };
    delete body.user_details.profile_banner;

    const { content: updatedUserDetail, error } = await updateUserDetail(
      user.id,
      JSON.stringify(body),
    );
    if (updatedUserDetail) {
      const updateData = {
        ...data,
        included: [updatedUserDetail.data],
      };
      setMessage({
        content: 'Persönliche Informationen erfolgreich aktualisiert',
        type: MessageType.success,
      });
      mutate(updateData, false);
    }
    if (error) {
      setMessage({
        content: 'Es ist ein Fehler aufgetreten',
        type: MessageType.error,
      });
    }
  };

  return (
    <Layout fullWidth title="Profil">
      {user && (
        <ViewWrapper fullHeight>
          <Banner
            blocked={isBlocked(currentUser, user, userDetail)}
            onEditBanner={(shouldDelete) => editBanner(user.id, shouldDelete)}
            alt_text="Profil Banner"
            image={userDetail.attributes.profile_banner}
            userId={user.id}
          />
          <ProfileInformation
            onUpdateUser={(newUserDetail) => onUpdateUserDetail(newUserDetail)}
            onEditAvatar={(shouldDelete) => onEditAvatar(shouldDelete)}
            userDetail={userDetail}
            user={user}
            movies={movies}
            userBadges={userBadges}
            userMainBadge={userMainBadge}
            movieCategories={movieCategories}
          />
        </ViewWrapper>
      )}
    </Layout>
  );
};

export default Profile;
