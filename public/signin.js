const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


$(".signup").click(function(){
  var email = $(".email-up").val();
  var pw = $(".password-up").val();
  var x = {email : email, pw : pw};
  fetch("http://localhost:8000/signup", {
    method: 'POST',
    headers: { "Content-Type": "application/json"},   //type of content being posted
    body: JSON.stringify(x)  //conver the object into string
  }).then(response=>response.json())
  .then(json => redirect(json.url));
});

$(".signin").click(function(){
  var email = $(".email-in").val();
  var pw = $(".password-in").val();
  var x = {email : email, pw : pw};
  fetch("http://localhost:8000/signin", {
    method: 'POST',
    headers: { "Content-Type": "application/json"},   //type of content being posted
    body: JSON.stringify(x)  //conver the object into string
  }).then(response=>response.json())
  .then(json => redirect(json.url, email, pw));
});
function redirect(url, email, pw){
  if(url=="/signin"){
    window.location.href = "/";
  }
  else{
    var baseUrl = "http://localhost:3000/";
    // var x = {email : email, pw : pw};
    // fetch(baseUrl, {
    //     method: 'POST',
    //     headers: { "Content-Type": "application/json"},   //type of content being posted
    //     body: JSON.stringify(x)  //conver the object into string
    // });
    //.then(response=>response.json())
    // .then(json => console.log(json.id))
    window.location.href = baseUrl;
  }
}
