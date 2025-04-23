import { IView } from "@interface/http/handlers";

export default new class CargoUpRouter {
    index(): IView {
        const route: IView = {
            url: "/cargo-up",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/cargo-up");
            }
        }    

        return route;
    }
}