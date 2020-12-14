import React, { Component, useEffect, useState } from "react";
import "./Detail.css";

const Detail = ({ match }) => {
  const [book, setBook] = useState([]);
  const [id, setId] = useState(match.params.id);
  console.warn("Constructor Called", match.params.id);
  useEffect(() => {
    fetchItem(match);
  }, []);

  let fetchItem = async (match) => {
    console.warn("Fetch Called", match);
    let id = match.params.id;
    console.log("(D", id);
    await fetch(`https://www.googleapis.com/books/v1/volumes/` + id).then(
      (response) => {
        response.json().then((neoResponse) => {
          console.log(neoResponse, "Hello");

          setBook(neoResponse);

          console.log("Hello", book);
          return neoResponse;
        });
      }
    );
  };

  console.warn("Render Called");
  return (
    <div className="detailsContainer">
      {book !== undefined && book.volumeInfo !== undefined ? (
        <div className="contentMain">
          <img
            className="bookImage"
            src={
              book.volumeInfo !== undefined &&
              book.volumeInfo.imageLinks !== undefined
                ? book.volumeInfo.imageLinks.small
                : "The Image could not be loaded"
            }
          ></img>
          <div>
            {book.volumeInfo !== undefined ? (
              <h2 className="bookName">{book.volumeInfo.title}</h2>
            ) : (
              ""
            )}
            {book.volumeInfo.authors !== undefined && (
              <p className="authors">
                {book.volumeInfo.authors.map((author) => (
                  <p>{author}</p>
                ))}
              </p>
            )}
            <hr className="divider"></hr>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html:
                  book.volumeInfo !== undefined
                    ? book.volumeInfo.description
                    : "",
              }}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
