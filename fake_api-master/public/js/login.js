
let token;
document.querySelector(".form-reg__button").addEventListener("click", function(e) {
  e.preventDefault();

  const user = {
    email:  document.querySelector("#email").value,
    password: document.querySelector("#password").value
  }

  return fetch('https://geekhub-frontend-js-9.herokuapp.com/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }})
      .then( async response => {
     if(response.ok){
       let user = response.json();
       return {
        token: response.headers.get('x-auth-token'),
        user:  user,
      }
    }

    else{
      if(user.password.length < 8){
        alert("password must include 8 symbols")
      }
      if(!user.confirmationPassword || !user.email || !user.password){
        alert("No such user")
      }
      else{
        alert("Unhendled error: " + response.status)
      }
    }
  })
  .then(async data =>{
    localStorage.setItem('token', data.token)
    console.log(localStorage.getItem('token'));
    alert("You logged in!")
    location.href = "http://localhost:3000/page.html"
  })
    .catch(error => console.log(error))
})
 // export let tokenGlb = token;
