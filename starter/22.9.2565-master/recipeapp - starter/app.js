//* รายการอาหาร
// https://themealdb.com/api/json/v1/1/list.php?c=list
//* ประเภทอาหาร
// https://themealdb.com/api/json/v1/1/filter.php?c=beef
//* อาหาร
// https://themealdb.com/api/json/v1/1/lookup.php?i=52874

//* ตัวแปรข้อมูลจาก ผู้ให้บริการ
const API = "https://themealdb.com/api/json/v1/1/"

// การอ้างอิงจะมีหลายวิธี 1. class ของ css โดยใช้จุด (.) 2 ใช้ id  โดยใช้ (#) อื่นๆ
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
    document.createElement is make element new
    tag.addEventlistener add Event the tag
    tag.classList.add() add class css in tag
    split('') covert string be array 
*/

// ดึงรายการประเภทอาหาร
const fetchList = async () => {
    //* ดึงข้อมูลมา
    // `${ตัวแปร}` การแทรกตตัวแปรลงไป
    let response = await fetch(`${API}list.php?c=list`)
    // console.log(response);
    // การแปลง json to string
    let data = await response.json()
    // console.log(data);

    // ดึงขอมูลจาก data object ใน key meals
    const categories = data.meals

    // console.log(categories);

    //! ลูปข้อมูล และ เพิ่มตุณสมบัติให้กับแท็ก
    for (let index = 0; index < categories.length; index++) {
        // การข้าถึงข้อมูลใน array จะใช้ data[index]
        // console.log(categories[index]);
        //TODO สร้างแท็กขึ้นมา
        let div = document.createElement('div')
        // เพิ่มข้อความลงไป
        div.innerText = categories[index].strCategory
        // เพิ่ม event ลงไป
        div.addEventListener('click', () => {

            screen.main.querySelector(".categories .active").classList.remove('active')
            div.classList.add('active')
            getRecipeOfCategory(categories[index].strCategory)
        })
        getRecipeOfCategory(categories[index].strCategory)
        // เปิดมาครังแรกทำให้ปุ่ม  Active ปุ่มแรก
        if (index == 0) {
            div.classList.add('active')
        }


        screen.recipe.appendChild(div)
    }
}
const getRecipeOfCategory = async (recipeID) => {
    screen.main.querySelector(".recipe-list").innerText =''
    let response = await fetch(`${API}filter.php?c=${recipeID}`)
    let data = await response.json()
    const recipe = data.meals

    // console.log(recipe);

    for (let index = 0; index < recipe.length; index++) {
        let div = document.createElement('div')
        div.classList.add('item')
        div.addEventListener('click', () => {
            //do someting
        })

        div.innerHTML = `<div class='thumbnail'> 
                <img src='${recipe[index].strMealThumb}' />
                </div>
                <div class='details'> 
                    <h2>${recipe[index].strMeal}</h2>
                </div>`
        screen.main.querySelector('.recipe-list').appendChild(div)

    }

}


//! ฟังก์ชันหลักเอาไว้รันโปรแกรม
function main() {
    console.log("Hello World");
    //* เรียกใช้ฟังก์ชัน
    fetchList()


    // getRecipeOfCategory('1')

}

//! เรียกใช้ฟังก์ชันหลัก
main()


