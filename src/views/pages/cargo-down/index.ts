import { IView } from "@interface/http/handlers";

export default new class CargoDownRouter {
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
