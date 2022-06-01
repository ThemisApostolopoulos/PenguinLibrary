var templates = {};
//let resultsDetailsScript = document.getElementById("results-template");
// templates.bookResults = Handlebars.compile(`
// <section>
//     <ul>
//     {{#each text}}
//         <li>{{name}}</li>
//         <li>{{surname}}</li>
//     {{/each}}
//     </ul>
// </section>`);
window.onload = function(){

        var text = '{ "employees" : [' +
        '{ "name":"John" , "surname":"Doe" },' +
        '{ "name":"Anna" , "surname":"Smith" },' +
        '{ "name":"Peter" , "surname":"Jones" } ]}';

        var obj = JSON.parse(text)
        console.log("this is the test");
        console.log(obj);
        console.log(obj.employees);
        // var rawTemplate = document.getElementById("results-template").innerHTML;
        // var compiledTemplate = Handlebars.compile(rawTemplate);
        // var generatedHtml = compiledTemplate(obj);
        // var div = document.getElementById("contents");
        // div.innerHTML = generatedHtml;
        



        //var text = {"name":"John", "surname":"Doe"}
        // console.log(text);
        // var obj = JSON.parse(text);
        // console.log(obj);
        // let content = templates.bookResults(text);
        // console.log(content);
        // let div = document.getElementById("contents");
        // div.innerHTML = content;
    
    let button = document.getElementById("button"); //the search button
    var title;//variable for book's title 
    var searchAuthor; //variable to save the author name the user will search for

    //event listener for the search button:fetch the data from the correct url
    button.addEventListener("click",()=>{
        
        //get the value from the search field
        searchAuthor = document.getElementById("first_name").value;
        title = document.getElementById("book_title").value;
        console.log(searchAuthor);
        console.log(title);
        var urlWorks = "https://reststop.randomhouse.com/resources/works?search=";
        var urlAuthor = "https://reststop.randomhouse.com/resources/authors?lastName=";
        var urlId = "https://reststop.randomhouse.com/resources/works/"

        
       
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
            console.log(data.work);
            var rawTemplate = document.getElementById("results-template").innerHTML;
            var compiledTemplate = Handlebars.compile(rawTemplate);
            var generatedHtml = compiledTemplate(data);
            var div = document.getElementById("contents");
            div.innerHTML = generatedHtml;
            console.log(div.innerHTML);

            // for(let i in data.work){
            //     console.log(data.work[i].titleAuth);
                
            // }
        }).catch(error => {
        error.message; // "An error has occurred: 404"
        });
    }


    //show the books from the authors whose last name is "searchAuthor" for example brown
    if(searchAuthor){
        //take the correct url
        urlAuthor = urlAuthor + searchAuthor;
        fetchData(urlAuthor);
        //from the return data get the authors
        fetchData(urlAuthor).then(data =>{
          
            //for every author
            for(let i in data.author){
                let author = data.author[i]
                //console.log("Author: " + author.authorid + " " + author.authorlastfirst);
                
                //for every work of the author[i]
                for(let y in author.works){
                    let workDetails = author.works[y];
                    //check if the author[i] has an array of works
                    if(Array.isArray(workDetails)){
                      for(let x in workDetails){
                        //take the correct url
                        let urlBookId = urlId + workDetails[x] + "/";
                        //call the async function
                        fetchData(urlBookId)
                        //get the results
                        fetchData(urlBookId).then(data =>{
                            console.log(data.titleAuth);
                        }).catch(error =>{
                            error.message;
                        })
                      }
                    }
                    else{
                        let urlBookId = urlId + workDetails + "/" 
                         fetchData(urlBookId)
                        //get the results
                        fetchData(urlBookId).then(data =>{
                            console.log(data.titleAuth);
                        }).catch(error =>{
                            error.message;
                        })
                      
                    }
                  }
            }
            
        }).catch(error => {
        error.message; // "An error has occurred: 404"
        });
    }  
      

   

    

    })
   
}