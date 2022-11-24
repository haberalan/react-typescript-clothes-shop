import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PurchaseType } from '../../../types/Purchase';
import { Loader } from '../Utils/Loader';
import { PurchasesItem } from './PurchasesItem';

export const PurchasesList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<PurchaseType[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(process.env.REACT_APP_API + 'purchase/all', {
        method: 'GET',
        headers: {
          Authorization: `Baerer ${JSON.parse(localStorage.getItem('CLOTHES-SHOP_token') as string)}`,
        },
      });

      if (!res.ok) {
        setError(true);
      } else {
        const data = await res.json();

        setItems(data);
      }

      setLoading(false);
    };

    fetchItems();
  }, []);

  return (
    <Container>
      <h3>Purchases</h3>
      {loading && !error && <Loader />}
      {!loading && !error && items?.length !== 0 && (
        <List>
          {items.map((item) => (
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
