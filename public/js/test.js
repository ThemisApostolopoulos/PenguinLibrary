var templates = {};





window.onload = function(){

       
    
    let button = document.getElementById("button"); //the search button
    var title;//variable for book's title 
    var searchAuthor; //variable to save the author name the user will search for

   

     //post to api(add a new favourite book)
     async function postRequest(url , dataSave){
        const response = await fetch(url, {method: 'POST',mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body:JSON.stringify({"titleAuth": "Drake",
        // "workid": "790"})
         body: JSON.stringify(dataSave)
    })

    //console.log(dataSave);
    //console.log(JSON.stringify(dataSave));
    
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        //alert the user that the book is already saved
        alert("book already saved!");
        throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
    return data;

    }

    //make a delete request
    async function deleteRequest(url){
        const response = await fetch(url, {method: 'DELETE',mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body:JSON.stringify({"titleAuth": "Drake",
        // "workid": "790"})
        //  body: JSON.stringify(dataSave)
    })

    //console.log(dataSave);
    //console.log(JSON.stringify(dataSave));
    
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        //alert the user that the book is already saved
        alert("book isnt saved!");
        throw new Error(message);
    }
    const data = await response.json();
    console.log(data);
    return data;

    }

    //search button listener
    button.addEventListener("click",()=>{
        
        //get the value from the search field
        searchAuthor = document.getElementById("first_name").value;
        title = document.getElementById("book_title").value;
        //clear the input fields
        document.getElementById("first_name").value = "";
        document.getElementById("book_title").value = "";
        console.log(searchAuthor);
        console.log(title);
        var urlWorks = "https://reststop.randomhouse.com/resources/works?search=";
       // var urlAuthor = "https://reststop.randomhouse.com/resources/authors?lastName=";
        //var urlId = "https://reststop.randomhouse.com/resources/works/"

        
       
        async function fetchData(url){

        //call the fetch API (init object as the 2nd param has the request method as GET, put in the headers the accept json param.)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        //check if the response status is ok(ok means the number is "around" 200)
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        // console.log(data);
        return data;

    }

   

        

    
      //correct url depending on the type of search

      //show the results from the title search
      if(title){
        urlWorks = urlWorks + title;
        fetchData(urlWorks);
        //from the returned data get the authors
        fetchData(urlWorks).then(data =>{
            console.log(data);
            //console.log(data.work);
            var rawTemplate = document.getElementById("results-template").innerHTML;
            var compiledTemplate = Handlebars.compile(rawTemplate);
            var generatedHtml = compiledTemplate(data);
            var div = document.getElementById("contents");
            div.innerHTML = generatedHtml;
           
            buttonListener().catch(error => {
                alert("error");
                error.message;
            })
        }).catch(error => {
        error.message; // "An error has occurred: 404"
        });
    }


    if(searchAuthor){
        urlWorks = urlWorks + searchAuthor;
        fetchData(urlWorks);
        //from the returned data get the authors
        fetchData(urlWorks).then(data =>{
            console.log(data);
            //console.log(data.work);
            var rawTemplate = document.getElementById("results-template").innerHTML;
            var compiledTemplate = Handlebars.compile(rawTemplate);
            var generatedHtml = compiledTemplate(data);
            var div = document.getElementById("contents");
            div.innerHTML = generatedHtml;
            buttonListener().catch(error => {
                alert("error");
                error.message;
            })
           
        }).catch(error => {
        error.message; // "An error has occurred: 404"
        });
    }


    //tried to fetch from an other url didnt have the time to make it work :(
    // show the books from the authors whose last name is "searchAuthor" for example brown
    // if(searchAuthor){
    //     //take the correct url
    //     var dataTemplate = {books: []};
    //     urlAuthor = urlAuthor + searchAuthor;
    //     fetchData(urlAuthor);
    //     //from the return data get the authors
    //     fetchData(urlAuthor).then(data =>{
          
    //         //for every author
    //         for(let i in data.author){
    //             let author = data.author[i]
    //             //console.log("Author: " + author.authorid + " " + author.authorlastfirst);
                
    //             //for every work of the author[i]
    //             for(let y in author.works){
    //                 let workDetails = author.works[y];
    //                 //check if the author[i] has an array of works
    //                 if(Array.isArray(workDetails)){
    //                   for(let x in workDetails){
    //                     //take the correct url
    //                     let urlBookId = urlId + workDetails[x] + "/";
    //                     //call the async function
    //                     fetchData(urlBookId)
    //                     //get the results
    //                     fetchData(urlBookId).then(data =>{
    //                         // console.log(data);
    //                         // console.log(data.titleAuth);
    //                         console.log(data.workid);
    //                         dataTemplate.push({"titleAuth": data.titleAuth,"workid": data.workid});
    //                         // console.log(dataTemplate);
    //                         // var rawTemplate = document.getElementById("results-template").innerHTML;
    //                         // var compiledTemplate = Handlebars.compile(rawTemplate);
    //                         // var generatedHtml = compiledTemplate(dataTemplate[i]);
    //                         // var div = document.getElementById("contents");
    //                         // div.innerHTML = generatedHtml;
    //                     }).catch(error =>{
    //                         error.message;
    //                     })
    //                   }
    //                 }
    //                 else{
    //                     let urlBookId = urlId + workDetails + "/" 
    //                      fetchData(urlBookId)
    //                     //get the results
    //                     fetchData(urlBookId).then(data =>{
    //                         console.log(data.workid);
    //                         dataTemplate.push({"titleAuth": data.titleAuth,"workid": data.workid});
    //                         // var rawTemplate = document.getElementById("results-template").innerHTML;
    //                         // var compiledTemplate = Handlebars.compile(rawTemplate);
    //                         // var generatedHtml = compiledTemplate(dataTemplate[i]);
    //                         // var div = document.getElementById("contents");
    //                         // div.innerHTML = generatedHtml;
    //                     }).catch(error =>{
    //                         error.message;
    //                     })
                      
    //                 }
    //               }
                  
    //         }

            

    //         // var rawTemplate = document.getElementById("results-template").innerHTML;
    //         // var compiledTemplate = Handlebars.compile(rawTemplate);
    //         // var generatedHtml = compiledTemplate(dataTemplate);
    //         // var div = document.getElementById("contents");
    //         // // div.innerHTML = generatedHtml;
    //         // for(i=0; i<dataTemplate.length; i++){
    //         //     console.log(dataTemplate);
    //         //     var rawTemplate = document.getElementById("results-template").innerHTML;
    //         //     var compiledTemplate = Handlebars.compile(rawTemplate);
    //         //     var generatedHtml = compiledTemplate(dataTemplate[i]);
    //         //     var div = document.getElementById("contents");
    //         //     div.innerHTML = generatedHtml;
    //         // }

            
    //     }).catch(error => {
    //     error.message; // "An error has occurred: 404"
    //     });
    //     for(i=0; i<dataTemplate.length; i++){
    //         var rawTemplate = document.getElementById("results-template").innerHTML;
    //         var compiledTemplate = Handlebars.compile(rawTemplate);
    //         var generatedHtml = compiledTemplate(dataTemplate[i]);
    //         var div = document.getElementById("contents");
    //         div.innerHTML = generatedHtml;
    //     }
    // }  
      
    
   

    

    })

  
    //butoon listeners for the save and delete buttons
    function buttonListener(){
        let buttonsDelete = document.getElementsByClassName("delete-button");
        let buttonsSave = document.getElementsByClassName("save-button");
        //console.log(buttons);
        for(let i =0; i<buttonsDelete.length; i++){
            buttonsDelete[i].addEventListener("click", ()=>{
            // console.log(buttons[i].id);
            //buttons[i].disabled = true;
            let x = document.getElementById(buttonsDelete[i].id);
            //let dataSave = JSON.parse(x.value);
            // console.log(x);
            console.log(x.id);
            console.log(x.value);
            //postRequest("http://localhost:5000/books", JSON.parse(x.value));
            let urlDelete = "http://localhost:5000/books/"+String(x.id);
            //console.log(ulrDelete);
            deleteRequest(urlDelete);


        })
    }
    for(let y=0; y<buttonsSave.length; y++){
        buttonsSave[y].addEventListener("click", ()=>{
            // console.log(buttons[i].id);
            //buttons[i].disabled = true;
            let x = document.getElementById(buttonsSave[y].id);
            //let dataSave = JSON.parse(x.value);
            // console.log(x);
           //console.log(x.id);
            //console.log(x.value);
            //postRequest("http://localhost:5000/books", JSON.parse(x.value));
            postRequest("http://localhost:5000/books", JSON.parse(x.value));


        })
    }

    }



   
}