import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
//https://type.fit/api/quotes
function ShowQuotes() {
  const [data, setData] = useState(
    "If you can't explain it simply, you don't understand it well enough."
  );

  useEffect(() => {
    axios
      .get('https://api.quotable.io/random?tags=technology,famous-quotes')
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp"
        alt="Bulb"
        width="100"
      />
      <p>
        <i class="fa-solid fa-quote-left"></i>
        {data.content}
        <i class="fa-solid fa-quote-right"></i>
      </p>
    </>
  );
}

export default ShowQuotes;
