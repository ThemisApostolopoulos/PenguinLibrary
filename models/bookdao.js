let books = []

class Book{
    constructor(titleAuth,workid, review){
        this.titleAuth = titleAuth;
        this.workid = parseInt(workid);
        this.review = review
    }
}

init();
function init(){
    let dummy = create("Kanye west:Graduation", 650, "");
    let dummy2 = create("Tyler the creator: Flower boy", 550, "");
    books.push(dummy);
    books.push(dummy2);
}

function create(titleAuth, workid){
    return new Book(titleAuth, workid);
}

 

function findAllBooks(){
    return books;
}

function setBooks(updatedBooks){
    books=updatedBooks;
}

function setReview(review){
    this.review = review;
}

function setTitleName(titleName){
    this.titleAuth = titleName;
}

module.exports = {
    "create" : create,
    "findAllBooks": findAllBooks,
    "setBooks": setBooks,
    "setReview": setReview,
    "setTitleName": setTitleName
};