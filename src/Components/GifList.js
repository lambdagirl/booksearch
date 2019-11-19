import React from 'react';
import Gif from './Gif';

const GifList = props => {

  const results = props.data;
  let books = results.map(book =>
    <Gif
      url={
      book.volumeInfo.imageLinks === undefined
        ? ""
        : `${book.volumeInfo.imageLinks.thumbnail}`
      }
      title={book.volumeInfo.title}
      authors={book.volumeInfo.authors}
      link={book.volumeInfo.infoLink}
      key={book.id} />
  );

  return(

    <ul className="gif-list">
      {books}
    </ul>
  );
}

export default GifList;
