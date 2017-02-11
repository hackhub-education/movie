var products = [];
var productsMap = {};
var cart = {};
var token;

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function updateCartModel() {
    if (getCookie('cart')) {
        var persistedCart = JSON.parse(getCookie('cart'));
        for (var key in persistedCart) {
            if (!(key in productsMap)) {
                delete persistedCart.key;
            }
        }
        cart = persistedCart;
        document.cookie = 'cart=' + JSON.stringify(persistedCart);
    } else {
        cart = {};
    }
}

function updateView() {
    updateCartModel();

    if (Object.keys(cart).length === 0) {
        $('#cartNav').hide();
    } else {
        $('#cartNav').show();
    }

    if (token) {
        $('#loginNav').hide();
        $('#logoutNav').show();
    } else {
        $('#loginNav').show();
        $('#logoutNav').hide();
    }

};

function getProducts() {
    $.ajax({
        url: "http://open-commerce.herokuapp.com/api/products",
        type: "GET",
        data: {
            'token': token
        },
        success: function(res) {
            products = res;
            updateProductsMap();
            updateProductsView();
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function updateProductsMap() {
    products.forEach(function(product) {
        productsMap[product._id] = product;
    });
}

function updateProductsView() {
    if (products.length === 0) {
        return;
    }

    for (var i = 0; i < products.length; i++) {
        var nameTd = '<td>' + products[i].name + '</td>';
        var priceTd = '<td>' + products[i].price + '</td>';
        var stockTd = '<td>' + products[i].stock + '</td>';

        if (products[i].stock > 0) {
            var purchaseTd = '<td><button class="btn btn-primary btn-purchase" id="' + products[i]._id + '">Purchase</button></td>';
        } else {
            var purchaseTd = '<td><button class="btn" disabled="true">Not Avaliable</button></td>';
        }

        $('<tr>').html(nameTd + priceTd + stockTd + purchaseTd).appendTo('#product-table');
    }

    $('.btn-purchase').click(function(e) {
        alert("Product added to shopping cart.");
        var productId = $(e.target).attr('id');
        cart[productId] = 1;
        // store shopping cart in cookie
        document.cookie = "cart=" + JSON.stringify(cart);
        updateView();
    });

    updateCartView();
}

function updateCartView() {
    if (Object.keys(cart).length === 0 || products.length === 0 || $('.shopping-cart').length === 0) {
        return;
    }

    for (var key in cart) {
        var button =  '<div class="buttons"><span class="delete-btn"></span></div>';
        var image = '<div><img class="product-image" src="' + productsMap[key].imageUrl + '" alt="" /></div>';
        var description = '<div class="description"><span>Common Projects</span><span>Bball High</span><span>White</span></div>';
        var quantity = '<div class="quantity"><button class="plus-btn" type="button" name="button"><img src="plus.svg" alt="" /></button><input type="text" name="name" value="1"><button class="minus-btn" type="button" name="button"><img src="minus.svg" alt="" /></button></div>';
        var price = '<div class="total-price">$549</div>'
        var item = '<div class="item">' + button + image + description + quantity + price + '</div>';
        $('.shopping-cart').append(item);
    }

}

// $.ajax({
//     url: "http://open-commerce.herokuapp.com/api/products/58997f671036ad1e3bea0691" + '?token=' + token,
//     type: "PUT",
//     data: {
//         name: "Front-end Development", 
//         description: "An awesome course!", 
//         price: 998, 
//         stock: 100
//     },
//     success: function(res) {
//         console.log(res);
//         // products = res;
//     },
//     error: function(err) {
//         console.log(err);
//     }
// })

$(document).ready(function() {
    $("#loginBtn").click(function(event) {
        event.preventDefault();
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
                        token = res.token;
                        updateView();
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

    $("#signupBtn").click(function(event) {
        event.preventDefault();
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

    $("#logoutNav").click(function(event) {
        event.preventDefault();
        deleteCookie('x-access-token');
        deleteCookie('cart');
        token = undefined;
        updateView();
        window.location.href = "/movie/index.html";
    });

    token = getCookie('x-access-token')
    getProducts();
    updateView();

})