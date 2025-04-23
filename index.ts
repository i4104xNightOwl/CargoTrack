import App from "./src/app";

const app = new App();

app.registerView({
    url: "/",
    view: "index",
    middleware: undefined,
    renderView: (req, res) => {
        res.render("index");
    }
});

app.listen(3003);
app.start();