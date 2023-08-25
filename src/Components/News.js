import React, { Component } from "react";
import NewsItem from "./NewsItem";
import propTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    category: "general",
    country: "us",
  };

  static propTypes = {
    pageSize: propTypes.number,
    category: propTypes.string,
    country: propTypes.string,
  };
   capitalizeFLetter=(string)=> {
   
    return(string[0].toUpperCase() +
        string.slice(1));
}

  constructor(props) {
    super(props);
    console.log("Hello this action taken from constructor");
    this.state = {
      articles: [],

      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFLetter(this.props.category)} - News Panda`;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8edfb4309a6549169ad2509119130bad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8edfb4309a6549169ad2509119130bad&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    // });
    this.updateNews();
  }
  handleBackclick = async () => {
    // console.log("Previous");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8edfb4309a6549169ad2509119130bad&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    // });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextclick = async () => {
    // if (
    //   this.state.page + 1 >
    //   Math.ceil(this.state.totalResults / this.props.pageSize)
    // ) {
    // } else {
    //   console.log("Next");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8edfb4309a6549169ad2509119130bad&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //   });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center md-2">News Panda Heading From {this.capitalizeFLetter(this.props.category)} Category</h1>
        {/* <Spinner/> */}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 40) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  Author={element.author}
                  date={element.publishedAt}
                  Source={element.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between mt-3">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleBackclick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
export default News;
