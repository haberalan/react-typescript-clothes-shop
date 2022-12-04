import { useParams } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

import { useAppDispatch } from '../common/hooks/useRedux';
import { clothesAll, fetchClothes } from '../features/clothes/clothesSlice';
import { PurchaseType } from '../types/Purchase';
import { useAppSelector } from '../common/hooks/useRedux';
import { Loader } from '../common/components/helpers/Loader';
import { PurchaseDetailsList } from '../common/components/profile/PurchaseDetailsList';
import { getUser } from '../features/user/userSlice';
import { totalValues } from '../common/utils/totalValues';

export const Purchase = () => {
  const { id } = useParams();
  const user = useAppSelector(getUser);

  const dispatch = useAppDispatch();

  const clothes = useAppSelector(clothesAll);

  useEffect(() => {
    if (clothes.items.length === 0) dispatch(fetchClothes());
  }, [clothes.items.length, dispatch]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [purchase, setPurchase] = useState<PurchaseType | null>(null);

  const values = useCallback(() => totalValues(purchase!.items, clothes.items), [clothes.items, purchase]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(false);
      const res = await fetch(process.env.REACT_APP_API + 'purchase/one/' + id, {
        method: 'GET',
        headers: {
          Authorization: `Baerer ${user.token}`,
        },
      });

      if (!res.ok) {
        setLoading(false);
        return setError(true);
      }

      const data = await res.json();

      setPurchase(data[0]);
      setLoading(false);
    };

    fetchItems();
  }, [user.token, id]);

  return (
    <Container>
      <h3>Purchase</h3>
      {(loading || clothes.loading) && !error && <Loader />}
      {!loading && !clothes.loading && error && <p className="error">There is no such purchase.</p>}
      {!loading && !clothes.loading && !error && purchase && (
        <Content>
          <PurchaseDetailsList items={purchase.items} />
          <Details>
            <div>
              <p className="text">Date:</p>
              <p className="value">{format(new Date(purchase.createdAt), 'do LLLL yyyy')}</p>
            </div>
            <div>
              <p className="text">Tax 21%:</p>
              <p className="value">{values().tax}£</p>
            </div>
            <div>
              <p className="text">Quantity:</p>
              <p className="value">{values().quantity}</p>
            </div>
            <div>
              <p className="text">Price:</p>
              <p className="value">{values().total} £</p>
            </div>
          </Details>
        </Content>
      )}
      <Link to="/profile">Go back</Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .error {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  & > h3 {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;

  a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Details = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
  }

  .text {
    color: #4a4c4e;
  }

  .value {
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    order: -1;
  }

  @media (max-width: 450px) {
    width: 260px;

    div {
      font-size: 1rem;
    }
  }
`;
