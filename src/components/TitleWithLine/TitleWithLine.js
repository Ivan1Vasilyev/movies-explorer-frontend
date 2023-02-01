import './TitleWithLine.css';

const TitleWithLine = ({ text, mutated, mixStyle }) => {
  return <h2 className={`title ${mutated && 'title_mutated'}`}>{text}</h2>;
};

export default TitleWithLine;
