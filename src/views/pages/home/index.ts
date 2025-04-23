import { IView } from "@interface/http/handlers";

export default new class HomeRouter {

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
