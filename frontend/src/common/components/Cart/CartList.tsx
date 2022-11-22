import styled from 'styled-components';
import { CartItem } from './CartItem';

import { useAppSelector } from '../../hooks/useRedux';
import { cartAll } from '../../../features/cart/cartSlice';

export const CartList = () => {
  const cart = useAppSelector(cartAll);

  return (
    <>
      {cart.items.length > 0 && (
        <List>
          {cart.items.map((item) => (
            <CartItem key={item._id + item.size} item={item} />
          ))}
        </List>
      )}
    </>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
