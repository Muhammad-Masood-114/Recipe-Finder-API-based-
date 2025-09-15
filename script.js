const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const recipeModal = document.getElementById("recipeModal");
const resultsDiv = document.getElementById("results");
const recipeTitle = document.getElementById("recipeTitle");
const ingredients = document.getElementById("ingredients");
const recipeInstructions = document.getElementById("instructions");
const recipeImg = document.getElementById("recipeImg");
const closeModal = document.getElementById("closeModal");

async function getRecipe(recipeName) {
  let response = await fetch(
    `https://dummyjson.com/recipes/search?q=${recipeName}`
  );
  if (!response.ok) {
    throw new Error("Response is not true");
  }

  let data = await response.json();
  if (!data.recipes) {
    resultsDiv.innerHTML = `<p>No recipes found 😢</p>`;
    return;
  }
  resultsDiv.innerHTML = "";
  data.recipes.forEach((meal) => {
    console.log(meal);
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src=${meal.image}>
      <button>View</button>

      `;
    card.querySelector("button").addEventListener("click", () => {
      showRecipe(meal);
    });

    resultsDiv.appendChild(card);
  });
}

function showRecipe(meal) {
  console.log(meal);
  recipeTitle.textContent = meal.name;
  recipeImg.src = meal.image;
  recipeInstructions.textContent = meal.instructions;

  ingredients.innerHTML = "";
  for (let i = 0; i < meal.ingredients.length; i++) {
    const ingredient =
      meal[
        `ingredients${i}
`
      ];
    const mealType =
      meal[
        `
mealType${i}`
      ];
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = ingredient;
      ingredients.appendChild(li);
    }
  }
  recipeModal.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  let rercipeSerach = searchInput.value.trim();
  if (rercipeSerach === "") return;
  getRecipe(rercipeSerach);
  searchInput.value = "";
});

closeModal.addEventListener("click", () => {
  recipeModal.style.display = "none";
});
