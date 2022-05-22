function login(){
    var user, pass;
    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;
    if(user == "admin" && pass == "12345" ){
        alert("------BIENVENIDO A LABORATORIO CLINICO---- Presione ACEPTAR")
      window.location= "../html/index2.html";
    }
    else{
      alert("ACCESO DENEGADO")
    }
  }