import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LogoImage from '../../assets/gm2l.webp';
import { useAppSelector } from '../../hooks/useRedux';
import { CartBox } from '../Cart/CartBox';
import { cartAll } from '../../../features/cart/cartSlice';

export const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const cart = useAppSelector(cartAll);

  const itemsAmount = useCallback(() => {
    const amount = cart.items.map((item) => item.amount).reduce((prev, cur) => prev + cur, 0);

    return amount;
  }, [cart.items]);

  const toggleCartOpen = () => setCartOpen(!cartOpen);

  return (
    <StyledHeader>
      <Navbar>
        <NavLink to="/men">MEN</NavLink>
        <NavLink to="/women">WOMEN</NavLink>
        <NavLink to="/kids">KIDS</NavLink>
      </Navbar>
      <Link to="/" className="logo">
        <Logo src={LogoImage} alt="logo" />
      </Link>
      <MenuAndCart>
        <NavLink to="/profile">Profile</NavLink>
        <div className="cart">
          <ShoppingCartOutlinedIcon onClick={toggleCartOpen} />
          <div className="amount">{itemsAmount() !== 0 && itemsAmount()}</div>
          {cartOpen && <CartBox toggleCart={toggleCartOpen} amount={itemsAmount} />}
        </div>
      </MenuAndCart>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background: #fff;
  position: relative;
  z-index: 10;
  margin-top: 1rem;
  padding: 1rem;
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  a.active {
    border-bottom: 3px solid #e50010;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    width: 90vw;
    gap: 0;

    .logo {
      grid-column: -1 / 1;
      order: 1;
    }
  }

  @media (max-width: 340px) {
    gap: 0;
  }
`;

const Navbar = styled.nav`
  display: flex;
  gap: 1rem;

  & > a {
    font-size: 1.6rem;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    color: #1d1f22;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  @media (max-width: 1200px) {
    & > a {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1050px) {
    gap: 0.2rem;

    & > a {
      padding: 0.2rem 0.4rem;
    }
  }

  @media (max-width: 900px) {
    justify-self: start;
    gap: 0;

    & > a {
      font-size: 1rem;
    }
  }
`;

const Logo = styled.img`
  height: 80px;

  @media (max-width: 900px) {
    height: 60px;
  }
`;

const MenuAndCart = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;

  & > a {
    font-size: 1.6rem;
    text-decoration: none;
    padding: 0.4rem 0.8rem;
    color: #1d1f22;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .cart {
    position: relative;
  }

  .amount {
    background-color: #e4e4e4;
    padding: 0.1rem 0.2rem;
    position: absolute;
    font-size: 1.2rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
  }

  svg {
    height: 32px;
    width: 32px;
    fill: #1d1f22;
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    & > a {
      font-size: 1.2rem;
    }

    svg {
      height: 24px;
      width: 24px;
    }

    .amount {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 1050px) {
    gap: 0.2rem;

    & > a {
      padding: 0.2rem 0.4rem;
    }
  }

  @media (max-width: 900px) {
    justify-self: end;

    & > a {
      font-size: 1rem;
    }

    svg {
      height: 20px;
      width: 20px;
    }

    .amount {
      font-size: 0.6rem;
    }
  }
`;
