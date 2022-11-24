import styled from 'styled-components';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { clothesAll, fetchClothes } from '../../../features/clothes/clothesSlice';
import { CartBoxList } from './CartBoxList';
import { Link } from 'react-router-dom';

type CartBoxProps = {
  toggleCart: () => void;
  amount: () => number | string;
};

export const CartBox = ({ toggleCart, amount }: CartBoxProps) => {
  const dispatch = useAppDispatch();

  const clothes = useAppSelector(clothesAll);

  useEffect(() => {
    if (clothes.items.length === 0) dispatch(fetchClothes());
  }, [clothes.items.length, dispatch]);

  return (
    <>
      {createPortal(<Backdrop onClick={toggleCart} />, document.querySelector('#backdrop-root') as HTMLDivElement)}
      <Container>
        <p>
          <span>My bag</span>, {amount()}
        </p>
        <div className="items">
          {clothes.loading && <p>Loading...</p>}
          {clothes.error && <p>{clothes.error}</p>}
          {!clothes.loading && !clothes.error && <CartBoxList />}
        </div>
        <Link to="/checkout" onClick={toggleCart}>
          GO TO CHECKOUT
        </Link>
      </Container>
    </>
  );
};

const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const Container = styled.div`
  position: absolute;
  width: 400px;
  background: #e4e4e4;
  background: #fff;
  top: 200%;
  right: 0px;
  z-index: 10;
  padding: 1rem 0.2rem;
  box-sizing: border-box;

  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;

  & > p {
    padding: 0 1rem;
    font-size: 1.2rem;
  }

  & > p > span {
    font-weight: 700;
  }

  & > a {
    font-size: 1rem;
    align-self: center;
    padding: 1rem 4rem;
    cursor: pointer;
    background: #e4e4e4;
    color: inherit;
    font-weight: 700;
    border: none;
    font-family: inherit;
    text-decoration: none;
  }

  .items {
    padding: 0.4rem 1rem;
    overflow-y: auto;
    max-height: 300px;
  }

  .items::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  .items::-webkit-scrollbar-thumb {
    background-color: #4a4c4e;
    border-radius: 3px;
  }

  .items::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #e4e4e4;
  }

  .items::-webkit-scrollbar-corner {
    display: none;
  }

  @media (max-width: 900px) {
    top: 120%;
  }

  @media (max-width: 450px) {
    width: 300px;
  }

  @media (max-width: 400px) {
    width: 240px;

    .items {
      padding: 0.2rem;
    }

    & > p {
      padding: 0 0.2rem;
    }

    & > a {
      font-size: 1rem;
      padding: 0.6rem 2rem;
    }
  }
`;
