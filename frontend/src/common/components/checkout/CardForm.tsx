import styled from 'styled-components';

export const CardForm = () => {
  return (
    <Container>
      <h2>Card</h2>
      <Normal>
        <label htmlFor="">Name</label>
        <input type="text" placeholder="John Johnny" />
      </Normal>
      <Normal>
        <label htmlFor="">Card number</label>
        <input type="text" placeholder="0000 0000 0000 0000" />
      </Normal>
      <Short>
        <div>
          <label htmlFor="">CVC</label>
          <input type="text" placeholder="000" />
        </div>
        <div>
          <label htmlFor="">Month</label>
          <input type="text" placeholder="00" />
        </div>
        <div>
          <label htmlFor="">Year</label>
          <input type="text" placeholder="0000" />
        </div>
      </Short>
    </Container>
  );
};

const Container = styled.form`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-weight: 700;
    font-size: 1.8rem;
  }

  label {
    font-size: 1.2rem;
    color: #4a4c4e;
  }

  input {
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
    color: inherit;
    border: 1px solid #1d1f22;
  }

  @media (max-width: 900px) {
    order: 1;
  }

  @media (max-width: 510px) {
    width: 260px;
  }
`;

const Normal = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
`;

const Short = styled.div`
  display: flex;
  gap: 2rem;

  div {
    display: flex;
    gap: 0.4rem;
    flex-direction: column;
  }

  input {
    box-sizing: border-box;
    width: 100%;
  }
`;
