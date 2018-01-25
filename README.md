# bamazonCustomer.js
Created an MySQL Database called bamazon.
Then created a Table inside of that database called products.
The products table have each of the following columns:



item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

Created a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Included the ids, names, and prices of products for sale.
The app will then prompt users with two messages.

The first will ask them the ID of the product they would like to buy.
The second message will ask how many units of the product they would like to buy.


Once the customer has placed the order, this application will check if your store has enough of the product to meet the customer's request.

If not, the app will log a phrase Insufficient quantity!, and then prevent the order from going through.


However, if the store does have enough of the product, the app will fulfill the customer's order.


This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, app will show the customer the total cost of their purchase.




