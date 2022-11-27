import styled from 'styled-components';

import { Header } from './Header';
import { Footer } from './Footer';

type LayoutProps = {
  children: JSX.Element;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
};

const StyledMain = styled.main`
  min-height: 400px;
  margin: 4rem 0 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
