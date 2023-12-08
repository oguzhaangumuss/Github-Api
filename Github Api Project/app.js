// Selecting elements

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUser = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();
function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched); // Sayfa yenilendikçe daha önce arananları storage'dan alıp ui'a yaz
}


function getData (e){
    let username = nameInput.value.trim();
    
    if (username === "") {
        alert("lütfen geçerli bir kullanıcı adı girin.");
    }
    else {
        github.getGithubData(username)
        .then(response => {
            if (response.user.message ==="Not Found"){
                //Hata mesajı 
                ui.showError("Kullanıcı adı bulunamadı!");
            }
            else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showUserRepo(response.repo);
            }
         })
        .catch(err => ui.showError(err));
    }


    ui.clearInput(); //Input temizleme
    e.preventDefault();
}



function clearAllSearched(){
    //Tüm arananları temizle
    if (confirm("Emin misiniz ?")) {
        // Silme işlemi
        Storage.clearAllSearchedUserFromStorage();
        ui.clearAllSearchedFromUI();
        
    }
}
function getAllSearched(){
    //Arananları storage'dan al ui'a ekle
    let users = Storage.getSearchedUserFromStorage();

    let result = "" ;
    users.forEach(user => {
        
        result += `<li class="list-group-item">${user}<li">`;
    });
    lastUser.innerHTML = result;
}
