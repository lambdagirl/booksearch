import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      searchTerm: "react",
      loading: true,
      startIndex: 0
    };
  }

  componentDidMount() {
    this.performSearch(this.state.searchTerm);
  }

  performSearch = (searchTerm, startIndex = 0) => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=6`
      )
      .then(response => {
        if (searchTerm !== this.state.searchTerm) {
          // new search term
          this.setState({
            gifs: response.data.items,
            startIndex: 0,
            loading: false,
            searchTerm: searchTerm
          });
        } else {
          // same search term
          this.setState({
            gifs: [...this.state.gifs, ...response.data.items],
            startIndex: startIndex,
            loading: false,
            searchTerm: searchTerm
          });
        }
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
        this.setState({ loading: false });
      });
  };

  render() {
    console.log(this.state.gifs);
    console.log(this.state.startIndex);

    const { gifs, searchTerm, startIndex } = this.state;
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">BookSearch</h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          <GifList data={gifs} />
        </div>
        <div className="button">
          <button
            type="button"
            onClick={() => this.performSearch(searchTerm, startIndex + 6)}
          >
            Load More
            {/* {startIndex} */}
          </button>
        </div>
      </div>
    );
  }
}
