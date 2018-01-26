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
  AskQuestion();	
});


function AskQuestion(){ 

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
						choiceArray.push('Product: ' + results[i].product_name + '\t' + 'Department: ' + results[i].department_name 
							+ '\t' + 'Price: $'+ results[i].price + '\t' + 'Units Available: ' + results[i].stock_quantity);
					}

					return choiceArray; 
				}, 
				// asks what they would like to purchase. 
				message: "What item would you like to purchase?"
			}

		]).then(function(answer){ 
			switch(answer.choice){
			}
			buyItem();
		})
	})
}

function buyItem(){ 
	inquirer.prompt({ 
		name: "units", 
		type: "input", 
		message: "How many units would you like to buy?"
		// validate: function(remaining){
		// 	if (isNaN(remaining) === false){
		// 		return true; 
		// 	}
		// 	    return false; 
		// }

	}).then(function(answer){ 
		console.log(answer.units); 
		connection.query("UPDATE products SET stock_quantity = stock_quantity - tosubtract", { 
			function(error){ 
				if (error) throw error; 
				console.log("Thanks for doing business with us!"); 
			}

		})

	})

}

