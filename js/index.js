var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

var allSites = [];


if (localStorage.getItem("sites") !== null) {
    allSites = JSON.parse(localStorage.getItem("sites"));
    displayData();
}

function addweb() {
    if (allValidation(siteName ,"msgName") && allValidation(siteUrl ,"msgUrl") ) {
      var web = {
        name: siteName.value,
        url: siteUrl.value,
    };
    allSites.push(web);
    localStorage.setItem("sites", JSON.stringify(allSites));
    displayData();
    console.log(allSites);
    clearForm();   
    }
    else{
        alert("error")
    }
   
}
function clearForm() {
     siteName.value = "" ;
     siteUrl.value ="";
siteName.classList.remove("is-valid");
siteUrl.classList.remove("is-valid");


}
function displayData() {
    var cartona = "";
    for (var i = 0; i < allSites.length; i++) {
        cartona += `
        <tr>
            <td>${i}</td>
            <td>${allSites[i].name}</td>
           <td>
                  <button onclick="visitSites(${i})" class="btn btn-success">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
           <td>
                  <button onclick="deleteSites(${i})" class="btn btn-danger pe-2">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
        </tr>
        `;
    }
    document.getElementById("tableDate").innerHTML = cartona;
}


function deleteSites(index) {
console.log(index);
allSites.splice(index , 1);
displayData() ;
localStorage.setItem("sites", JSON.stringify(allSites));
}


function visitSites(index) {
    window.open(allSites[index].url ,"_blank")
}



function allValidation(element , msgId) {
    var msg = document.getElementById(msgId);
    var regex = {
        siteName:/^[A-Za-z][A-Za-z]{2,8}$/,

        siteUrl:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,

    };

    if (regex[element.id].test(element.value) == true) {
       element.classList.add("is-valid");
       element.classList.remove("is-invalid");
       msg.classList.add("d-none");
       return true;
    }

    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        msg.classList.remove("d-none");
        return false;
    }
}