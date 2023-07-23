import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title,description,imageUrl,newsUrl}=this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" style={{height:"200px"}} src={!imageUrl?"https://www.naftemporiki.gr/wp-content/uploads/2022/12/shutterstock_1078596053.jpg":imageUrl} alt="Cardimagecap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl}  target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
