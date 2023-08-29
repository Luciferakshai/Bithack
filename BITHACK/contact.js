function Send() {
    var name = document.getElementById("fullName").value;
    var email = document.getElementById("emailInput").value;
    var sub = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
  
    var body = "FullName:" + name + "<br/> Email Id:" + email + "<br/> message: " + message + "<br/>";
    console.log(body);
    Email.send({

      SecureToken : "34d522b9-3e9d-4c86-87e0-b3cb79710f17" ,

    
        To : 'nithyashree.it22@bitsathy.ac.in',
        From : "nithyashree.it22@bitsathy.ac.in",
        Subject : sub, // Remove the quotes around 'sub'
        Body : body
    }).then(
        message => {
            if(message=='OK'){
                swal("Successfull", "Your message was successfully sent!", "success"); 
            }
            else{
                swal("Something went wrong","please try again later","error");

            }
        }
    );
}
