$(document).bind("touchmove", function(evt) {
    evt.preventDefault();
});

$(document).on("swipeUp", function (evt) {
    var $this = $(evt.target),
        $next = $this.next();

    if ($next.length === 0) return;

    if ($next.attr("id") === $("section").last().attr("id")) {
        $("footer img").hide();
    }

    $next.removeClass().show();
    $this.addClass("animated fadeOutUp").one('webkitAnimationStart animationstart', function () {
        setTimeout(function() {
            $this.find("img").removeClass().width(0);
            $next.find("img").addClass("stretch").width($next.find("img").data("width"));
        }, 300);
    }).one('webkitAnimationEnd animationend', function () {
        $this.hide();
    });
});

$(document).on("swipeDown", function (evt) {
    var $this = $(evt.target);
    if (!$this.is("section")) {
        $this = $this.parents("section");
    }

    $prev = $this.prev();

    if ($prev.length === 0) return;

    if ($prev.attr("id") !== $("section").last().attr("id")) {
        $("footer img").show();
    }

    $prev.removeClass().show();
    $prev.addClass("animated fadeInDown").one('webkitAnimationStart animationstart', function () {
        setTimeout(function() {
            $this.find("img").removeClass().width(0);
            $prev.find("img").addClass("stretch").width($prev.find("img").data("width"));
        }, 300);
    }).one('webkitAnimationEnd animationend', function () {
        $this.hide();
    });
});

// 微信分享链接处理
var imgUrl = 'http://www.renrenche.com/static/promotion/qixi/images/weixin.jpg',
    link = 'http://www.renrenche.com/static/promotion/qixi/index.html',
    title = '已感动千万女性，一个你不了解的真实男人世界',
    desc = '七夕，让你更懂身边的那个他';

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": link,
        "desc": desc,
        "title": title
    }, function(res) {});
}

function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": link,
        "desc": desc,
        "title": title
    }, function(res) {});
}

function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": desc,
        "url": link,
    }, function(res) {});
}

try {
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.on('menu:share:appmessage', shareFriend);
        WeixinJSBridge.on('menu:share:timeline', shareTimeline);
        WeixinJSBridge.on('menu:share:weibo', shareWeibo);
    }, false);
} catch (e) {}

try {
    var audio = document.querySelector('audio');
    audio.play();
    audio.on('ended', function () {
        audio.play();
    });
} catch(e) {}

var audioOn = true;
$("#music_ctrl").on("click", function() {
    var audio = document.querySelector('audio');
    if (audioOn) {
        audio.pause();
        $(this).css({
            "background-position": "-39px 0"
        });
    } else {
        audio.play();
        $(this).css({
            "background-position": "0 0"
        });
    }

    audioOn = !audioOn;
});