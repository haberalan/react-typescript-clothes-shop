import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

import { CartType } from '../../../types/Cart';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { add, remove } from '../../../features/cart/cartSlice';
import { clothesOne } from '../../../features/clothes/clothesSlice';

type CheckoutItemProps = {
  item: CartType;
};

export const CheckoutItem = ({ item }: CheckoutItemProps) => {
  const dispatch = useAppDispatch();

  const cloth = useAppSelector((state) => clothesOne(state, item._id));

  return (
    <ListItem>
      <Details>
        <Link to={`/${cloth?.forWho}/item/${item._id}`} className="title">
          {cloth?.name}
        </Link>
        <p className="price">{cloth?.price} £</p>
        <div>
          <p>Size:</p>
          <div className="size-box">{item.size}</div>
        </div>
        <div>
          <p>Color:</p>
          <p className="color">{cloth?.colour}</p>
        </div>
      </Details>
      <div className="btns-image">
        <Btns>
          <button onClick={() => dispatch(add({ _id: item._id, size: item.size }))}>
            <AddIcon />
          </button>
          <p>{item.amount}</p>
          <button onClick={() => dispatch(remove({ _id: item._id, size: item.size }))}>
            <RemoveIcon />
          </button>
        </Btns>
        <img src={cloth?.imgs[0]} alt="cloth example" />
      </div>
    </ListItem>
  );
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  img {
    height: 200px;
  }

  .btns-image {
    display: flex;
  }

  @media (max-width: 450px) {
    img {
      display: none;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: flex-start;
  }

  .size-box {
    border: 2px solid #1d1f22;
    min-width: 2.4rem;
    padding: 0 0.4rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e4e4e4;
    font-weight: 700;
  }

  .title {
    font-size: 1.4rem;
    text-decoration: none;
    color: #4a4c4e;
  }

  .title:hover {
    text-decoration: underline;
  }

  .price {
    font-weight: 700;
    font-size: 1.4rem;
  }

  .color {
    font-weight: 700;
    font-size: 1.2rem;
  }

  @media (max-width: 450px) {
    .title {
      font-size: 1rem;
    }

    .price {
      font-size: 1.2rem;
    }
  }
`;

const Btns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;

  button {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: none;
    color: inherit;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }

  button:hover {
    background: #e4e4e4;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: #1d1f22;
  }

  p {
    font-weight: 700;
    color: #4a4c4e;
  }
`;
