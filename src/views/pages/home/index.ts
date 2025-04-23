import { IView } from "@interface/http/handlers";

class HomeRouter {

    index(): IView {
        const route: IView = {
            url: "/",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/home");
            }
        }

        return route;
    }
}

export default new HomeRouter();