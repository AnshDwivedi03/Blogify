const {Schema,model, SchemaType}= require('mongoose');

const blogSchema= new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
       type:String,
        require:true
    },
    coverImageURL:{
        type:String,
        require:false
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        // comes from user schema
        ref:'user'
    }
},{timestamps:true});

const Blog= model('blog',blogSchema);

module.exports= Blog;