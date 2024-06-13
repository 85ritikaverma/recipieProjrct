const express = require('express');
const url = require('url');
// Express.js (express javascript starts.....)
// link with {}recipes.json file

const fs = require('fs');
const data = fs.readFileSync("./recipes.json", "utf8");
const dataobj = JSON.parse(data).recipes;//yha object bna liya and data ko object me convert kar liya Parse ki help se

const resTemplate = `
<html >
<head>
<style>

.navbar {
    background-color:  #897b7b;
    overflow: hidden;
    padding:10px;
    margin:10px;
    position: fixed; 
    width: 20%; 
    top: 0; 
   border-radius:12px ;
}

.navbar a {
    float: left;
    display: auto;
    color: white;
    text-align: center;
    padding:30px;
    text-decoration: none;
    font-size:1.4rem;

}

.navbar a:hover {
    background-color: #ddd;
    color: black;
}

.menu-card{
    transition-property: width;
    transition-duration: 2s;
    transition-timing-function: ease-in-out;
    transition:width 2s ;

    width:780px;
    height:200px;
    margin:auto ;
    text-align: center;
   // align-items: center;
    border: 3px solid brown;
    border-radius:12px;
    justify-content:center;
    background-color: rgb(247, 237, 223);
    padding:20px;
    display:flex;
    font-size: 1.2rem;
    overflow: hidden;

}

p{
    text-align: left;
    
}
h3{
    text-align: left;
    display:flex;
    align-items: center;
    padding:4px;
}
img{

    align-items:right;
    width:300px;
    height:280px;
    border-radius:35px ;
    border:1.5px solid black;

}
.p2 {
    

//   transition-property: width;
//     transition-duration: 2s;
    // transition-timing-function: linear; 
    // transition-timing-function: ease-in-out;
    // background-color: rgb(240, 211, 138);
    // transition:width 2s ;
    width: 780px;
    height: 300px;
    font-size: 20px;
    // display: inline;
   
}


@media(800px <= width <=1700px){
    .menu-card{
        background-color: rgb(247, 237, 223);
    }
    // .p2{
    //     background-color: rgb(247, 237, 223);
    // }
    
}
.menu-card:hover{
    background-color:rgb(247, 237, 223);
  
    width:900px;
    height:400px;

}




// .p2:hover {
//     display: inline;
//    background-color:rgb(244, 229, 153);
//     width:400px;
// }






</style>
</head>
<body>
<div class="navbar">
     <a href="#home">Search</a> 
    
    <!--<input type="text" id="fname" name="fname" style="color:black; align-items:center;"><br> -->
    <!--<input type="submit" value="Submit" style=" align-items: center;"> -->
    <input type="text" id="searchInput" placeholder="Search..." style="color:black; align-items:center;">
    <button onclick="searchItems()">Search</button>
    
</div>

<div class='menu-card'>
<h3>-title-</h3>
<p style="font-size:1.4rem;"><u><b>Ingredents:-</b></u><br>_INGREDIENTS_</p>
<p class="p2"><u><b>Instructions:-</b></u><br><span >_INSTRUCTION_</span></p> 

<!--<p class="p2">
<u><b>Instructions:-</b></u>
_INSTRUCTION_
</p> -->


<h5 style=" text-align: end;">_TAGS_</h5>
<img src="_IMAGE_" alt="dish-image">
</div>


</body>
</html>
`;

    function searchItems() {
        const query = document.getElementById('searchInput').value;
        // Send the query to the server using AJAX (or fetch)
        fetch(`/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                
                console.log(data); 
            })
            .catch(error => console.error('Error:', error));
    };
   
    


let result = [];
for (let i = 0; i < dataobj.length; i++) {
    let menu = resTemplate;
    menu = menu.replace("-title-", dataobj[i].name);
    menu = menu.replace("_INGREDIENTS_", dataobj[i].ingredients);
    menu = menu.replace("_IMAGE_", dataobj[i].image);
    menu = menu.replace("_INSTRUCTION_", dataobj[i].instructions);
    menu = menu.replace("_TAGS_", dataobj[i].cuisine);
    result.push(menu); //yha result ek array ki form me h thats why we push to insert an element.
    // console.log(menu);
}
result = result.join(' ');

const app = express();


app.get('/home', (req, res) => {
    const path = url.parse(req.url, true);
    const pathName = path.pathname;

    if (pathName !== '/home') {
        res.status(404).send('404...not found');
        return;
    }

    res.send(result);
});
app.get('/search', (req, res) => {
    const query = req.query.query;
   
    const searchResults = dataobj.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    res.json(searchResults);
});

app.listen(8000, () => {
    console.log(".......server start----------");
})