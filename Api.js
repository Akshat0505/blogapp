import express from "express";
import bodyParser from "body-parser";    
import cors from "cors";

const app = express();
const port = 3001;

// Add CORS middleware
app.use(cors());

let blogs = [
    { 
        id: 1,
        title: "Why cats are the best",
        body: "cats are the best because they are cute and cuddly and they purr also they are very independent and they are very clean and they are very good help for people with anxiety and depression and they can also do anything they want without needing us everytime and they can cook, dance, sing, do yoga they can do anything that they want to do and thats all about cats hope u all liked it cause i am saying to like it thats all about me hope you are getting what i am saying also tell me do you all love me care about me cause everyone hated mefrom the start ohh hoohhh everything is getting better now it think and even if it not then i will maek it",
        author: "catlover"
    },
    {
        id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    body:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",

    },
    {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    body:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green"
    },
    {
        id: 4,
    title: "The Rise of Decentralized Finance",
    body:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    },
];

let lastId = 4;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add a root route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Blog API" });
});

app.get("/blogs" , (req,res) => {
    res.json(blogs);
});

app.get("/blogs/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.find(blog => blog.id === id);
    if(blog) {
        res.json(blog);
    } else {
        res.status(404).json({message: `No blog with id ${id}`});
    }
});

app.post("/blogs", (req,res) => {
    lastId += 1;
    const blog = {
        id: lastId,
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    };

    blogs.push(blog);
    res.json(blog);

});

app.patch("/blogs/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const blog = blogs.find(blog => blog.id == id);
    if(!blog) {
      
        return res.status(400).json({message: `No blog with id ${id}`});
    }
    if (req.body.title) {
        blog.title = req.body.title;
    }
    if (req.body.body) {
        blog.body = req.body.body;
    }
    if (req.body.author) {
        blog.author = req.body.author;
    }
    res.json(blog);
});
app.delete("/blogs/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const index = blogs.findIndex(blog => blog.id === id);
    if(index === -1) {
        return res.status(400).json({message: `No blog with id ${id}`});
    }
    
        blogs.splice(index,1);
        res.json({message: "Blog is deleted"});
    
});

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
    console.log(`API Server is running on http://localhost:${port}`);
});