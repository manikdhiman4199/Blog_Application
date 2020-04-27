$(document).ready(function () {
    $('#postForm').on('submit', function (e) {
        let postTitle = $("#title").val();
        let postContent = $("#postContent").val();
        let postBox = {
            postTitle : postTitle,
            postContent : postContent ,
            username : ''
         }
        console.log(postBox);
        $.ajax({
            type: "put",
            url: "/users/posts",
            data: postBox
        }).done((data) => {
            alert('Successfully Posted!');
        }).fail((xhr) => {
            if(xhr.status == 500) {
                alert("Something wrong while post content online. Please try again !")
            }
        })
    });

    $.get("/users/posts/data",
        function (data) {
            for(i=0; i<data.length;i++){
                var delid = data[i]._id;
            var postTitle = data[i].postTitle
            var postContent = data[i].postContent;
            var user = data.user;
            $(".content").append('<ul><li class="postTitle">' + postTitle  + '<hr></li>' + '<li class="postContent">' + postContent + '</li></ul>');
        }
    }
    );
    $('#').click(function (e) { 
        e.preventDefault();
        
    });
    
});