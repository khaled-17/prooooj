import React,{useEffect} from 'react';
import {get,getAll,update} from './BooksAPI';
import { useState } from 'react';

const Shelf = (props) => {


 const [boofromapi, setboofromapi] = useState([]);
useEffect(() => {
    async function f() {
        try {
            const response = await getAll()
            // console.log(response);
            setboofromapi(response)
        } catch(err) {
          // catches errors both in fetch and response.json
          console.log(err);
        }
       }
      f() 
}, [ ]);

    //  console.log("all my books");
    // console.log(boofromapi);




    const [selected, setSelected] = useState('');
    const handleChange = event => {
      console.log(event.target.value);
      setSelected(event.target.value);
    };



    const [bookOJECT, setbookOJECT] = useState("");
    const [id, setid] = useState("");
    const [select, setselect] = useState("");
  
    useEffect(() => {
      async function shangeShelf(book,shelf) {
          try {
              const response = await update(book,shelf)
              console.log(response);
           } catch(err) {
             console.log(err);
            
          }
         }
        shangeShelf(bookOJECT,"currentlyReading") 
                        // shangeShelf()
    }, [ ]);
  


    console.log(id);
    console.log(bookOJECT);


    useEffect(() => {
      async function getbyid(_id) {
          try {
              const response = await get(_id)
              console.log(response);
              setbookOJECT(response)  
           } catch(err) {
             console.log(err);
          }
         }
         getbyid(id)
    }, [ ]);
  
  
 


    











     return (
              <div className="bookshelf">
                <h2 className="bookshelf-title"> {props.title} </h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {boofromapi.map((item) => {
              return (
 
                <li key={item.id}  >
                  {item.shelf==props.title?(
                    <div  className="book" onChange={(evt) => setid(item.id)}>
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
                        <select  value={item.shelf}  onChange={(evt) => setselect(evt.target.value)}> 
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{item.title}</div>
                    <div className="book-authors">{item.authors}</div>
                  </div>
                  ):(
                    <div>
                      
                    </div>
                  )}
                    
                  </li>

               )

})}


                     
                  </ol>
                </div>
              </div>
     );
}

export default Shelf;
