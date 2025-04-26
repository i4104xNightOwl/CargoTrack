import { App } from "./http/app";

import homeRouter from "./views/pages/home";
import loginRouter from "./views/pages/login";
import employeeRouter from "./views/pages/employee";
import cargoUpRouter from "./views/pages/cargo-up";
import cargoDownRouter from "./views/pages/cargo-down";
import truckRouter from "./views/pages/truck";
import customerRouter from "./views/pages/customer";

const app = new App();

app.registerView(homeRouter.index());
app.registerView(loginRouter.index());
app.registerView(employeeRouter.index());
app.registerView(truckRouter.index());
app.registerView(customerRouter.index());

app.registerView(cargoUpRouter.index());
app.registerView(cargoDownRouter.index());

(async () => {
    app.listen(3003);
    await app.start();
})();

