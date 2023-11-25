# Assignment-node-express
About the project: Here the project is basically on backend (node.js,express.js,typescript,mongoose)
How to run?
Firstly write 'npm run start:dev' to run the server. Then you see the message: 'Example app listening on port 5000' that means server is running make sure to run 'npm run build' before for typescript which is tsc. MongoDB is connected to store the data.
to see the data,we need to hit the route API by postman.
Here, Select POST then hit 'http://localhost:5000/api/users' To see the users
Here, Select GET then hit 'http://localhost:5000/api/users' To Get the all users
Here, Select GET then hit 'http://localhost:5000/api/users/1' To Get the single users
Here, Select PUT then hit 'http://localhost:5000/api/users/1'To Update the  users
Here, Select DELETE then hit 'http://localhost:5000/api/users/1' To Delete the  users
Here, Select PUT then hit 'http://localhost:5000/api/users/1/orders' To Update the  orders
Here, Select GET then hit 'http://localhost:5000/api/users/1/orders' To Get the  orders
Here, Select GET then hit 'http://localhost:5000/api/users/1/orders/total-price' To Get the  orders price

