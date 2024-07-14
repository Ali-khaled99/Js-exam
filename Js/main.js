let myData =document.getElementById("myData")
let searchContainer = document.getElementById("searchContainer")

$(document).ready(()=>{
    searchByName("s").then(()=>{
        $('.loadingScreen').fadeOut(500)
        $('body').css('overflow', 'visible')
    })
})

let outerWidth = -$('.wrapper').outerWidth();
function openSideNav() {
    $('.sideNav').animate({
        left: 0
    }, 500)

    $('.menu .bars').removeClass('fa-bars')
    $('.menu .bars').addClass('fa-xmark')

    for (let i = 0; i < 5; i++) {
        $('.sideNav .nav a').eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    $('.sideNav').animate({
        left: outerWidth
    }, 500)

    $('.menu .bars').removeClass('fa-xmark')
    $('.menu .bars').addClass('fa-bars')

    $('.sideNav .nav a').animate({
        top: 300
    }, 500)
}

closeSideNav()

$('.menu .bars').on('click', function () {
    if ($('.sideNav').css('left') === '0px') {
        closeSideNav()
    } else {
        openSideNav()
    }
})


function displayMeals(list){
    $(".inner-loading-screen").hide()
    let temp = ""

    for(let i =0 ;i< list.length;i++){
        temp += `
        <div class="col-md-3 mb-4 text-white">
                <div onclick="getMealDetails('${list[i].idMeal}')" class="category position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${list[i].strMealThumb}" alt="" srcset="">
                    <div class="layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${list[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
        myData.innerHTML = temp;
    }
}

async function getCategories() {
    $(".inner-loading-screen").hide()
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display', 'flex')
    $(".inner-loading-screen").fadeIn(700)
    
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
    $(".inner-loading-screen").css('display', 'none')
    $(".inner-loading-screen").fadeOut(700)
    

}

function displayCategories(list) {
    $(".inner-loading-screen").hide()
    let temp = "";

    for (let i = 0; i < list.length; i++) {
        temp += `
        <div class="col-md-3 mt-4">
                <div onclick="getCategoryMeals('${list[i].strCategory}')" class="category  position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${list[i].strCategoryThumb}" alt="" srcset="">
                    <div class="layer position-absolute text-black text-center p-3">
                        <h3>${list[i].strCategory}</h3>
                        <p>${list[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    myData.innerHTML = temp
}

async function getArea() {
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    
    displayArea(respone.meals)
    $(".inner-loading-screen").css('display','none')
    $(".inner-loading-screen").fadeOut(700)

}

function displayArea(list) {
    $(".inner-loading-screen").hide()
    let temp = "";

    for (let i = 0; i < list.length; i++) {
        temp += `
        <div class="col-md-3 text-white mb-3">
                <div onclick="getAreaMeals('${list[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-6x"></i>
                        <h3 class="pb-3">${list[i].strArea}</h3>
                </div>
        </div>
        `
    }

    myData.innerHTML = temp
}

async function getIngredients() {
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()

   displayIngredients(respone.meals.slice(0, 20))
   $(".inner-loading-screen").css('display','none')
   $(".inner-loading-screen").fadeOut(700)

}

function displayIngredients(list) {
    $(".inner-loading-screen").hide()
    let temp = "";

    for (let i = 0; i < list.length; i++) {
        temp += `
        <div class="col-md-3 text-white">
                <div onclick="getIngredientsMeals('${list[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-6x mb-3"></i>
                        <h3>${list[i].strIngredient}</h3>
                        <p>${list[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    myData.innerHTML = temp
}

async function getCategoryMeals(category){
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()

    displayMeals(response.meals.slice(0,20))
    $(".inner-loading-screen").css('display','none')
    $(".inner-loading-screen").fadeOut(700)

}

async function getAreaMeals(area) {
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").css('display','none')
    $(".inner-loading-screen").fadeOut(700)

}


async function getIngredientsMeals(ingredients) {
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").css('display','none')
    $(".inner-loading-screen").fadeOut(700)

}

async function getMealDetails(mealID) {
    closeSideNav()
    myData.innerHTML = ""
    $(".inner-loading-screen").css('display','flex')
    $(".inner-loading-screen").fadeIn(700)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").css('display','none')
    $(".inner-loading-screen").fadeOut(700)

}


function displayMealDetails(meal) {
    
    $(".inner-loading-screen").hide()
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 0; i < 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<span class="alert alert-info m-2 p-2">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags){
        tags = []
    } 

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <span class="alert alert-danger m-2 p-1">${tags[i]}</span>`
    }



    let temp = `
    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="mt-3">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <div class="d-flex g-3 flex-wrap">
                    ${ingredients}
                </div>

                <h3>Tags :</h3>
                <div class="d-flex g-3 flex-wrap">
                    ${tagsStr}
                </div>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success mt-2">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mt-2">Youtube</a>
            </div>`

    myData.innerHTML = temp
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div  class="row py-4">

        <div class="col-md-6 search ">
            <input onkeyup="searchByName(this.value)" class="form-control py-2 px-3 mx-3 bg-black text-white" placeholder="Search By Name" type="text">
            </div>

        <div class="col-md-6 search ">
            <input onkeyup="searchByFirstLetter(this.value)" class="form-control py-2 px-3 bg-black text-white" placeholder="Search By First Letter" maxlength="1" type="text">    
        </div>
    </div>`

    myData.innerHTML = ""
}


async function searchByName(meal){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
}

async function searchByFirstLetter(letter){
    letter == "" ? "a" :""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
    response = await response.json() 

    response.meals ? displayMeals(response.meals) : displayMeals([])
}

function showContacts(){
    myData.innerHTML = `
    <div class="container w-75 text-center">
                    <div class="row g-4">
                        <div class="col-12 col-md-6 p-3">
                            <input onkeyup="inputsValidation()" id="nameInput" class="form-control p-3" placeholder="Enter Your Name" type="text">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed
                            </div>
                        </div>
                        <div class="col-12 col-md-6 p-3">
                            <input onkeyup="inputsValidation()" id="emailInput" class="form-control p-3" placeholder="Enter Your Email" type="email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid "example@yyy.zzz"
                            </div>
                        </div>
                        <div class="col-12 col-md-6 p-3">
                            <input id="phoneInput" onkeyup="inputsValidation()" class="form-control p-3" placeholder="Enter Your Phone" type="number">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid phone Number
                            </div>
                        </div>
                        <div class="col-12 col-md-6 p-3">
                            <input id="ageInput" onkeyup="inputsValidation()" class="form-control p-3" placeholder="Enter Your Age" type="number">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>                            
                        </div>
                        <div class="col-12 col-md-6 p-3">
                            <input onkeyup="inputsValidation()" id="passwordInput" class="form-control p-3" placeholder="Enter Your Password" type="password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum 8 characters, at least one letter and one number*
                            </div>
                        </div>
                        <div class="col-12 col-md-6 p-3">
                            <input onkeyup="inputsValidation()" id="repasswordInput" class="form-control p-3" placeholder="Repassword" type="password">
                            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                passwords does not match
                            </div>
                        </div>
                    </div>
                    <button disabled id="submit-btn" class="btn btn-outline-danger py-2 mt-3">Submit</button>

                </div>
    `
}

function inputsValidation(){
    if (nameValidation()) {
        document.getElementById('nameAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
    }

    if (emailValidation()) {
        document.getElementById('emailAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('emailAlert').classList.replace('d-none', 'd-block')
    }

    if (phoneValidation()) {
        document.getElementById('phoneAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('phoneAlert').classList.replace('d-none', 'd-block')
    }

    if (ageValidation()) {
        document.getElementById('ageAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('ageAlert').classList.replace('d-none', 'd-block')
    }

    if (passwordValidation()) {
        document.getElementById('passwordAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('passwordAlert').classList.replace('d-none', 'd-block')
    }

    if (repasswordValidation()) {
        document.getElementById('repasswordAlert').classList.replace('d-block', 'd-none')
    }else{
        document.getElementById('repasswordAlert').classList.replace('d-none', 'd-block')
    }
    
    
if (nameValidation()
    && emailValidation()
    && phoneValidation()
    && ageValidation()
    && passwordValidation()
    && repasswordValidation()) {
        document.getElementById('submit-btn').removeAttribute('disabled')
}else{
    document.getElementById('submit-btn').setAttribute('disabled', true)
}   

}

//
function nameValidation() {
    return (/^[a-zA-Z_\s]+$/.test(document.getElementById('nameInput').value))
}



function emailValidation() {
    return (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(document.getElementById('emailInput').value))
}



function phoneValidation() {
    return (/^(?:\d{2}-\d{3}-\d{3}-\d{3}|\d{11})$/.test(document.getElementById('phoneInput').value))
}



function ageValidation() {
    return (/^\S[0-9]{0,3}$/.test(document.getElementById('ageInput').value))
}



function passwordValidation() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById('passwordInput').value))
}



function repasswordValidation() {
    return document.getElementById('repasswordInput').value === document.getElementById('passwordInput').value
}

