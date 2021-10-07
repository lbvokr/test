import { Fragment, useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";

function NewsDetail({ match }) {
  const [news, setNews] = useState(null);
  console.log(match);

  const title = match.params.title;

  const fetchNews = async () => {
    try {
      const news = await axios.get(`/data/news/${title}`);
      console.log(news);
      setNews(news.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  if (!news) {
    return <Fragment>loading</Fragment>;
  }
  
  return (
    <Fragment>
      NewsDetail
      <h1>{news.title}</h1>
      <div>{news.description}</div>
    </Fragment>
  );
}

export default withRouter(NewsDetail);
