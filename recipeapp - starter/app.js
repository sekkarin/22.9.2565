// https://themealdb.com/api/json/v1/1/list.php?c=list
// https://themealdb.com/api/json/v1/1/filter.php?c=beef
// https://themealdb.com/api/json/v1/1/lookup.php?i=52874


const API = "https://themealdb.com/api/json/v1/1/"
const app = document.querySelector('.app')
const screen = {
    main: app.querySelector('.main-screen'),
    recipe: app.querySelector('.categories')
}
/*
    * คำสั่งที่ควรจำ
    fetch() fetch data from API
    async awit is callback "I will call back later!"
    *data.json covert json to the string
    document.createEkement is make element new
    tag.addEventKistener add Event the tag
    tag.classList.add() add class css in tag
    split('') covert string be array
*/



// ดึงข้อมูลประเภทอาหาร
const fetchList = async () => {
    try {

        let response = await fetch(`${API}list.php?c=list`)
        let data = await response.json()
        const categories = data.meals
        for (let index = 0; index < categories.length; index++) {
            let div = document.createElement('div')
            div.innerText = categories[index].strCategory
            div.addEventListener("click", () => {
                screen.main.querySelector(".categories .active").classList.remove("active")
                
                div.classList.add("active")
                getRecipeOfCategory(categories[index].strCategory)
            })
            getRecipeOfCategory(categories[index].strCategory)
            if (index == 0) {
                div.classList.add('active')
            }
            screen.recipe.appendChild(div)


        }
        // Categories
    } catch (err) {
        console.log(err);
    }
}
// เข้าถึงประเภทอาหาร
const getRecipeOfCategory = async (recipeName) => {
    screen.main.querySelector(".recipe-list").innerText = ''
    const response = await fetch(`${API}filter.php?c=${recipeName}`)
    const data = await response.json()
    const recipes = data.meals
    // console.log(recipes);
    for (let index = 0; index < recipes.length; index++) {
        // console.log(recipes[index].strMeal);
        let div = document.createElement('div')
        div.classList.add('item')
        div.addEventListener("click", () => {
            showDetail(recipes[index].idMeal)
        })
        div.innerHTML = `<div class="thumbnail">
            <img src="${recipes[index].strMealThumb}" />
        </div>
        <div class="details">
                <h2>${recipes[index].strMeal}</h2>
        </div>`
        screen.main.querySelector('.recipe-list').appendChild(div)

    }

}
// แสดงรายละเอียดอาหาร
const showDetail = async (id) => {
    const screen_recipe = document.querySelector('.recipe-screen')
    screen.main.classList.add('hidden')
    screen_recipe.classList.remove("hidden")
    let respone = await fetch(`${API}lookup.php?i=${id}`)
    let data = await respone.json()
    // console.log(data);
    let recipe = data.meals[0]
    // console.log(recipe);
    screen_recipe.querySelector('.thumbnail img').src = recipe.strMealThumb
    screen_recipe.querySelector('.details h2').innerText = recipe.strMeal
    for (let index = 1; index < 20; index++) {
        if (recipe["strIngredient" + index].length == 0) {
            break
        }
        let li = document.createElement('li')
        li.innerHTML = `${recipe["strIngredient" + index]} -  ${recipe["strMeasure" + index]}`
        screen_recipe.querySelector(".details ul").appendChild(li)
        let Instructions = recipe.strInstructions.split('\r\n').filter(v=>v)
        // console.log(Instructions);
        for (let index = 0; index < Instructions.length; index++) {
            let li = document.createElement('li')
            li.innerText = Instructions[index]
            screen_recipe.querySelector('.details ol').appendChild(li)
            
        }
        screen_recipe.querySelector('.back-btn').addEventListener('click',()=>{
            screen_recipe.classList.add('hidden')
            screen.main.classList.remove('hidden')
            screen_recipe.querySelector('.thumbnail img').src = ''
            screen_recipe.querySelector('.details h2').innerText =''
            screen_recipe.querySelector('.details ul').innerHTML =''
        })
    }
}

function main() {
    // getRecipeOfCategory()
    fetchList()
}
main()