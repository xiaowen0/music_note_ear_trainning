/**
 * Created by Kevin on 2019/1/31.
 */

(function(){

    // check browser
    var usable = true;
    var audio = document.createElement('audio');
    if (typeof (audio.play) === "undefined")
    {
        usable = false;
    }

    if (!usable)
    {
        alert("抱歉！当前浏览器版本太旧，不能运行该应用程序，请升级你的浏览器或尝试其他浏览器。");
    }

})();
