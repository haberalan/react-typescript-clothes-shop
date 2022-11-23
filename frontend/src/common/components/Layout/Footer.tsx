import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <StyledFooter>
      <Menus>
        <MenuContainer>
          <h2>Shop</h2>
          <ul>
            <li>
              <Link to="/men">Men</Link>
            </li>
            <li>
              <Link to="/women">Women</Link>
            </li>
            <li>
              <Link to="/kids">Kids</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
          </ul>
        </MenuContainer>
        <MenuContainer>
          <h2>Profile</h2>
          <ul>
            <li>
              <Link to="/profile">Account</Link>
            </li>
            <li>
              <Link to="/profile/purchases">Purchases</Link>
            </li>
            <li>
              <Link to="/profile/settings">Settings</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </MenuContainer>
        <MenuContainer>
          <h2>Help</h2>
          <ul>
            <li>
              <Link to="/">Customer service</Link>
            </li>
            <li>
              <Link to="/">Contact</Link>
            </li>
            <li>
              <Link to="/">Returns</Link>
            </li>
            <li>
              <Link to="/">Privacy policy</Link>
            </li>
          </ul>
        </MenuContainer>
        <MenuContainer>
          <h2>Media</h2>
          <ul>
            <li>
              <Link to="/">Instagram</Link>
            </li>
            <li>
              <Link to="/">Facebook</Link>
            </li>
            <li>
              <Link to="/">TikTok</Link>
            </li>
          </ul>
        </MenuContainer>
      </Menus>
      <Copyright href="https://github.com/haberalan">© 2022 Alan Haber</Copyright>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background: #e4e4e4;
  align-self: stretch;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 2rem 0 1rem;

  @media (max-width: 340px) {
    padding: 2rem 1rem 1rem;
  }
`;

const Menus = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: 450px) {
    gap: 2rem;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1rem;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  a {
    font-size: 0.8rem;
    font-weight: 500;
    text-decoration: none;
    color: #1d1f22;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 550px) {
    gap: 0.6rem;

    h2 {
      font-size: 0.8rem;
    }

    a {
      font-size: 0.6rem;
    }

    ul {
      gap: 0.2rem;
    }
  }
`;

const Copyright = styled.a`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #1d1f22;

  &:hover {
    text-decoration: underline;
  }
`;
