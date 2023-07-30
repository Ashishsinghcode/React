import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - News Monkey`;
  }

  fetchNews = async () => {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    let passedData = await data.json();
    this.props.setProgress(60);
    await this.setState({
      articles: passedData.articles,
      loading: false,
      totalResults: passedData.totalResults,
    });
    this.props.setProgress(100);

  }
  fetchMoreData = async () => {
    await this.setState({ page: this.state.page + 1 }, async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
      let data = await fetch(url);
      let passedData = await data.json();
      await this.setState({
        articles: this.state.articles.concat(passedData.articles),
      });
    });
  };
  componentDidMount() {
    this.fetchNews();
  }

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 })
  //   this.updateNews()
  // }

  // handlePreviousClick = async () => {
  //   this.setState({ page: this.state.page - 1 })
  //   this.updateNews()
  // }

  render() {
    return (
      <>
        <div className="row ">
          <div className="col-md-12">
            <h1 className="text-center mb-5">
              News Monkey - Top{" "}
              {this.capitalizeFirstLetter(this.props.category)} Headlines
            </h1>
            {this.state.loading && <Spinner />}
            {/* {console.log(this.state.totalResults)} */}
          </div>

          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row ">
                {/* {console.log(this.state.totalResults)} */}
                {this.state.articles.map((element) => {
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

        {/* <div className='container '>
          <div className="d-flex justify-content-between">
          <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next&rarr;</button>
          </div>
        </div> */}
      </>
    );
  }
}

export default News;
