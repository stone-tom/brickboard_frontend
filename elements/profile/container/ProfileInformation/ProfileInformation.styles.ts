import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-width: ${(props) => props.theme.max_container_width};
  min-height: 100%;
  margin: 0 auto;
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
  margin: 50px 50px 20px 50px;
  
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
  min-width: 320px;
  min-height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const ProfileInformationWrapper = styled.div`
  background: ${(props) => props.theme.white};
  width: 80%;
  min-height: 100%;
`;

export const Username = styled.p`
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
`;
