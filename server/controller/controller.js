var LinkDb = require('../models/links');
var mongoose = require('mongoose');
const { innerText } = require('domutils');
const { default: puppeteer } = require('puppeteer');
const fs= require('fs');


// create and save new links 

exports.createLink = async (req, res) => {
    try {
      const { titulo, url, descricao } = req.body;
      const  link=new LinkDb({
        titulo,
        url,
        descricao
       
      });
      const savedlink = await link.save();
  
      res.redirect('/');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// fetch and return  links 
exports.findLink = async (req, res) => {
    try {
      
      const link = await LinkDb.find();
      res.status(200).json(link);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  //to get just one link by id
  exports.getSingleLink = async (req, res) => {
   
  try {
    const { id } = req.params;
    const checkId= mongoose.Types.ObjectId(id)
    const link = await LinkDb.find({_id:checkId});
      res.status(200).json(link); 
    
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// update link specified link id
exports.update = async (req, res) => {
  
    const { id } = req.params;
    const changes = req.body
    if(changes.titulo){  
      try{
          
        const updatedLink = await LinkDb.findByIdAndUpdate(
          id,
          changes,
          { new: true }
        )
        await updatedLink.save();
        
        res.status(200).json(updatedLink);
        
      } catch{
        res.status(404).json({ message:"did not update"})
      }
  }

};

// detele links with specified link id
exports.delete= async (req,res)=>{
  const id  = req.params;
  const changes = req.body
  const link = LinkDb.findOne({_id:mongoose.Types.ObjectId(id)});
 
  if(!link){
    res.status(404).json({ message:"did not find link"})
    return
  }else{
    try{
      await LinkDb.findOneAndDelete(link)
     
 
     res.status(200).json({message:`success${id}`});
   } catch{
     res.status(404).json({ message:"did not delete"})
   }
  }
       

}

async function scrape(){
    
  const urlink ="https://devgo.com.br/"
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  await page.goto(urlink);
  
  const urlList=await page.evaluate(()=>{
      //this will be executed in the browser

      //will get every url on the table
      const nodeList = document.querySelectorAll('h4 > a');

      //transform nodelist in array
      const urlArray = [...nodeList];
      
      //transform those nodes in objects js
      const listTexts = urlArray.map(a=>(
          a.innerText))
        
      const listHref= urlArray.map(a=>(
          a.href))

          //
    var result = listTexts.map((titulo, i) => ({
      titulo,
      url: listHref[i]
    }))
        
    return result
  })
  /*storing all data scraped to a file */
  var wstream = fs.writeFileSync('./links.json', JSON.stringify(urlList, null,1 ), 
  err =>{if (err)throw new Error("something went wrong")})
  wstream.end();
 
  await browser.close();
}
//scrape()


const importData = async () => {
  try {/*saving all data wrote in the file to our db */
    const data = JSON.parse(fs.readFileSync('./links.json', 'utf-8'))
    
    for(var i=0; i<data.length; i++) {
      if(data[i].titulo){
        await LinkDb.create({
          titulo:data[i].titulo,
          url:data[i].url,
        })
      }
    }
    // to exit the process
    process.exit()
  } catch (error) {
    console.log('error', error)
  }
  
 }
//importData()