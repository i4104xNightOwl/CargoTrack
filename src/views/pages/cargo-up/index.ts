import { IView } from "@interface/http/handlers";

class CargoUpRouter {
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

export default new CargoUpRouter();