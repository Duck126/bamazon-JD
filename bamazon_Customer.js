var mysql = require("mysql");
var inquire = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "root",
    database: "bamazon_db"
});

//Connection to our SQL DB.
connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("connected as id " + connection.threadId);
    readItems();
    shoppingCart();
});

//This is our shopping cart, itemCart holds all items selected by the user as objects.
var itemCart = [];
// cartQuant holds the quantity of items selected by the user specific to each item chosen.
var cartQuant = [];

// Reads all the Items in Bamazon and logs them to the console!
function readItems() {
    console.log("Getting Items for sale... \n");
    query = connection.query("Select * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
            console.log(
                "\nID: " +
                res[i].item_id +
                "  || ITEM: " +
                res[i].product_name +
                "  || PRICE: " +
                res[i].price
            );
        };
    })
}

//shoppingCart will run until the user has purchased all desired items to checkout. 
function shoppingCart() {
    console.log("<<<<<<<<< STORE >>>>>>>>>>>");
    inquire.prompt([{
            message: "Enter product ID you would like to purchase",
            type: "input",
            name: "userItems"
        },
        {
            message: "Enter Quantity",
            type: "input",
            name: "userQuantity"
        }
    ]).then(function (answers) {
        var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
        connection.query(query, {
            item_id: answers.userItems
        }, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < answers.userQuantity) {
                    console.log("Sorry we only have " + res[i].stock_quantity + " in stock. But check back soon!");
                    shoppingCart();
                } else {
                    itemCart.push(res[i]);
                    cartQuant.push(parseInt(answers.userQuantity));
                    continueShopping();
                };
            };
        });
    });
};

//Each time the user selects an item they will be prompted to either continue shopping or checkout.
function continueShopping() {
    inquire.prompt([{
        message: "Checkout or Continue Shopping?",
        type: "list",
        name: "continue",
        choices: ["Continue", "Go to checkout"]
    }]).then(function (ans) {
        if (ans.continue === "Continue") {
            console.log(" Items Added to Cart!");
            shoppingCart();
        } else if (ans.continue === "Go to checkout") {
            checkOut(itemCart, cartQuant);
        }
    });
};

//Our checkOut function loops through cartQuant and itemCart arrays to find the total cost of all items + tax.
function checkOut(itemCart, cartQuant) {
    var orderTotal = 0;
    console.log("<-------------------- CHECKOUT----------------->");
    for (var i = 0; i < itemCart.length; i++) {
        console.log("\n\nProduct:  " + itemCart[i].product_name + "\n\nQuantity:  x" + cartQuant[i]);
        orderTotal += parseFloat((itemCart[i].price * cartQuant[i]).toFixed(2));
        updateStock(itemCart, cartQuant, i);
    }
    var salesTax = parseFloat((orderTotal * .0625).toFixed(2));

    var orderWithTax = parseFloat((orderTotal + salesTax).toFixed(2));

    console.log("\nSale Price: $" + orderTotal);
    console.log("\nSales Tax: +$" + salesTax);
    console.log("_____________________")
    console.log("\nOrder Total: $" + orderWithTax);
    console.log("\nStock Updated!");
    console.log("\nThank you for your purchase!");
    console.log("\nCtrl + C to exit store.")
};

// The updateStock function is passed the same variables from the checkout function and updates the stock in products table.
function updateStock(itemCart, cartQuant, i) {
    var updatedStock = parseInt(itemCart[i].stock_quantity -= cartQuant[i]);
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: itemCart[i].stock_quantity
            },
            {
                item_id: itemCart[i].item_id
            }
        ],
        function (err, response) {
        }
    )
}