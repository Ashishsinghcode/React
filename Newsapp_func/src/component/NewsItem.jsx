
const NewsItem=(props)=>{

    let { title, description, imageUrl, newsUrl, publish, author, source } = props;

    return (
      <div>
        <div className="card" >
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{ left: '70%', zIndex: '1' }}>
            {source}
            <span className="visually-hidden"></span>
          </span>
          <img className="card-img-top" style={{ height: "200px" }} src={!imageUrl ? "https://www.naftemporiki.gr/wp-content/uploads/2022/12/shutterstock_1078596053.jpg" : imageUrl} alt="Cardimagecap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="badge rounded-pill bg-warning text-dark">{source}</span>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} {new Date(publish).toGMTString().slice(0, 16)}</small></p>
            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }


export default NewsItem
