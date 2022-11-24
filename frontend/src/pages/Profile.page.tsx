import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { getUser, logoutUser } from '../features/user/userSlice';
import { PurchasesList } from '../common/components/Profile/PurchasesList';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  return (
    <Container>
      <Header>
        <h2 className="title">
          Welcome <span>{user.user?.email}</span>
        </h2>
      </Header>
      <PurchasesList />
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  .title {
    font-weight: 700;
    font-size: 2rem;
  }

  .title > span {
    color: #4a4c4e;
  }

  button {
    align-self: center;
    padding: 0.6rem 2.4rem;
    cursor: pointer;
    background: #e4e4e4;
    color: inherit;
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    font-family: inherit;
  }

  @media (max-width: 350px) {
    .title {
      font-size: 1.4rem;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
