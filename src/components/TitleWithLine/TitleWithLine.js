import './TitleWithLine.css';

const TitleWithLine = ({ text, mutate }) => (
  <h2 className={`title${mutate ? ' title_mutated' : ''}`}>{text}</h2>
);
export default TitleWithLine;
