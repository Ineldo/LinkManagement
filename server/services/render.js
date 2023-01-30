const axios=require('axios');

 
exports.homeRoutes=(req,res)=>{
    //make a get request to api/link 
    axios.get('http://localhost:5000/api/links')
    .then(function(response){
        res.render('index',{links:response.data});
    })
    .catch(function(err){
        
        res.send(err.message)
    })
   
}
exports.addLink=  (req,res)=>{
    //create link request
    res.render('add-link')
}

exports.updateLink=(req,res)=>{
    //update request
    axios.get('http://localhost:5000/api/links',{_id: req.params._id})
    .then(function(link){
        res.render("update-link", {links:link.data})
    
    }).catch(error=>{
        res.send(error)
    })
}

