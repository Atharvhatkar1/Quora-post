const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Apnacollege",
        title: "Welcome to Apna College",
        content: "This is a platform to learn and skillup."
    },
    {
        id: uuidv4(),
        username: "Atharv Hatkar",
        title: "Welcome to Apna ghar",
        content: "This is a platform to live and grow!"
    },
    {
        id: uuidv4(),
        username: "Tunaan",
        title: "Welcome to Apna gaon",
        content: "This is a platform to learn and explore!"
    }
]

app.get("/", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    const { username, email, password, content } = req.body;
    const newPost = { username, email, password, content };
    let newId = uuidv4();
    posts.push({ ...newPost, id: newId });
    res.redirect("/");
     
    console.log(req.body);
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        const { username, email, password, content } = req.body;
        post.username = username;
        post.email = email;
        post.password = password;
        post.content = content;
        res.redirect(`/posts/${id}`);
    } else {
        res.status(404).send("Post not found");
    }
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.status(404).send("Post not found");
    }
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.send("Post deleted");
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})