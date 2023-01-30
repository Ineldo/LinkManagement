const mongoose= require('mongoose');

//creation of database schema
const linkSchema = new mongoose.Schema({
    
    titulo: {
        type: 'string',
        required: true
    },
    url: {
        type: 'string',
        required: true,
    },
    descricao: {
        type: 'string',
        required: false
    }
})

const LinkDb = mongoose.model("links", linkSchema);
module.exports=LinkDb;