import React from 'react';

const Gif = props => (
  <li className="gif-wrap">
    <a href={props.link}><img src={props.url} alt=""/></a>
    {props.title}
    <p>Author: {props.authors}</p>
  </li>
);

export default Gif;
