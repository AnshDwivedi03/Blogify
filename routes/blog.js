const {Router} = require('express');
const multer=require('multer');
const path=require('path');
const router= Router();
const Blog=require('../models/blogs')
const Comment=require('../models/comments')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName=`${Date.now()}-${file.originalname}`;
    cb(null,fileName);
  },
});
const upload = multer({ storage: storage })

// iss route pr click krne pr tumhre liye sirf page render ho rha 
router.get('/add-new',(req,res)=>{
return res.render('addBlog',{
    user:req.user
});
});

//route forafter submission of photo
router.get('/:id',async(req,res)=>{
      const blog= await Blog.findById(req.params.id).populate('createdBy');
      const comments= await Comment.find( {blogId: req.params.id});
      return res.render('blog',{
        user: req.user,blog,comments
      });
});

// ye route pr tum nahi work kroge kyuki ye to post h na to jb tum fronetend pr jaoge to form action ke karan ye route use ho jaiayaga
router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body}=req.body;
const blog=await Blog.create({
body,title,createdBy:req.user._id,coverImageURL:`/uploads/${req.file.filename}`
});


return res.redirect(`/blog/${blog._id}`);
});



//for comment 
router.post('/comment/:blogId',async(req,res)=>{
const comment= await Comment.create({
  content : req.body.content,
  blogId: req.params.blogId,
  createdBy:req.user._id,
})

  res.redirect(`/blog/${req.params.blogId}`);
});


module.exports=router;