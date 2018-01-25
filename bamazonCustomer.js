var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Welcome01*",
  database: "bamazondb"
});


connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  BuyItem();
});


function BuyItem(){ 

	// request details from all available items to purchase from 
	connection.query("SELECT * FROM products", function(err, results) {
   		if (err) throw err;
	// once they have this info, prompt what they would like to purchase
		inquirer.prompt([
			{ 
				name: "choice", 
				type: "rawlist", 
				// function that provides list of items 
	        	choices: function() {
	            	var choiceArray = [];
	            	for (var i = 0; i < results.length; i++) {
						choiceArray.push('Product ' + results[i].product_name + '\t' + 'Department ' + results[i].department_name 
							+ '\t' + 'Price '+ results[i].price + '\t' + 'Units Available ' + results[i].stock_quantity);
					}

					return choiceArray; 
				}, 
				// asks what they would like to purchase. 
				message: "What item would you like to purchase?"
			}

		]).then(function(answer){ 
			var chosenItem; 
			for(var i = 0; results.length; i++){
				if (results[i].id === answer.choice){ 
					chosenItem = answer; 
				}

			}
			if (results[i].stock_quantity < chosenItem){
				console.log("Stock Is Available");
				// results[i].stock_quantity--; 
			} else { 
				console.log("Insuficient quantity");
			}

		})


	})


}

