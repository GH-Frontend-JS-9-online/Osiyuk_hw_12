

  let token = localStorage.getItem('token')
  let conversationBtn = document.querySelector(".conversation__button");
  console.log(localStorage.getItem('token'))


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
    console.log(content[key].name)
    userList.innerHTML += `
							<li>
								${content[key].name}
							</li>
							`;
    }
    closeUserList.addEventListener("click",function(){
      userBlock.style.display = 'none';
    })
})
