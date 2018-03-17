
document.getElementById('submit-form').addEventListener('submit', addPost
)
function addPost(e){
  console.log("adding")
  e.preventDefault();
  let img = document.getElementById('img-url').value || sendError()
  fetch('https://dev.sighthoundapi.com/v1/recognition?objectType=vehicle,licenseplate', {
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
    console.log(cars);
    document.getElementById("parent").innerHTML = '';
    document.getElementById("logodiv").innerHTML = '';
    document.getElementById("image-preview").innerHTML = '';
    let carImg = document.createElement('img')
    carImg.setAttribute('id','carID')
    document.getElementById('image-preview').appendChild(carImg);
    for( let i = 0; i < cars.length; i++){
      let r = Math.floor(Math.random()*255)
      let g = Math.floor(Math.random()*255)
      let b = Math.floor(Math.random()*255)

      if(cars[i].vehicleAnnotation.licenseplate){
      let region = cars[i].vehicleAnnotation.licenseplate.attributes.system.region.name;
      let plateNumber = cars[i].vehicleAnnotation.licenseplate.attributes.system.string.name;
      let color = cars[i].vehicleAnnotation.attributes.system.color.name;
      let make = cars[i].vehicleAnnotation.attributes.system.make.name;
      let model = cars[i].vehicleAnnotation.attributes.system.model.name;
      let con = cars[i].vehicleAnnotation.recognitionConfidence;

      let objects = document.createElement("div")
      console.log(color)
      objects.style.color = `rgb(${r},${g},${b})`
      objects.classList.add("car")
      objects.classList.add("col-md-4")
      objects.setAttribute("id", "car")
      objects.innerHTML = `${color.toUpperCase()}, ${make}, ${model}, with a confidence rating (${con}), Region: ${region}, Plate Number : ${plateNumber}`
      document.getElementById("parent").appendChild(objects)


      let carimg = document.createElement("img")
      carimg.classList.add("logo")
      carimg.classList.add("col-md-4")
      carimg.setAttribute("id", "logo"+i)
      carimg.setAttribute("src",`images/${make.replace(/([-\s])/g,"").toUpperCase()}.png`)
      document.getElementById("logodiv").appendChild(carimg)
    } else {
      let color = cars[i].vehicleAnnotation.attributes.system.color.name;
      let make = cars[i].vehicleAnnotation.attributes.system.make.name;
      let model = cars[i].vehicleAnnotation.attributes.system.model.name;
      let con = cars[i].vehicleAnnotation.recognitionConfidence;

      let objects = document.createElement("div")
      console.log(color)
      objects.style.color = `rgb(${r},${g},${b})`
      objects.classList.add("car")
      objects.classList.add("col-md-4")
      objects.setAttribute("id", "car")
      objects.innerHTML = `${color.toUpperCase()}, ${make}, ${model}, with a confidence rating (${con})`
      document.getElementById("parent").appendChild(objects)


      let logoimg = document.createElement("img")
      logoimg.classList.add("logo")
      logoimg.classList.add("col-md-4")
      logoimg.setAttribute("id", "logo"+i)
      logoimg.setAttribute("src",`images/${make.replace(/([-\s])/g,"").toUpperCase()}.png`)
      document.getElementById("logodiv").appendChild(logoimg)
    }

    setTimeout(()=> {
    let box = document.createElement('div')
    console.log('margin-left: ',(cars[i].vehicleAnnotation.bounding.vertices[0].x / data.image.width)*document.getElementById('carID').width);
    console.log('image width:',data.image.width)
    box.style.zIndex=99;
    box.style.position = 'absolute';
    box.style.marginLeft = ((cars[i].vehicleAnnotation.bounding.vertices[0].x / data.image.width)*document.getElementById('carID').width) +"px" ;
    box.style.marginTop = ((cars[i].vehicleAnnotation.bounding.vertices[0].y / data.image.height)*document.getElementById('carID').height) +"px"  ;
    box.style.width = (((cars[i].vehicleAnnotation.bounding.vertices[1].x - cars[i].vehicleAnnotation.bounding.vertices[0].x) / data.image.width)*document.getElementById('carID').width) +"px" ;
    box.style.height = (((cars[i].vehicleAnnotation.bounding.vertices[2].y - cars[i].vehicleAnnotation.bounding.vertices[1].y) / data.image.height)*document.getElementById('carID').height) + "px";
    box.style.border = "2px solid";
    box.style.borderColor = `rgb(${r},${g},${b})`
    document.getElementById("image-preview").insertBefore(box, document.getElementById('image-preview').childNodes[0])
  }, 1000)
      }

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
