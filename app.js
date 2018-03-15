
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
    document.getElementById("parent").innerHTML = '';
    for( let i = 0; i < cars.length; i++){
      let color = cars[i].vehicleAnnotation.attributes.system.color.name;
      let make = cars[i].vehicleAnnotation.attributes.system.make.name;
      let model = cars[i].vehicleAnnotation.attributes.system.model.name;
      let con = cars[i].vehicleAnnotation.recognitionConfidence;
      let objects = document.createElement("div")

      console.log(color)
      objects.classList.add("car")
      objects.classList.add("col-md-4")
      objects.setAttribute("id", "car")
      objects.innerHTML = `${color.toUpperCase()}, ${make}, ${model}, with a confidence rating (${con})`
      document.getElementById("parent").appendChild(objects)



      }
      // for(let i = 0; i < cars.length; i++){
      //   let make = cars[i].vehicleAnnotation.attributes.system.make.name;
      //   let objects = document.createElement("div")
      //   objects.classList.add("logo")
      //   objects.classList.add("col-md-4")
      //   objects.setAttribute("id", "logo")
      //   document.getElementById("parent").appendChild(objects)
      //
      // }

    // for(let i = 0; i < cars.length; i++){
    //
    //
    //   let logo = make.replace(/\s/g, "").toUpperCase()
    //   let logo_container = `<div id="logo-container"class="col-md-4 logo-container"><img id="logo${i}" class="logo" src="images/${logoId}">`
    //     document.getElementById('logo-container').innerHTML += logo_container;
    //   }

      openNav()




  })
}

function clear(){
  let node = document.getElementByClassName("car");
    if (node.parentNode) {
      node.parentNode.removeChild(node);
}


}


function sendError() {
   document.getElementById('img-url').value = alert('Please enter URL')
}

function openNav() {

    document.getElementById("myNav").style.width = "100%";
    document.getElementById("carID").src = document.getElementById('img-url').value;


}


function closeNav() {
    document.getElementById("myNav").style.width = "0%";

}
