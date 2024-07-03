import "./Article.css";

export const Article = ({ id, symbol, title, text }) => {
  return (
    <article className="article" id = {id}>
      <h2 className="title">{symbol}</h2>
      <h3 className="title__second">{title}</h3>
      <p className="content">{text}</p>
    </article>
  );
};
