import styled from 'styled-components';

export const Home = () => {
  return (
    <>
      <Container>
        <img
          src="https://images.pexels.com/photos/4904557/pexels-photo-4904557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="home"
          className="img1"
        />
        <img
          src="https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="home"
          className="img2"
        />
        <img
          src="https://images.pexels.com/photos/4904560/pexels-photo-4904560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="home"
          className="img3"
        />
        <Text>
          <h2>Get ready!</h2>
          <p>Start 2023 in style by changing your wardrobe.</p>
        </Text>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  gap: 0.2rem;
  justify-content: space-between;

  img {
    height: 650px;
  }

  @media (max-width: 1700px) {
    img {
      height: 500px;
    }
  }

  @media (max-width: 1400px) {
    img {
      height: 400px;
    }
  }

  @media (max-width: 1000px) {
    img {
      height: 300px;
    }
  }

  @media (max-width: 700px) {
    img {
      height: 360px;
    }

    .img2 {
      display: none;
    }
  }

  @media (max-width: 500px) {
    .img1,
    .img3 {
      display: none;
    }

    .img2 {
      display: inline;
    }
  }

  @media (max-width: 340px) {
    img {
      height: 300px;
    }
  }
`;

const Text = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 1.2rem;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 8%;
  text-align: center;
  color: #fff;

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }

  @media (max-width: 1700px) {
    font-size: 0.8rem;

    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 1000px) {
    font-size: 0.6rem;
  }

  @media (max-width: 700px) {
    color: inherit;
    bottom: -16%;
    font-size: 1rem;
  }

  @media (max-width: 500px) {
    color: #fff;
    bottom: 8%;
    font-size: 0.8rem;
  }
`;
