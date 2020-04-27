$(document).ready(function () {

    $('#username').focusout(function () {
        let username = $("#username").val();
        if (username === " " || username === "") {
            $("#username").css('background-color', '#f99999');
        }else {
            $("#username").css('background-color', 'white');
        }
    });

    $("#email").focusout(function (e) {
        e.preventDefault();
        let email = $("#email").val();
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (regex.test(email)) {
           $("#email").css('background-color', 'white'); 
        } else {
            $("#email").css('background-color', '#f99999'); 
        }
    });

    $('#signupForm').on('submit', function (e) {
        e.preventDefault();
        let userData = {
            fullName: $("#fullName").val(),
            username: $("#username").val(),
            password: $("#password").val(),
            email: $("#email").val()
        };
        let request = $.ajax({
            type: "post",
            data: userData,
            dataType: "text",
            url: "/api/users"
        }).done(function (data) {
            alert("Successfully created the account. Please log in !");
            window.location.href = '/signin';
        }).fail(function (xhr, status, error) {
            if (xhr.status == 400) {
                alert("User already exists.Please try other username");
            }
        })
    })

});