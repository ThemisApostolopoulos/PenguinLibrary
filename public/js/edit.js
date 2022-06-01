window.addEventListener('load', ()=>{
    const buttonEdit = document.getElementById("button-edit");
    const titleName = document.getElementById("titleAuth");
    const review = document.getElementById("review");
    var editTitleName ="";
    var editReview ="";

    console.log(buttonEdit);

    
    async function editBook(url,editData){
        const response = await fetch(url, {method: 'PUT',mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        // body:JSON.stringify({"titleAuth": "Drake",
        // "workid": "790"})
         body: JSON.stringify(editData)
    })    
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

    buttonEdit.addEventListener('click', ()=>{


        if(titleName.value!=""){
            //alert("title name has text")
            console.log(titleName.value);
            editTitleName = titleName.value;
            // const workid = document.getElementById("workid");
            // console.log(parseInt(workid.innerHTML));
            
        }
        if(review.value!=""){
            //alert("review has text");
            console.log(review.value);
            editReview = review.value;
        }

        const workid = document.getElementById("workid");
        let intworkid = parseInt(workid.innerHTML);
        const editData = {"titleAuth":editTitleName,"workid":intworkid,"review":editReview};
        const url = "http://localhost:5000/books/" + workid.innerHTML;
        console.log(url);
        console.log(editData);
        editBook(url,editData);
        //server side
        if(titleName.value!=null || review.value!=null){
            window.location.replace("http://localhost:5000/books");
        }

        //client side
        // if(titleName.value || review.value){
        //     window.location.replace("./favourites.html");
        // }
        
        
        // const workid = document.getElementById("workid").value
        // console.log(workid.value);
        // console.log(titleName.value);
        // console.log(review.value);
        // // const editData = {"titleAuth":titleName.value,"workid":"{{workid}}"}
        

        


    })
})