import styled from 'styled-components';

export const Home = () => {
  return (
    <>
      <Container>
        <img src="https://images.pexels.com/photos/4904557/pexels-photo-4904557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="home" />
        <img src="https://images.pexels.com/photos/1020370/pexels-photo-1020370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="home" />
        <img src="https://images.pexels.com/photos/4904560/pexels-photo-4904560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="home" />
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
  margin: 8rem;
  justify-content: space-between;

  img {
    height: 650px;
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
`;
