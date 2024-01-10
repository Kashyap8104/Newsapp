import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  constructor() {
    super();
    console.log("hello i am a constuctor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }
  async componentDidMount() {

    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=f86272b286bd49418e9c596438fb0448&page=1&pageSize=20";
    let data = await fetch(url);
    let parasedata = await data.json()
    console.log(parasedata);
    this.setState({ articles: parasedata.articles , totoalResults:parasedata.totoalResults })
  }
  handalNextClick = async () => {
    console.log("next");
    if(Math.ceil(this.state.page + 1 >this.state.totoalResults/20)){

    }
    else{

      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f86272b286bd49418e9c596438fb0448&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let parasedata = await data.json()
      console.log(parasedata);
      
      
      this.setState({
        page: this.state.page + 1,
        articles: parasedata.articles
      })
    }
  }
  handalPrevClick = async() => {
    console.log("prev");

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=f86272b286bd49418e9c596438fb0448&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parasedata = await data.json()
    console.log(parasedata);
    

    this.setState({
      page: this.state.page - 1,
      articles: parasedata.articles
    })
  }
  render() {

    return (
      <div className='container my-3'>
        <h1>NewsMonkeys - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handalPrevClick}>	&larr; previous</button>
          <button type="button" className="btn btn-dark" onClick={this.handalNextClick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}
