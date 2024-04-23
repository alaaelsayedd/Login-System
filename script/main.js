 var loginEmailInput=document.getElementById("login-email");
 var loginPassInput=document.getElementById("login-password");
 var signupEmailInput=document.getElementById("signup-email");
 var signupNameInput=document.getElementById("signup-name");
 var signupPassInput=document.getElementById("signup-password");
 var head= document.getElementById('head-name');
 var indexOfUser=-1;
  var nameRegex=/[a-zA-Z]{2,12}/;
  var emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  var passRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{5,16}$/
  var currentlocation =location.pathname;
  currentlocation=currentlocation.split("/");
  
 var usersList=[];
 if(window.localStorage.getItem("ourUsers")!=undefined)
 {
  usersList=JSON.parse(window.localStorage.getItem("ourUsers"));
 }

 function signup()
 {
    
   if (validateInput(signupNameInput, nameRegex) & validateInput(signupPassInput, passRegex) & validateInput(signupEmailInput, emailRegex)) {
    if(isEmailExist(signupEmailInput))
    {
    document.getElementById('sucess').classList.replace("d-none", "d-block");
    var user ={
      name :signupNameInput.value,
      password:signupPassInput.value,
      email:signupEmailInput.value
     }
    usersList.push(user);
    window.localStorage.setItem("ourUsers",JSON.stringify(usersList));
    resetInputs();
    currentlocation[currentlocation.length-1]="index.html";
    location.pathname=currentlocation.join('/');
   

    }
  } 
  
   
 }
 function validateInput(element , regex)
 {
    if(regex.test(element.value)==true && element.value!='' )
    {
      element.nextElementSibling.classList.replace("d-block","d-none");
       return true;
    }
    else
    {
      element.nextElementSibling.classList.replace("d-none","d-block");
      return false;
      
    }
 }
 function resetInputs()
 {
  signupNameInput.value=null;
  signupEmailInput.value=null;
  signupPassInput.value=null;
  document.getElementById('sucess').classList.replace("d-block", "d-none");
 }
 
 function isEmailExist(element)
 {
    for(var i =0; i<usersList.length;i++)
    {
      if(element.value==usersList[i].email)
      {
        element.nextElementSibling.innerHTML='email is Already Exist';
        element.nextElementSibling.classList.replace("d-none","d-block");
        return false;

      }
    }
    return true;
 }
 

function login()
{
  if(isEmptyInput(loginEmailInput))
    {
      if(isEmptyInput(loginPassInput))
      {
        /*Do nothing */
      }
      else{
        document.getElementById("failed-pass").innerHTML="Enter Password";
        return false;
        
      }
    }
    else{
      document.getElementById("failed-email").innerHTML="Enter Email";
      console.log(usersList);
      return false;
    }
    
  for(var i=0;i<usersList.length;i++)
  {
    
    
    if(loginEmailInput.value==usersList[i].email)
    {
      if(loginPassInput.value==usersList[i].password)
      {
       window.localStorage.setItem("userIndex",String(i));
       currentlocation[currentlocation.length-1]="home.html";
       location.pathname=currentlocation.join('/');
        return true;
      }
      else{
        document.getElementById("failed").innerHTML="Wrong Password";
        return false;
      }
    }
  }
  document.getElementById("failed").innerHTML="Wrong Email";
  
}

function isEmptyInput(element)
{
  if(element.value=='')
  {
    return false;
  }
  else{
    return true;
  }
}
if( currentlocation[currentlocation.length-1]=="home.html" && window.localStorage.getItem("userIndex")!=undefined)
{
  indexOfUser=+window.localStorage.getItem("userIndex");
  head.innerHTML=`Hello,${usersList[indexOfUser].name}`;
  
}
function logout()
{
  window.localStorage.removeItem("userIndex");
}

