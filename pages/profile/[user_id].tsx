import { GetStaticPaths, GetStaticProps } from 'next';
import { Params } from 'next/dist/next-server/server/router';
import React, {
  ReactNode,
  useState,
} from 'react';
import useSWR from 'swr';
import { useStoreDispatch } from '../../context/custom_store';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const { content } = await getUsers();
  const users = content.data;

  return {
    paths: users.map((user) => ({
      params: {
        user_id: user.id,
      },
    })),
    fallback: false,
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

const Profile = ({
  content,
  fetchURL,
}: ProfileProps) => {
  const { data, mutate } = useSWR(fetchURL, get, { initialData: content, revalidateOnMount: true });
  const [component, setComponent] = useState<ReactNode>();
  const { setMessage } = useStoreDispatch();

  const user: IUser = data.data;
  const userDetail: IUserDetail = filter(data, 'thredded_user_show_detail')[0];

  const editBanner = (id: string) => {
    setComponent((
      <UploadOverlay
        headline="Profil Banner upload"
        onAccept={async (file) => {
          const bannerData = new FormData();
          bannerData.append('user_details[profile_banner]', file);
          const { content: updatedUser, error } = await updateUserDetail(id, bannerData);
          if (updatedUser) {
            const updateData = {
              ...data,
              included: [updatedUser.data],
            };
            setMessage({
              content: 'Profil Banner erfolgreich aktualisiert',
              type: MessageType.success,
            });
            setComponent(false);
            mutate(updateData, false);
          }
          if (error) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
        onDecline={() => setComponent(false)}
      />
    ));
  };

  const onEditAvatar = () => {
    setComponent((
      <UploadOverlay
        headline="Avatar upload"
        onAccept={async (file) => {
          const avatarData = new FormData();
          avatarData.append('user[avatar]', file);
          avatarData.append('user[current_password]', '123456');
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
            setComponent(false);
            mutate(updateData, false);
          }
          if (error) {
            setMessage({
              content: 'Es ist ein Fehler aufgetreten',
              type: MessageType.error,
            });
          }
        }}
        onDecline={() => setComponent(false)}
      />
    ));
  };

  return (
    <Layout title="Profil" component={component}>
      <>
        <Banner
          onEditBanner={() => editBanner(user.id)}
          alt_text="Profil Banner"
          image={userDetail.attributes.profile_banner}
          userId={user.id}
        />
        <ProfileInformation
          onEditAvatar={() => onEditAvatar()}
          userDetail={userDetail}
          user={user}
        />
      </>
    </Layout>
  );
};

export default Profile;
