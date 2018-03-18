var categoryController = require('../controllers/category');
var productController = require('../controllers/product');

module.exports = function(app) {
    app.all('/*', function(req, res, next){
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization,cache-control');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    })

    // HOME PAGE (with login links)
    app.get('/', function(req, res,next) {
      return res.sendFile(path.join(__dirname + '/templateLogReg/index.html'));
    });
    
    /** Login, sighnup and Reset password URL generate here.  */
    app.post('/addcategory', categoryController.add);
    app.post('/updatecategory', categoryController.update);
    app.get('/getcateory', categoryController.get);
    app.get('/deletecategory', categoryController.delete);
    app.post('/addproduct', productController.add);
    app.post('/updateproduct', productController.update);
    app.get('/deleteproduct', productController.delete);
    app.get('/getproductlist', productController.get);
};

function isLoggedIn(req, res, next) {
    if (req.session.userId){
        console.log(req.session.userId);
        next();
    }else{
        return res.status(500).send({status:false, message: 'SESSION_EXPIRED'});
    }
}