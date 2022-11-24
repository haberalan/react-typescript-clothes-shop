import styled from 'styled-components';
import { CartBoxItem } from './CartBoxItem';

import { useAppSelector } from '../../hooks/useRedux';
import { cartAll } from '../../../features/cart/cartSlice';

export const CartBoxList = () => {
  const cart = useAppSelector(cartAll);

  return (
    <>
      {cart.items.length > 0 && (
        <List>
          {cart.items.map((item) => (
            <CartBoxItem key={item._id + item.size} item={item} />
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
