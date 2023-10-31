const express = require('express');
const router = express.Router();
const Post = require('../models/Post')


router.get('', async (req, res) => {
   try {
    const locals = {
        title: "Nodejs Blog",
        description: "Simple Blog created with Nodejs, Express & MongoDb"
    }
    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', { 
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
    });

  } catch (error) {
    console.log(error);
  }
    
})


router.get('/post/:id', async (req, res) => {
    try {
      let slug = req.params.id;
  
      const data = await Post.findById({ _id: slug });
  
      const locals = {
        title: data.title,
        description: "Simple Blog created with NodeJs, Express & MongoDb.",
      }
  
      res.render('post', { 
        locals,
        data,
        currentRoute: `/post/${slug}`
      });
    } catch (error) {
      console.log(error);
    }
  
  });



  router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Seach",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });
  
router.get('/about', async (req, res) => {
    res.render("about")
})



// router.get('/post/:id', async (req, res) => {
//     const locals = {
//         title: "Nodejs Blog",
//         description: "Simple Blog created with Nodejs, Express & MongoDb"
//     }

//     try {
//         const data = await Post.find();
//         res.render('index', { locals, data })
//     } catch (error) {
//         console.log(error)
//     }
    
// })
// router.get('/about', (req, res) => {
//     res.render("about")
// })











module.exports = router;

// function insertPostdata() {
//     Post.insertMany([
//         {
//             title: "Building a blog",
//             body: "This is the blog Body",
//             author: "Folarin stephen",
//             state: "draft"
           
//     },
//         {
//             title: "Asynchronous Programming",
//             body: "This is the blog Body",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Build Real time event driven application Nodejs",
//             body: "This is the blog Body",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Limiting Traffic with Nodejs",
//             body: "This is the blog Body",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Learn basics of Nodejs and its architecture",
//             body: "This is the blog Body",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Learn morgan - HTTP Request Logger for Nodejs",
//             body: "Learn Morgan",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Learn HTML & CSS modern techniques",
//             body: "Techniques of html and css in the modern world. responsive design",
//             author: "Folarin stephen",
//             state: "draft"
//     },
//         {
//             title: "Basics of Javascript with Stephen",
//             body: "Javascript to mastery",
//             author: "Folarin stephen",
//             state: "draft"
//     }
// ])
// }

// insertPostdata()