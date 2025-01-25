import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:3001";

// Add EJS setup
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/blogs`);
        res.render("index.ejs", { blogs: response.data });    
    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).render("error.ejs", { message: "Error fetching blogs" });
    }
});

app.get("/create", (req,res) => {
    res.render("modify.ejs", {heading: "create blog", submit: "create"});
});

app.get("/edit/:id", async (req,res) => {
    try {
    const response = await axios.get(`${API_URL}/blogs/${req.params.id}`);
    res.render("modify.ejs", {
        heading: "Edit blog",
        submit: "edit",
        blog : response.data,
    });
} catch(error) {
    res.status(400).json({message: "Error fetching blog"});
}
});

app.post("/api/blogs", async (req,res) => {
    try {
        const response = await axios.post(`${API_URL}/blogs`, req.body);
        res.redirect("/");
    }
    catch (error) {
        res.status(400).json({message: "Error creating blog"});
    }
});

app.post("/api/blogs/:id", async (req,res) => {
    
    try {
         const response = await axios.patch(
            `${API_URL}/blogs/${req.params.id}`,
            req.body
         );
         res.redirect("/");
    }
    catch(error) {
        res.status(400).json({message: "Error updating blog"});

    }
} );

// Add this route to handle single blog view
app.get("/blogs/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/blogs/${req.params.id}`);
        res.render("blog.ejs", { blog: response.data });
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).render("error.ejs", { message: "Error fetching blog" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
