
let selectedCategory = null;
const CATEGORY_NUMBER_MATCHING = {
    "Entertainment: Books" : 10,
    "Entertainment: Film": 11,
    "Entertainment: Video Games": 15,
    "Science: Computers": 18,
}

processInput = async (event) => {
     selectedCategory = event.dataset.category;
     const response= await fetch(`https://opentdb.com/api.php?amount=10&category=${CATEGORY_NUMBER_MATCHING[selectedCategory]}&type=multiple`)
     const json = await response.json();
     await localStorage.setItem("AvailableQuestions", JSON.stringify(json));
     await window.location.replace("./start.html");
}    



