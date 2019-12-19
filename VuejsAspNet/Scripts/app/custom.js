var toast = {
    show: function (title, msg, time) {
        clearTimeout(1);
        var msgwindow = document.getElementById('snackbar');
        msgwindow.style.transform = 'translateY(0px)';
        msgwindow.style.opacity = "100";
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '0ms';
        msgwindow.querySelector('.title').style.display = 'block';
        msgwindow.querySelector('.title').innerText = title;
        msgwindow.querySelector('.content').innerHTML = msg;
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = time + 'ms';
        msgwindow.querySelector('.snackbarprogressbar').style.width = '100%';
        setTimeout(() => {
            msgwindow.style.transform = 'translateY(100px)';
            msgwindow.style.opacity = "0";
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '100ms';
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = '0ms';
            msgwindow.querySelector('.snackbarprogressbar').style.width = '0%';
        }, time);
        return msg;
    },

    msg: function (msg, time) {
        clearTimeout(1);
        var msgwindow = document.getElementById('snackbar');
        msgwindow.style.transform = 'translateY(0px)';
        msgwindow.style.opacity = "100";
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '0ms';
        msgwindow.querySelector('.title').style.display = 'none';
        msgwindow.querySelector('.content').innerHTML = msg;
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = time + 'ms';
        msgwindow.querySelector('.snackbarprogressbar').style.width = '100%';
        setTimeout(() => {
            msgwindow.style.transform = 'translateY(100px)';
            msgwindow.style.opacity = "0";
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '100ms';
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = '0ms';
            msgwindow.querySelector('.snackbarprogressbar').style.width = '0%';
        }, time);
        return msg;
    },


    box: function (title, msg, time, div) {
        clearTimeout(1);
        var msgwindow = div;
        msgwindow.style.transform = 'translateY(0px)';
        msgwindow.style.opacity = "100";
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '0ms';
        msgwindow.querySelector('.title').style.display = 'block';
        msgwindow.querySelector('.title').innerText = title;
        msgwindow.querySelector('.content').innerHTML = msg;
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = time + 'ms';
        msgwindow.querySelector('.snackbarprogressbar').style.width = '100%';
        setTimeout(() => {
            msgwindow.style.transform = 'translateY(-100px)';
            msgwindow.style.opacity = "0";
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '100ms';
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = '0ms';
            msgwindow.querySelector('.snackbarprogressbar').style.width = '0%';
        }, time);
        return msg;
    },

    boxmsg: function (msg, time, div) {
        clearTimeout(1);
        var msgwindow = div;
        msgwindow.style.transform = 'translateY(0px)';
        msgwindow.style.opacity = "100";
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '0ms';
        msgwindow.querySelector('.title').style.display = 'none';
        msgwindow.querySelector('.content').innerHTML = msg;
        msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = time + 'ms';
        msgwindow.querySelector('.snackbarprogressbar').style.width = '100%';
        setTimeout(() => {
            msgwindow.style.transform = 'translateY(-100px)';
            msgwindow.style.opacity = "0";
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDelay = '100ms';
            msgwindow.querySelector('.snackbarprogressbar').style.transitionDuration = '0ms';
            msgwindow.querySelector('.snackbarprogressbar').style.width = '0%';
        }, time);
        return msg;
    }

};

module.exports = {
    toast
};