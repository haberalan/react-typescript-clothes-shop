import { useEffect } from 'react';
import styled from 'styled-components';
import { fetchPurchases, purchasesAll, purchasesStatus } from '../../../features/purchases/purchasesSlice';
import { getUser } from '../../../features/user/userSlice';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { Loader } from '../helpers/Loader';
import { PurchasesItem } from './PurchasesItem';

export const PurchasesList = () => {
  const dispatch = useAppDispatch();

  const purchases = useAppSelector(purchasesAll);

  const status = useAppSelector(purchasesStatus);

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (purchases.length === 0) dispatch(fetchPurchases({ token: user.token }));
  }, [purchases.length, user.token, dispatch]);

  return (
    <Container>
      <h3>Purchases</h3>
      {status.loading && !status.error && <Loader />}
      {!status.loading && !status.error && purchases?.length !== 0 && (
        <List>
          {purchases.map((item) => (
            <PurchasesItem key={item._id} item={item} />
          ))}
        </List>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & > h3 {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 500px;
  padding: 0.4rem 1rem;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a4c4e;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #e4e4e4;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  @media (max-width: 550px) {
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 260px;
    padding: 0.4rem 0.4rem;
  }
`;
