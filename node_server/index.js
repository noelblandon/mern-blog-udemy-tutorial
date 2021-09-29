const express = require("express");
const app  = express(); 
const cors = require('cors');
const morgan = require('morgan');
const mongoConnect = require('./config/mongoose.config');
const PostModel = require('./models/articles');
require('dotenv').config();
const PORT = process.env.port_number || 8080;
//config
app.use(cors());
app.options('*', cors());


//middleware
app.use(express.json());
app.use(morgan('tiny'));


app.get('/', async (req,res) => {
  const posts = await PostModel.find();
  console.log(posts);  
  res.send(posts);
});

app.post('/', async (req,res) => {
    const post = new PostModel({
      title:  "React",
      author: "WebAdmin",
      body:   "React es framework front-end desarrollado por facebook",
      comments: [{ body: "numero uno", date: new Date().toJSON().slice(0,10).replace(/-/g,'/') }]
    });


    
    await post.save(function (err) {
      if (err) return handleError(err);
      // saved!
    });

  console.log(post);  
  res.status(200).json({data:post});
});

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
    client.close();
  }, res);
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    mongoConnect.init();
});

