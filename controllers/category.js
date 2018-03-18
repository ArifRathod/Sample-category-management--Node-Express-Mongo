var Category = require('../models/category');
module.exports = {
    add: function(req, res) {
        var query = {
            categoryName : req.body.name
        }
        Category.findOne(query, function(err, category) {
            if(category){
                res.send({ message: 'Category Already Exist !' })
            }else{
                Category.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    res.send({ message: 'Product Created !' })
                });
            }
        });
    },
    update: function(req, res) {
        var query = {
            _id:req.body.id
        };
        delete req.body.id;
        Category.findOneAndUpdate(
            query, 
            {
                $set:req.body
            }, function(err, doc){
            if(err)
                res.status(400).send({ status: false, message: JSON.stringify(err) });
            req.res.status(200).send({status: true, data: doc});
        });
    },
    delete: function(req, res){
        try{
            var query;
            if(req.body.id){
                query = {_id : req.body.id}
            }
            Category.findOne(query, function(err, category) {
                if(category){
                    category.remove(query)
                    .exec(function (error, user) {
                        if (error) {
                            res.status(400).send({ status: false, message: JSON.stringify(error)});
                        } else {
                            res.send({message:"category deleted successfully"});
                        }
                    });
                }else{
                    res.send({message:"category not exit"})
                }
            });
        }catch(e){
            return res.status(400).send({ status: false, message: e })
        }
    },
    get: function(req, res) {
        var query = req.body;
        Category.find(query,function (err, category) {
            if (err) {
                res.send(err);
            }
            res.send(category);
        });
    }
}