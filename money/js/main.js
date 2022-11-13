console.log("hello world ")
function postsomething(){
    console.log("this is a post test")
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:5002/transact", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
    }));
    console.log(xhr.responseText);
}