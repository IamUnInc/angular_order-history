var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';


router.get('/', function (req, res){
	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
		}
		client.query('SELECT COUNT(orders.id),customers.last_name, customers.first_name, customers.id FROM orders ' +
                 'RIGHT JOIN addresses ON addresses.id = orders.address_id ' +
                 'RIGHT JOIN customers ON customers.id = addresses.customer_id ' +
                 'GROUP BY customers.id;', function (err, results){
			done();
			if(err) {
				res.sendStatus(500);
			}
			res.send(results.rows);
		});
	});

});

router.get('/:id', function (req, res){
	var id = req.params.id;
	pg.connect(connectionString, function (err, client, done){
		if (err) {
			res.sendStatus(500);
		}
		client.query('SELECT * FROM orders ' +
									'RIGHT JOIN addresses ON addresses.id = orders.address_id ' +
									'RIGHT JOIN customers ON customers.id = addresses.customer_id ' +
									'JOIN line_items ON line_items.order_id = orders.id ' +
									'JOIN products ON products.id = line_items.product_id ' +
									'WHERE customers.id = $1; ',
		               [id],
		function (err, results){
			done();
			if(err) {
				res.sendStatus(500);
			}
			// console.log('results', results.rows);
			res.send(results.rows);
		});
	});

});

// router.post('/', function (req, res){
// 	var thing = req.body;
// 	console.log('This si the data from the client', thing);

// 	res.sendStatus(200);
// });
//



module.exports = router;
