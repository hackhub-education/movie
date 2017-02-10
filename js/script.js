var products;

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function updateNav(login) {
    if (login) {
        $('#loginNav').hide();
        $('#logoutNav').show();
    } else {
        $('#loginNav').show();
        $('#logoutNav').hide();
    }
};

$(document).ready(function() {
    $("#loginBtn").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username && password) {
            $.post("http://open-commerce.herokuapp.com/api/login", {
                    username: username,
                    password: password
                },
                function(res) {
                    if (res.success) {
                        cookie = 'x-access-token=' + res.token;
                        document.cookie = cookie;
                        window.location.href = "/movie/index.html";
                    } else {
                        alert(res.message);
                    }

                });
        } else {
            alert("username and password id required.");
        }
    });

    $("#signupBtn").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
        if (username && password) {
            $.post("http://open-commerce.herokuapp.com/api/signup", {
                    username: username,
                    password: password
                },
                function(res) {
                    if (res.success) {
                        alert("signup success!")
                    } else {
                        alert(res.message)
                    }
                });
        } else {
            alert("username and password id required.");
        }
    });

    $("#logoutNav").click(function() {
        // alert("log out");
        deleteCookie('x-access-token');
        updateNav(false);
    });

    var token = getCookie('x-access-token')
    updateNav(token);

    $.ajax({
        url: "http://open-commerce.herokuapp.com/api/products",
        type: "GET",
        data: {'token' : token},
        success: function(res) {
            console.log(res);
        },
        error: function(err) {
            console.log(err);
        }
    })
})