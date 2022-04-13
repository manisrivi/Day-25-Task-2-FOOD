let divtag = document.createElement("div");
divtag.innerHTML = `
<div class="container-fluid">
<div class="row">
    <div class="col nav">
        <nav class="navbar navbar-light fixed-top bg-dark">
            <div class="container-fluid">
              <h1>Search Your Favorite Food Recipe!!!</h1>
              <div class="d-flex">
                <input class="form-control me-2" type="search" id="text" placeholder="Eg: chicken, fish, prawn, egg" aria-label="Search">
                <button class="btn btn-outline-success" onclick="food()" type="submit">Search</button>
              </div>
            </div>
          </nav>
    </div>
</div>
</div>
`
document.body.append(divtag);

function food() {
  let link1 = document.getElementById("text").value;
  let res = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${link1}`);
  res.then((data) => data.json())
    .then((data) => data.meals)
    .then(function (countrydata) {

      // Element tag create function
      function foo(ele, cname) {
        let div = document.createElement(ele);
        div.className = cname;
        return div;
      }
      // container 
      let container = foo("div", "container");
      document.body.append(container);

      // row
      let row = foo("div", "row m-3");
      container.append(row);

      // Cards display 
      countrydata.forEach(function (ele) {
        let col = foo("div", "col-lg-3 col-sm-12 col-md-6")
        col.innerHTML = `<div class="card  bg-transparent zoom m-2 text-center" style="width: 18rem;">
            <img src="${ele.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5>${ele.strMeal}</h5>
              <a href="${ele.strYoutube}" class="btn btn-primary">Watch Video</a>
            </div>
          </div>`
        row.append(col)
      })
    })
    .catch((error) => console.log(error));

}