$(document).ready(function () {
    console.log("Ready");
    $("#loginForm").on('submit', function (e) {
        e.preventDefault();
        let loginCheck = {
            username : $("#username").val(),
            password: $("#password").val()
        }
        $.ajax({
            type: "post",
            url: '/api/login',
            data: loginCheck,
            dataType: "text"
        }).done((data) => {
            window.location.href = '/index'
        }).fail((xhr, status, error) => {
            if(xhr.status == 500) {
                alert("Incorrect username or password. Please try again");
                window.location.reload();
            }
        })
    })
});