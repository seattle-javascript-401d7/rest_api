const Router = require('express').Router;
const Mug = require(__dirname + '/../models/mug');
const bodyParser = require('body-parser').json();
const eH = require(__dirname + '/../lib/error_handler.js');
var mugRouter = module.exports = Router();

mugRouter.post('/mugs', bodyParser, (req, res)=>{
  var newMug = new Mug(req.body);
  newMug.save((err, data)=>{
    if(err) return eH(err, res);
    res.status(200).json(data);
  });
});

mugRouter.get('/mugs', (req, res)=>{
  Mug.find(null, (err, data)=>{
    if(err) return eH(err,res);
    res.status(200).json(data);
  });
});


 mugRouter.put('/mugs/:id', bodyParser, (req, res)=>{
  var muglData = req.body;
  delete muglData._id;
  Mug.update({_id: req.params.id}, mugData, (err)=>{
    if(err) return eH(err, res);
    res.status(200).json({msg:'Mugs updated'});
  });
});



mugRouter.delete('/mugs/:id', (req, res)=>{
  Mugs.remove({_id: req.params.id}, (err)=>{
    if(err) return eH(err, res);
    res.status(200).json({msg:"Mugs record deleted"});
  });
});
