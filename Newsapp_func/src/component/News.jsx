import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";



const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title = `${capitalizeFirstLetter(props.category)} - News Monkey`;


const fetchNews = async () => {
  props.setProgress(0);
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
  // setState({ loading: true });
  props.setProgress(30);
  let data = await fetch(url);
  let passedData = await data.json();
  props.setProgress(60);

  setArticles(passedData.articles)
  setLoading(false)
  setTotalResults(passedData.totalResults)

  props.setProgress(100);
}


const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
  let data = await fetch(url);
  let passedData = await data.json();
  setArticles(articles.concat(passedData.articles))
  setTotalResults(passedData.totalResults)
}

const count=()=>{
  setPage(page + 1)

}
useEffect(()=>{
  fetchMoreData()
},[page])

useEffect(() => {
  fetchNews();
},[])

return (
  <>
    <div className="row ">
      <div className="col-md-12">
        <h1 className="text-center mb-5">
          News Monkey - Top{" "}
          {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner />}
        {/* {console.log(this.state.totalResults)} */}
      </div>

      <InfiniteScroll
        dataLength={articles.length}
        next={count}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row ">
            {/* {console.log(this.state.totalResults)} */}
            {articles.map((element) => {
              return (
                <div key={element.url} className="col-md-3 my-2">
                  <NewsItem
                    title={element ? element.title.slice(0, 45) + "..." : ""}
                    publish={element.publishedAt.slice(0, 10)}
                    author={element.author}
                    source={element.source.name}
                    description={
                      element.description
                        ? element.description.slice(0, 88) + "..."
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  </>
);

};
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News;
