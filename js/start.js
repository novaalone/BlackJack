/**
 * Created by novax_000 on 2016/4/8.
 */
window.onload=function(){
    var btn_start = document.getElementById("start");
    var btn_computer=document.getElementById("playWithComputer");
    var btn_logout = document.getElementById("logout");

    btn_start.addEventListener("click",function()
    {


        var currentUser = Bmob.User.current();

        if (currentUser) {
            // do stuff with the user

            currentUser.set("state","waiting");
            currentUser.save();
            //查询是否有人处于waiting状态
            var query = new Bmob.Query(Bmob.User);
            query.equalTo("state","waiting");
            query.find({
                success: function(results) {
                    if(results.length>1)
                    {

                        alert("功能完善中，敬请期待...");
                    }
                    else{
                        currentUser.set("state","off");
                        currentUser.save();
                        alert("当前无人在线");
                    }

                },
                error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                }
            });

        } else {
            // show the signup or login page
            window.location.href="../view/login.html";
        }
    });
    btn_computer.addEventListener("click",function(){
       window.location.href="../view/computer.html";
    });

    btn_logout.addEventListener("click",function(){

        var currentUser = Bmob.User.current();
        if(currentUser)
        {Bmob.User.logOut();}
        window.location.href="../view/login.html";
    });
}