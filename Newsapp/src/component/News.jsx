import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-07-10&sortBy=publishedAt&apiKey=c05f8a16903e4948bcf9eefb2d63b1c8&pagesize=${this.props.pageSize}`
    this.setState({loading:true})
    
    let data = await fetch(url);
    let passedData = await data.json()
    await this.setState({ articles: passedData.articles, loading:false })
  }

  handleNextClick= async ()=>{
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-07-10&sortBy=publishedAt&apiKey=c05f8a16903e4948bcf9eefb2d63b1c8&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let passedData = await data.json()

    this.setState({
      page:this.state.page + 1,
      articles: passedData.articles,
      loading:false

    })
  }
  handlePreviousClick= async ()=>{
    
    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-07-10&sortBy=publishedAt&apiKey=c05f8a16903e4948bcf9eefb2d63b1c8&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let passedData = await data.json()

    this.setState({
      page:this.state.page - 1,
      articles: passedData.articles,
      loading:false

    })
  }
  render() {
    return (
      <>
        <div className='container my-3'>
          <h2>News Monkey - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
          <div className='row'>
            {!this.state.loading && this.state.articles.map((element) => {
             
                return (
                  <div key={element.url} className='col-md-3 my-2'>
                    <NewsItem title={element ? element.title.slice(0, 45) + '...' : ""} description={element.description ? element.description.slice(0, 88) + '...' : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                  </div>
                )
              
            })}
          </div>
        </div>
        <div className='container '>
          <div className="d-flex justify-content-between">
            <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreviousClick}>&larr;Previous</button>
            <button type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next&rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News
