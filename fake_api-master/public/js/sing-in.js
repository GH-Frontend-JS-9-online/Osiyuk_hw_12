document.querySelector(".form-reg__button").addEventListener("click", function(e) {
  e.preventDefault();
  const user = {
    email:  document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    name: document.querySelector("#name").value
  }
  return fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        "x-auth-token": "your personal token"
      }
    })
  .then( async response => {
    if(response.ok){
      alert("You can sign in!")
      window.location = "/"
      response.json()
      location.href = "http://localhost:3000/login.html"
    }
    else{
      if(user.password.length < 8){
        alert("password must include 8 symbols")
      }
      if(!user.confirmationPassword || !user.email || !user.password){
        alert("Input fileds must be filled")
      }
      else{
        alert("Unhendled error: " + response.status)
      }
    }
  })
    .catch(error => console.log(error))
})
