import "./App.css";
import { useState } from "react";
import Shelf from './Shelf';
import React, { useEffect } from 'react';
import { search,update,get } from './BooksAPI';



function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const [boofromapi, setboofromapi] = useState([]);
  const [name, setName] = useState("to");
  const [error, seterror] = useState("to");



  useEffect(() => {
    async function f() {
      try {
        const response = await search(name, 11)
        // console.log(response);
        setboofromapi(response)
      } catch (err) {
        seterror(err)
      }
    }
    f()
    
  }, [name]);
  
  console.log(name);

  // console.log(search("Ender's",11));




  









  return (
    <div className="app">

      {showSearchPage ?
       (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => setShowSearchpage(!showSearchPage)}>Close</a>

            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title, author, or ISBN" />
              <input type="text" value={name}onChange={(e) => setName(e.target.value)}/>
           
            </div>
          </div>
          <div className="search-books-results">
             <h1>dddd</h1>
           
                <div className="bookshelf-books">
                <ol className="books-grid">

                  {boofromapi.map((item) => {
              return (
                <li key={item.id} >

                    <div  className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                              `url(${item.imageLinks.smallThumbnail}`,
                           }}
                        ></div>
                        <div className="book-shelf-changer">
                          <select>
                            <option value="none" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{item.title}</div>
                      <div className="book-authors">{item.authors}</div>
                    </div>
                  </li>

               )

})}



                  
                </ol>
              </div>


                


            <ol className="books-grid"></ol>
          </div>
        </div>




      ) :







        (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

                <Shelf title="currentlyReading" />
                <Shelf title="wantToRead" />
                <Shelf title="read" />






              </div>
            </div>
            <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
