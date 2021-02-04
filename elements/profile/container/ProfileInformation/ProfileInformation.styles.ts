import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100%;
`;

export const Avatar = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

export const SocialNetworkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 20px;
`;

export const Badge = styled(FontAwesomeIcon)`
  width: 60px;
  height: 60px;
`;

export const SocialNetworkLink = styled.a`
  margin: 10px;
`;

export const BadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BadgeTitle = styled.p`
  padding: 20px 0;
`;

export const ProfileCardWrapper = styled.div`
  background: ${(props) => props.theme.gray};
  width: 30%;
  min-height: 100%;
  border: 1px solid black;
`;

export const ProfileInformationWrapper = styled.div`
  background: ${(props) => props.theme.brickred};
  width: 70%;
  min-height: 100%;
`;
