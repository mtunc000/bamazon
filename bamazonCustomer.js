var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  connection.query("SELECT*FROM products", function (err, res) {
    // console.log("item_id" + "  "+"product_name"+"  "  + "department_name" +"  "+ "price" +"  " +"stock_quantity" )

    // for (i=0; i<res.length; i++) {

    //     console.log(res[i].item_id +"        "+ res[i].product_name + "      "+res[i].department_name +"      " +res[i].price + "          " + res[i].stock_quantity);
    // }
    // console.log(res);
    //  connection.end();
    // bamazon();


    var table = new Table({
      head: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'],
      colWidths: [10, 20, 20, 20, 20]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (i = 0; i < res.length; i++) {

      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );

    }

    console.log(table.toString());
    //connection.end();
  });
  //bamazon();
});

 


// connection.connect(function(err) {
//   if (err) throw err;
//   // run the start function after the connection is made to prompt the user
  start();
// });

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "buyOrSell",
      type: "rawlist",
      message: "Would you like to [BUY] an auction or [Sell] on an auction?",
      choices: ["BUY", "SELL"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.buyOrSell.toUpperCase() === "BUY") {
        buyItem();
      }
      else {
        sellItem();
      }
    });
}



// function buyItem() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM products", function(err,res) {
    //if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    // inquirer
    // .prompt({
    //   name: "choice",
    //   type: "rawlist",
    //   message: "Which item would you like to buy?",
    //   choices: ["1", "2","3","4","5","6","7","8","9","10"]
    // })
    // .then(function(answer) {
    //   // based on their answer, either call the bid or the post functions
    //   if (choices === "1") {
    //     item1();
    //   }
    //   else if (choices === "2") {
    //     item2();  
    //   }
    //   else if (answer.whichItem() === "3") {
    //     item3();  
    //   }
    //   else if (answer.whichItem() === "4") {
    //     item4();  
    //   }
    //   else if (answer.whichItem() === "5") {
    //     item5();  
    //   }
    //   else if (answer.whichItem() === "6") {
    //     item6();  
    //   }
    //   else if (answer.whichItem() === "7") {
    //     item7();  
    //   }
    //   else if (answer.whichItem() === "8") {
    //     item8();  
    //   }
    //   else if (answer.whichItem() === "9") {
    //     item9();  
    //   }
    //   else if (answer.whichItem() === "10") {
    //     item10();  
    //   }

    // });
  


// function to handle posting new items up for auction
function sellItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item_id you would like to submit?"
      },
      {
        name: "product",
        type: "input",
        message: "What is the product name would you like to sell in bamazon?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the department name would you like to place your item?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of your item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
         return false;
        }
      },
      
        {
          name: "stock",
          type: "input",
          message: "how many items do you have in your stock?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
           return false;
          }
        },
      
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          item_id: answer.item,
          product_name: answer.product,
          department_name:answer.department,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your item was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
      connection.end();
    });
}



//////////////////////////////////
function buyItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item_id you would like to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
         return false;
        }
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of your item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
         return false;
        },
      },

      {
        name: "stock",
        type: "input",
        message: "how many items do you have in your stock?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
         return false;
        }
      },
    
      {
        name: "amount",
        type: "input",
        message: "How many would you like  to buy?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
         return false;
        }
      },
      
      
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "SELECT * FROM products ",
        {
          item_id: answer.item,
          price: answer.price,
          //stock_quantity: answer.stock,
         
          amount: answer.amount,
          
        },
        
        function(err) {
          if (err) throw err;
           let total = 0;
           total += answer.price * answer.amount
          console.log("There is a glitch in our system please try again later!");
          // re-prompt the user for if they want to bid or post
          start();
        })      
        connection.end();
    });
}

    
    