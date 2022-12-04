import { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { cartAll, setCart } from '../features/cart/cartSlice';
import { clothesAll, fetchClothes } from '../features/clothes/clothesSlice';
import { CardForm } from '../common/components/checkout/CardForm';
import { AddressForm } from '../common/components/checkout/AddressForm';
import { useNavigate } from 'react-router';
import { getUser } from '../features/user/userSlice';
import { totalValues } from '../common/utils/totalValues';

export const CheckoutPurchase = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(getUser);

  const clothes = useAppSelector(clothesAll);

  const cart = useAppSelector(cartAll);

  const total = useCallback(() => totalValues(cart.items, clothes.items).total, [cart.items, clothes.items]);

  useEffect(() => {
    if (clothes.items.length === 0) dispatch(fetchClothes());
  }, [clothes.items.length, dispatch]);

  const formIsValid = cart.items.length !== 0;

  const submitHandler = async () => {
    if (formIsValid) {
      const purchaseData = {
        total: total(),
        items: cart.items,
      };

      const res = await fetch(process.env.REACT_APP_API + 'purchase/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(purchaseData),
      });

      const data = await res.json();

      if (!res.ok) return;

      dispatch(setCart([]));
      navigate(`/profile/purchase/${data.id}`);
    }
  };

  return (
    <Container>
      <Flex>
        <CardForm />
        <AddressForm />
      </Flex>
      <button onClick={submitHandler} disabled={!formIsValid}>
        PURCHASE
      </button>
      <p>There should be a validation and actually a real checkout site.</p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  & > button {
    margin-top: 2rem;
    align-self: center;
    padding: 1rem 4rem;
    cursor: pointer;
    background: #e4e4e4;
    color: inherit;
    font-weight: 700;
    font-size: 1.2rem;
    border: none;
    font-family: inherit;
  }

  & > button:disabled {
    cursor: default;
    color: #fff;
  }

  @media (max-width: 500px) {
    p {
      padding: 0 0.4rem;
      text-align: center;
      font-size: 0.8rem;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 510px) {
    align-items: center;
  }
`;
