import styled from 'styled-components';
import { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../common/hooks/useRedux';
import { clothesAll, fetchClothes } from '../features/clothes/clothesSlice';
import { CheckoutList } from '../common/components/Checkout/CheckoutList';
import { CartType } from '../types/Cart';
import { ClothType } from '../types/Cloth';
import lottieJson from '../common/assets/loading.json';
import { cartAll } from '../features/cart/cartSlice';
import { getUser } from '../features/user/userSlice';

const totalValues = (cartTable: CartType[], clothesTable: ClothType[]) => {
  let total = 0;
  let tax = 0;
  let quantity = 0;
  if (cartTable.length === 0) {
    return {
      total: total.toFixed(2),
      tax: tax.toFixed(2),
      quantity,
    };
  }
  cartTable.forEach((cartItem) => {
    const itemDetails = clothesTable.find((item) => item._id === cartItem._id);

    total += itemDetails!.price * cartItem.amount;
    quantity += cartItem.amount;
  });

  tax = total * 0.21;

  return {
    total: total.toFixed(2),
    tax: tax.toFixed(2),
    quantity,
  };
};

export const Checkout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const clothes = useAppSelector(clothesAll);

  const cart = useAppSelector(cartAll);

  const user = useAppSelector(getUser);

  useEffect(() => {
    if (clothes.items.length === 0) dispatch(fetchClothes());
  }, [clothes.items.length, dispatch]);

  const clickHandler = () => {
    navigate('details');
  };

  return (
    <>
      {clothes.loading && <Lottie animationData={lottieJson} play className="loader" />}
      {!clothes.loading && (
        <Container>
          <div className="items">
            <CheckoutList />
          </div>
          <CheckoutDetails>
            <h3 className="title">Your bag</h3>
            <p>
              <span className="name">Tax 21%:</span>
              <span className="details">{totalValues(cart.items, clothes.items).tax} £</span>
            </p>
            <p>
              <span className="name">Quantity:</span>
              <span className="details">{totalValues(cart.items, clothes.items).quantity} qty.</span>
            </p>
            <p>
              <span className="name">Total:</span>
              <span className="details">{totalValues(cart.items, clothes.items).total} £</span>
            </p>
            <ConfirmCheckout className="normal">
              <button disabled={cart.items.length === 0 || !user.token} onClick={clickHandler}>
                PURCHASE
              </button>
              {!user.token && cart.items.length > 0 && <p className="not-logged">You have to be logged in.</p>}
            </ConfirmCheckout>
          </CheckoutDetails>
          <ConfirmCheckout className="additional">
            <button disabled={cart.items.length === 0 || !user.token} onClick={clickHandler}>
              PURCHASE
            </button>
            {!user.token && cart.items.length > 0 && <p className="not-logged">You have to be logged in.</p>}
          </ConfirmCheckout>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;

  .items {
    padding: 0.4rem 1rem;
    overflow-y: auto;
    max-height: 700px;
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

  .additional {
    display: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;

    .normal {
      display: none;
    }

    .additional {
      display: flex;
    }
  }

  @media (max-width: 450px) {
    .items {
      padding: 0;
    }
  }
`;

const CheckoutDetails = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .title {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
  }

  p > .name {
    color: #4a4c4e;
  }

  p > .details {
    font-weight: 700;
  }

  @media (max-width: 900px) {
    order: -1;

    .title {
      text-align: center;
    }
  }

  @media (max-width: 350px) {
    width: 260px;

    p {
      font-size: 1.2rem;
    }
  }
`;

const ConfirmCheckout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .not-logged {
    align-self: center;
    font-size: 1.2rem;
  }

  button {
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

  button:disabled {
    cursor: default;
    color: #fff;
  }
`;
