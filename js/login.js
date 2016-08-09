/**
 * Created by novax_000 on 2016/4/8.
 */

    window.onload= function(){
        var btn = document.getElementById("login");

        btn.addEventListener("click",function(){
            var username = document.getElementById("username").value;
            var password = document.getElementById("password").value;

            Bmob.User.logIn(username, password, {
                success: function(user)
                {
                    // Do stuff after successful login.

                    window.location.href="../view/start.html";
                },
                error: function(user, error)
                {
                    alert("Error: " + error.code + " " + error.message);
                // The login failed. Check error to see why.
                }
            });

        });


var btn_register=document.getElementById("register");
btn_register.addEventListener("click",function(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var user = new Bmob.User();
    user.set("username", username);
    user.set("password", password);

    user.signUp(null, {
        success: function(user) {
            // Hooray! Let them use the app now.

            window.location.href="../view/start.html";
        },
        error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
});


    }
