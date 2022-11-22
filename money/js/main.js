let urll = "http://localhost:5000/transact"
function getCurrentTimestamp () {
    return Date.now()
}
let dataa = {
    "from":"Zain",
    "from_passwd":"hello",
    "to":"Zaid",
    "ammount":"100"
}
function getUnix() {
    return Math.floor(Date.now() / 1000)
}
function writeTimeCookie(){
    x = getUnix() 
    document.cookie = "last=" + x + "; expires=Th, 23 Apr 2026 12:54:00 EST";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

// function checkPost(){
//   if (parseInt(getCookie("last")) + 5 <= parseInt(getUnix())){
//     return true
//   }
//   else{
//     return false 
//   }
// }

function postsomethinga(){
  if(!(parseInt(getCookie("last")) + 5 <= parseInt(getUnix()))){console.log("no can do baby, I take my time if you know what I mean");return};
    fetch(urll, {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(dataa)
    })
    .then(function(response){
        console.log(response.json());
        writeTimeCookie()
    });
}
// testing stuff