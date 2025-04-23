import App from "./src/app";

const app = new App();

app.registerView({
    url: "/",
    middleware: undefined,
    renderView: (req, res) => {
        res.render("index");
    }
});

app.registerView({
    url: "/login",
    middleware: undefined,
    renderView: (req, res) => {
        res.render("login", { layout: false });
    }
});

app.registerView({
    url: "/employee-search",
    middleware: undefined,
    renderView: (req, res) => {
        res.render("employee-search");
    }
});


app.registerView({
    url: "/cargo-down",
    middleware: undefined,
    renderView: (req, res) => {
        res.render("cargo-down");
    }
});

(async () => {
    app.listen(3003);
    await app.start();
})();

