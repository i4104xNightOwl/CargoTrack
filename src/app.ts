import App from "./http/app";

import homeRouter from "./views/pages/home";
import loginRouter from "./views/pages/login";
import employeeRouter from "./views/pages/employee";
import cargoDownRouter from "./views/pages/cargo-down";

const app = new App();

app.registerView(homeRouter.index());
app.registerView(loginRouter.index());
app.registerView(employeeRouter.index());
app.registerView(cargoDownRouter.index());

(async () => {
    app.listen(3003);
    await app.start();
})();

