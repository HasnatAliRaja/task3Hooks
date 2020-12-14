import React, { Component, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     books: [],
  //     input: "",
  //     open: false,
  //     startIndex: 10,
  //   };

  //   //bindinds
  //   this.handleChange = this.handleChange.bind(this);
  // }
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(10);

  useEffect(() => {
    console.log("Input",input);
    fetchBooks();
  }, [input]);

  let viewDetails = (e) => {
    console.log(e.value);
  };

  let handleChange = (e) => {
    console.log("Got into handleChange");
    setInput(e.target.value);

    console.log("Got into handleChange with input", input);
    if (e.target.value === "") {
      setOpen(false);
      setBooks([]);
      setInput("");
    }
  };

  let onLoadClick = () => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&projection=lite&maxResults=10&startIndex=${
        startIndex + 10
      }`
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Start Index", startIndex, "Calculated", startIndex + 10);

        setBooks([...books, ...response.items]);
      })
      .catch();

    setStartIndex(startIndex + 10);
  };

  let fetchBooks = () => {
    console.log("FetchBooks gate keeper contacted");
    if (input) {
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input}&projection=lite&maxResults=10`
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((response) => {
            setBooks(response.items);
          });
        } else alert("Status !== 200");
      });
    }
  };
  let setSearchBar = (e) => {};

  return (
    <div>
      <div className="searchBoxContainer">
        <div className="searchBoxDiv">
          <input
            className="searchField"
            value={input}
            placeholder="Enter Book Name...."
            onInput={() => setOpen(true)}
            // onBlur={() => setOpen(false)}
            onChange={handleChange}
          ></input>
          <Link
            to={`/search/${input.replace(/\s/g, "+")}`}
            className="searchLink"
          >
            <button
              key={input}
              disabled={input.length >= 3 ? false : true}
              className="searchButton"
            >
              Search
            </button>
          </Link>
        </div>

        {open && books !== undefined && (
          <div className="suggestionsBoxContainer">
            <div className="suggestionsBox">
              {books === undefined && books.length === 0 && (
                <div className="suggestion">Not Found</div>
              )}
              {books !== undefined &&
                books.map((book) => (
                  <div
                    className="suggestion"
                    key={book.id}
                    onClick={setSearchBar}
                    value={
                      book.volumeInfo !== undefined &&
                      book.volumeInfo.title !== undefined
                        ? book.volumeInfo.title
                        : "failed"
                    }
                  >
                    {book.volumeInfo !== undefined &&
                    book.volumeInfo.title !== undefined ? (
                      <Link className="routerLinks" to={`/details/${book.id}`}>
                        {book.volumeInfo.title}
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              {startIndex <= 40 && (
                <button className="loadMoreButton" onClick={onLoadClick}>
                  Load More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
