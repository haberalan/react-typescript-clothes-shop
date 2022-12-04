import styled from 'styled-components';

import { cartAll } from '../../../features/cart/cartSlice';
import { useAppSelector } from '../../hooks/useRedux';
import { CheckoutItem } from './CheckoutItem';

export const CheckoutList = () => {
  const cart = useAppSelector(cartAll);

  return (
    <>
      <List>
        {cart.items.map((item) => (
          <CheckoutItem key={item._id + item.size} item={item} />
        ))}
        {cart.items.length === 0 && <p className="empty">Your cart is empty.</p>}
      </List>
    </>
  );
};

const List = styled.ul`
  width: 700px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .empty {
    margin-top: 6rem;
    align-self: center;
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    width: 500px;
  }

  @media (max-width: 550px) {
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 350px) {
    width: 260px;
  }
`;
