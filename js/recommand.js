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

function checkSkipCondition(restaurant){
  skip = false;

  skipSalad = document.getElementById('noSalad').checked;
  noOutside = document.getElementById('noOutside').checked;

  if ((skipSalad && restaurant.category == "Salad")
    || (noOutside && restaurant.outside == "true"))
  {
    skip = true;
  }

  return skip;
}

function recommendRestaurant() {
  do
  {
    firstRestaurant = _.sample(restaurants);
  } while (checkSkipCondition(firstRestaurant));

  withCard = document.getElementById('withCard').checked;

  do {
    secondRestaurnat = _.sample(restaurants);
  } while (checkSkipCondition(secondRestaurnat)
        || firstRestaurant.category == secondRestaurnat.category
        || firstRestaurant.type == secondRestaurnat.type
        || secondRestaurnat.lunch_only == "true"
        || (withCard == false && secondRestaurnat.budget == "over"));

  const recommentdation = document.querySelector('#recommendation')
  recommentdation.innerText = `점심 : ${firstRestaurant.name}\n 저녁 : ${secondRestaurnat.name}`
}

reRecommendationBtn.addEventListener('click', recommendRestaurant)