

  let token = localStorage.getItem('token')
  let conversationBtn = document.querySelector(".conversation__button");
  console.log(localStorage.getItem('token'))
  let messageBlock = document.querySelector(".message__block");

async function getCurrent(){
  var headers = new Headers();
   headers.append("x-access-token", token);

var options = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/users/", options)
let content = await response.json();
 window.userName = content.name;
}
getCurrent();
//load all threads
async function thread(arr){
  let userId;
  if(userName == arr.users[1].name){
    userId = arr.users[0]._id;
  }
  else{
    userId = arr.users[1]._id;
  }
  var myHeaders = new Headers();
myHeaders.append("x-access-token", token);

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};
let thread = document.querySelector(".conversation-block");
let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/users/"+userId, requestOptions)
let content = await response.json();

  thread.innerHTML += `
  <div class="conversation-thread" id="${arr._id}">
    <div class="conversation-block__top" id="${userId}">
     <div class="conversation-block__info">
       <img class="conversation__avatar" src="./img/avatar2.png" alt="avatar">
       <h3 class="conversation__name">${content.name}</h3>
     </div>
     <div class="conversation-block__date">
       <span class="conversation__date">${arr.updated_at.slice(0,10)}</span>
     </div>
    </div>
    <p class="conversation-block__p">some text</p>
  </div>
  `
  let thisThread = await document.querySelectorAll(".conversation-thread");
  Threads(thisThread);
}

async function allThreads(){
  var myHeaders = new Headers();
myHeaders.append("x-access-token", token);

var requestOptions = {
 method: 'GET',
 headers: myHeaders,
 redirect: 'follow'
};

let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/threads?sort=desc", requestOptions)
let content = await response.json();
 console.log(content);
 let key;
 for(key in content){
    thread(content[key]);
 }

}
allThreads();
//function for new thread
async  function newThread(arr){
    console.log(arr.users[1]);

    var myHeaders = new Headers();
myHeaders.append("x-access-token", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};
let thread = document.querySelector(".conversation-block");
let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/users/"+arr.users[1], requestOptions)
let content = await response.json();

console.log(content);

    thread.innerHTML += `
    <div class="conversation-thread" id="${arr._id}" onclick="currentThread(this)">
      <div class="conversation-block__top">
       <div class="conversation-block__info">
         <img class="conversation__avatar" src="./img/avatar2.png" alt="avatar">
         <h3 class="conversation__name">${content.name}</h3>
       </div>
       <div class="conversation-block__date">
         <span class="conversation__date">${arr.updated_at.slice(0,10)}</span>
       </div>
      </div>
      <p class="conversation-block__p">some text</p>
    </div>
    `
  }
//newThread
  conversationBtn.addEventListener("click", async() => {
   let closeUserList = document.querySelector(".user-block__close");
   let userBlock = document.querySelector(".users-block");
   let key;

   var requestOptions = {
   method: 'GET',
   headers: {
       'Content-Type': 'application/json',
       'x-access-token': token
     },
   redirect: 'follow'
  };

   let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/users/all", requestOptions)
   let content  = await response.json()
   let userList = document.querySelector(".user-list__ul");
   userBlock.style.display = 'flex';

    for(key in content){
    userList.innerHTML +=
    `<li class = "user-list_li" id = "id${key}">${content[key].email}</li>`;
    }

    let userGetId = await document.getElementsByClassName("user-list_li");
    [].forEach.call(userGetId,function(el){
    el.addEventListener('click', function (e) {
        let user = document.getElementById(this.id).innerHTML;
       for(let i = 0; i<content.length;i++){
        if( content[i].email == user)
        {
         window.userId =  content[i]._id
         console.log(userId);

       }
      }
      var myHeaders = new Headers();
      myHeaders.append("x-access-token", token);
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"user":{"_id": userId}});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://geekhub-frontend-js-9.herokuapp.com/api/threads", requestOptions)
        .then(response => response.json())
        .then(result =>{
          console.log(result)
          newThread(result)
        })
        .catch(error => console.log('error', error));
    })
  });

    closeUserList.addEventListener("click",function(){
      userBlock.style.display = 'none';
    })
})



function Threads(arr){
  let thisThread = document.querySelectorAll(".conversation-thread");
  for(let i = 0; i < arr.length; i++){
    arr[i].addEventListener('click', function (e) {
       currentThread(arr[i]);
    })
  }
}
async function loadMessages(){
  var myHeaders = new Headers();
myHeaders.append("x-access-token", token);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/threads/messages/"+threadId, requestOptions)
let content = await response.json();
console.log(content);
 let key;
 for(key in content){
   if(content[key].user._id == userId){
     messageBlock.innerHTML += `
     <div class="message__wrapper-friends">
       <div class="message-friends">
         <img src="./img/avatar2.png" alt="avatar">
         <div class="message-friends__content">
           <p>${content[key].body}</p>
           <span>${content[key].created_at.slice(0,10)}</span>
         </div>
       </div>
     </div>
     `
   }
   else{
     messageBlock.innerHTML += `
     <div class="message__wrapper-yours">
       <div class="message-yours">
         <div class="message-yours__content">
           <p>${content[key].body}</p>
           <span>${content[key].created_at.slice(0,10)}</span>
         </div>
          <img src="./img/avatar.png" alt="avatar">
       </div>
     </div>
     `
   }
 }

}
async function currentThread(block){
    messageBlock.innerHTML = ``;
    window.threadId =  block.id;
    window.userId = block.childNodes[1].id;
    loadMessages();

    // id.style.cssText = "border-bottom: 1px solid #2196f3";
    var myHeaders = new Headers();
  myHeaders.append("x-access-token", token);

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
  let thread = document.querySelector(".conversation-block");
  let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/users/"+userId, requestOptions)
  let content = await response.json();
  console.log(content);

    let userInfo = document.querySelector(".user-info");
    userInfo.innerHTML = ``;
    userInfo.innerHTML += `
    <div class="user-info__wrapp">
      <img src="./img/avatar2.png" alt="avatar">
      <div class="user-info__mainInfo">
        <h3 class="user-info__name">${content.name}</h3>
        <span>${content.position}</span>
      </div>
      <p class="user-info__about">${content.description}</p>
      <div class="user-info__info">
        <span class="user-info__span">Email</span>
        <label class="user-info__label user-info__email">${content.email}</label>
        <span class="user-info__span">Phone</span>
        <label class="user-info__label user-info__phone">${content.phone}</label>
        <span class="user-info__span">Addres</span>
        <label class="user-info__label user-info__addres">${content.addres}</label>
        <span class="user-info__span">Organization</span>
        <label class="user-info__label user-info__org">${content.organization}</label>
      </div>
    </div>
    `

}
document.querySelector('.message__input').addEventListener('keydown', async function(e) {
     if (e.keyCode === 13) {
       console.log(userId);
     let inputValue = this.value;
       var myHeaders = new Headers();
     myHeaders.append("x-access-token", token);
     myHeaders.append("Content-Type", "application/json");

     var raw = JSON.stringify({"thread":{"_id":threadId},"message":{"body":inputValue}});

     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body: raw,
       redirect: 'follow'
     };

    let response = await fetch("https://geekhub-frontend-js-9.herokuapp.com/api/threads/messages", requestOptions);
    let content = await response.json();
        this.value = null;

        messageBlock.innerHTML  += `
        <div class="message__wrapper-yours">
          <div class="message-yours">
            <div class="message-yours__content">
              <p>${inputValue}</p>
              <span>${content.created_at.slice(0,10)}</span>
            </div>
            <img src="./img/avatar.png" alt="avatar">
          </div>
        </div>
        `
     }
   });
