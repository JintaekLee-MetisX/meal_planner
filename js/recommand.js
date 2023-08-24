const reRecommendationBtn = document.querySelector('#re-recommendation')
let restaurants;

function readJSON(file, callback) {
  var rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
          callback(rawFile.responseText);
      }
  }
  rawFile.send(null);
}

function getRestaurantList(){
  readJSON("./restaurant_list.json", function(text){
    const data = JSON.parse(text);
    restaurants = data["restaurant"];
    recommendRestaurant()
  });
}

function recommendRestaurant() {
  const firstRestaurant = _.sample(restaurants);
  const recommentdation = document.querySelector('#recommendation')

  do {
    secondRestaurnat = _.sample(restaurants);
  } while (firstRestaurant.name == secondRestaurnat.name
        || firstRestaurant.category == secondRestaurnat.category
        || firstRestaurant.type == secondRestaurnat.type
        || secondRestaurnat.lunch_only == "true"
        || secondRestaurnat.budget == "over");

  recommentdation.innerText = `점심 : ${firstRestaurant.name},\n 저녁 : ${secondRestaurnat.name}\n어떠신가요?`
}

reRecommendationBtn.addEventListener('click', recommendRestaurant)