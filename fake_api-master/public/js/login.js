document.querySelector(".form-reg__button").addEventListener("click", function(e) {
  e.preventDefault();

  const user = {
    email:  document.querySelector("#email").value,
    password: document.querySelector("#password").value
  }

  return fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        "x-auth-token": "your personal token"
      }})
      .then( async response => {
     if(response.ok){
      response.json();
      alert("You logged in!")
      location.href = "http://localhost:3000/page.html"
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
    .catch(error => console.log(error))
})
