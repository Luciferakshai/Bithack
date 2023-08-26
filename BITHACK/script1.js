function SendMail() {

    var params = {
    
    from_name: document.getElementById("fullname").value, 
    email_id : document.getElementById("email_id").value,
    message: document.getElementById("message").value,
    
    }
    emailjs.send("service_ok1zgkx" , "template_o6aik2l", params).then(function(res){
        alert("success!" + res.status);
    })
}