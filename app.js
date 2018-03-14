
function sendError() {
   document.getElementById('img-url').value = alert('Please enter URL')
}

document.getElementById('addPost').addEventListener('click', addPost
)
function addPost(e){
  e.preventDefault();
  let img = document.getElementById('img-url').value || sendError()

  fetch('https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle', {
    method:'POST',
    headers: {
      'X-Access-Token': '4NvSlRKaZ4H8UEKltA78UcK9VsmpVu093qS4',
      'Content-type':'application/json'
    },
    body:JSON.stringify({ image: img })
  })
  .then((res)=> res.json())
  .then((data)=> {
    (console.log(data))
    document.getElementById('#')
    let carUrl = document.getElementById('carUrl')
    let cars = data.objects


    for( let i = 0; i < cars.length; i++){
      let color = cars[i].vehicleAnnotation.attributes.system.color.name;
      let make = cars[i].vehicleAnnotation.attributes.system.make.name;
      let model = cars[i].vehicleAnnotation.attributes.system.model.name;
      let con = cars[i].vehicleAnnotation.recognitionConfidence;
      let objects = document.createElement("div")
      console.log(color)
      objects.classList.add("car")
      objects.classList.add("col-md-4")
      objects.innerHTML = `${color.toUpperCase()}, ${make}, ${model}, with a confidence rating (${con})`
      document.getElementById("parent").appendChild(objects)

      }

      openNav()


  })
}


function openNav() {
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("carID").src = document.getElementById('img-url').value;

}


function closeNav() {
    document.getElementById("myNav").style.width = "0%";

}


// http://www.gmc.com/content/dam/gmc/na/us/english/index/vehicles/2018/trucks/sierra-1500-mov/01-images/2018-sierra1500-mov-denali-onyx-18PGSR00335.jpg?imwidth=1200
