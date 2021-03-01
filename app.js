
//firebase get data//
function getdata() {
    firebase.database().ref("todo").on("child_added", function (data) {
        console.log(data.val())
        //list create
        var li = document.createElement("li")
        var litext = document.createTextNode(data.val().text)
        li.appendChild(litext)
        list.appendChild(li)
        
        //li delete button
        var lideletebtn = document.createElement("button")
        var libtntext = document.createTextNode("Delete")
        
        //assign class
        lideletebtn.setAttribute("class", "deletebtn")
        lideletebtn.setAttribute("id",data.val().key)
        lideletebtn.setAttribute("onclick", "dlt(this)")
        
        lideletebtn.appendChild(libtntext)
        li.setAttribute("class", "print")
        
        
        li.appendChild(lideletebtn)
        // liedit button
        var editbtn = document.createElement("button")
        var lieditbtn = document.createTextNode("Edit")
        editbtn.appendChild(lieditbtn)
        editbtn.setAttribute("id",data.val().key)
        editbtn.setAttribute("class", "deletebtn")
        editbtn.setAttribute("onclick", "edit(this)")
        
        li.appendChild(editbtn)
    
    })
}

var list = document.getElementById("list");

//push data
function todolist() {

    var text = document.getElementById("todo");
    
    var key = firebase.database().ref('todo').push().key;
    var todo = {
        text: text.value,
        key: key,
    }
    firebase.database().ref('todo/'+key).set(todo);
    text.value = "";
    
}

function deleteall() {
    firebase.database().ref("todo").remove()
    list.innerHTML = "";
}
function dlt(e) {

   firebase.database().ref("todo").child(e.id).remove()
    e.parentNode.remove();
}
function edit(e) {
    var edittxt = prompt("Enter Text", e.parentNode.firstChild.nodeValue)
    var editodo ={
        text: edittxt,
        key: e.id
    }
    firebase.database().ref("todo").child(e.id).set(editodo)
    e.parentNode.firstChild.nodeValue = edittxt 
}

getdata()