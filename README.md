# bamazon-JD

    Bamazon-JD is a mock store built with a node.js CLI and a mySQL database. Bamazon allows the client or "user" to select multiple items offered
once the user is finished selecting the desired items the user can then simply checkout, the total cost of all the items the user selected will be 
added together along with the sales tax for that total. After each checkout the quantity of items purchased will be deducted from stock_quantity in the products table of our database, ensuring the stock of each item is always up to date.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### User Demo

A step by step series of examples that tell you have to get a development env running

1. Using GitBash while located in the Bamazon folder type "node bamazon_Customer.js" to start the program. The result should look like this ->

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/init.png)

2. Once inside the Store you will be presented with a list of Items for Sale. Each will have an ID and Price listed with it.
You will be prompted to choose an item you would like to purchase by entering the ID of the product which is listed on the left hand side.
Enter any 1-10.

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/pickItem.png)

3. After you select an item you will then be prompted to select how many of that item you would like to purchase. If there isn't enough in stock for your order the message "Sorry we only have [Available Stock] in stock. But check back soon!" will display on the console and you will be returned to Step 2.

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/tooMany.png)

Else if bamazon is able to complete your order You will move on to Step 4.



4. After selecting quantity you will be prompted to either continue shopping or proceed to checkout. 

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/choice.png)

4. A: Continue Shopping will set you back to step 2, where you can choose another item to add to your cart.

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/continue.png)

5. If you chose to Checkout... the total cost of the items you chose should be logged to the console.

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/checkout.png)

6. Thats it! The database should be updated during every checkout.

Before Checkout

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/before.png)

After Checkout

![alt text](https://raw.githubusercontent.com/Duck126/bamazon-JD/dev-branch/images/after.png)










