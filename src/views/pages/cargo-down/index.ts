import { IView } from "@interface/http/handlers";

class CargoDownRouter {
    index(): IView {
        const route: IView = {
            url: "/cargo-down",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/cargo-down");
            }
        }

        return route;
    }
}

export default new CargoDownRouter();