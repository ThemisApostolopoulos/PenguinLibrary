const express = require('express');
const path = require('path');
const app = express();
const books = require('./models/bookdao');
var cors = require('cors');
app.use(cors());

app.use(express.json());




var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: false }));


//server side 
//get request:returns all favourite books
app.get('/books', (req,res)=>{
        // res.json(books2.findAllBooks());
        // console.log(books2.findAllBooks());
        let books2 = books.findAllBooks();
        res.render('books', {
            books: books2
    })
        // res.json({
        //     books: books2
        // })
})


//client side(eixe ginei kai efarmogi client side paragogi handlebars.opou deite comments einai client einai gia auto)
// app.get('/books', (req,res)=>{
//     // res.json(books2.findAllBooks());
//     // console.log(books2.findAllBooks());
//     let books2 = books.findAllBooks();
//     res.json({books:books.findAllBooks()})
//     // res.json({
//     //     books: books2
//     // })

// })


app.get('/books/:titleAuth/:id', (req,res)=>{
    console.log("hello from edit server");
    res.render('editBook',{
        workid: req.params.id,
        titleAuth: req.params.titleAuth
    })
})



//post requst:post(in simpler words add) a new book in the favourite books
app.post('/books', (req,res)=>{
    
    //create the new book
    const newBook ={ 
        titleAuth: req.body.titleAuth,
        workid: parseInt(req.body.workid),
        review: ""
    }
    
    console.log(newBook);
    


    //get all the books that already exist in the saved books category
    let booksList = books.findAllBooks();
    //initialize boolean found as false.if it is false that means the book we try to add doesnt exist in the saved books.
    var found = false;
    booksList.forEach(book => {
        console.log(book.workid);
        //check if the book is already saved in the saved books list
        if(newBook.workid === parseInt(book.workid)){
            //make boolean found = true
            found = true;
            console.log("you already have this book saved!")
            //return the status that will trigger an alert to be thrown at the user
            return res.status(400).json( {msg: 'Book already saved'});


        }
        
    });
    if(!found){
    console.log("added" + newBook.workid);
    booksList.push(newBook);
    res.json(booksList);
    }
    // console.log("added" + newBook.workid);
    // booksList.push(newBook);
    // res.json(booksList);

})

app.get('/books/search=:input', (req,res)=>{
    //search if a string is included in a book's title or author
    //returns all the books with this property
    console.log('searching for: ' + req.params.input);
    searchResult = [];
    
    books.findAllBooks().forEach(book => {
        //if the title matches, push the book to the array list of books that will be shown to the user
        if(book.titleAuth.includes(req.params.input)){
            searchResult.push(book)
        }

    })


    console.log(searchResult.length);

    //if any book is found, return the search result
    if(searchResult.length>0){
        res.render('books', {
            books:searchResult
        })

      


    //else return the original list of saved books
    }else{
        res.render('books', {
            books:books.findAllBooks()
        })
       
    }

})

//delete server side
app.delete('/books/:id', (req,res)=>{
    console.log("delete " + req.params.id);
    //see if the book you want to delete exists in the favourite books list
    const found = books.findAllBooks().some(book => book.workid === parseInt(req.params.id));

    // console.log(books.findAllBooks()[0].workid ===  parseInt(req.params.id));
    // console.log(req.params.workid);
    console.log(found);
    // console.log(books.findAllBooks()[0].workid);

    //if it exists, delete it
    if(found){
        var updatedBooks = books.findAllBooks().filter(book =>book.workid !== parseInt(req.params.id));
        //set the new book list without the book ther user deleted
        books.setBooks(updatedBooks);
        console.log(books.findAllBooks());
        res.json({ 
            msg:"Book deleted"
        });

        // res.json({
        //     books: books.findAllBooks()
        // })
    }else{
        return res.status(404).json( {msg: 'Book not found'});
    }  
})



//delete client
// app.delete('/books/:id', (req,res)=>{
//     console.log("delete " + req.params.id);
//     //see if the book you want to delete exists in the favourite books list
//     const found = books.findAllBooks().some(book => book.workid === parseInt(req.params.id));

//     // console.log(books.findAllBooks()[0].workid ===  parseInt(req.params.id));
//     // console.log(req.params.workid);
//     console.log(found);
//     // console.log(books.findAllBooks()[0].workid);

//     //if it exists, delete it
//     if(found){
//         var updatedBooks = books.findAllBooks().filter(book =>book.workid !== parseInt(req.params.id));
//         //set the new book list without the book ther user deleted
//         books.setBooks(updatedBooks);
//         console.log(books.findAllBooks());
//         res.json({ 
//             msg:"Book deleted"
//         });

//         // res.json({
//         //     books: books.findAllBooks()
//         // })
//     }else{
//         return res.status(404).json( {msg: 'Book not found'});
//     }  
// })



//update book
app.put('/books/:id', (req, res) => {
    const found = books.findAllBooks().some(book => book.workid === parseInt(req.params.id));
    //see if the book exists 
    if (found) {
      books.findAllBooks().forEach((book) => {
        if (book.workid ===parseInt(req.params.id)){
            //new fields of the book
            const updatedReview = String(req.body.review);
            const updatedTitleName =  String(req.body.titleAuth);
            console.log(book);
            console.log(updatedReview);
            console.log(updatedTitleName);
          
            if(updatedReview){
                book.review = updatedReview;
            }
            if(updatedTitleName){
                // book.setTitleName(updatedTitleName);

                book.titleAuth = updatedTitleName;
                
            }

            //thats the updated book
            
            const updBook ={
                titleAuth: updatedTitleName,
                workid: parseInt(req.params.id),
                review: updatedReview
            }
          res.json({ msg: 'Book updated', updBook });
        }
      });
    } else {
      res.status(400).json({ msg: `No book with the id of ${req.params.id}` });
    }

  });


const port = 5000;



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//books API routes
//app.use('/api/books', require('./routes/api/books'));

app.listen(port); 
