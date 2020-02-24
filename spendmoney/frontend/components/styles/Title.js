import styled from 'styled-components';

const Title = styled.h3`
  margin: -3rem 0 1rem;
  text-align: center;
  transform: skew(-5deg) rotate(1deg);
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.5;
    font-size: 3rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
    box-shadow: ${props => props.theme.bsxl};
  }
`;

export default Title;
