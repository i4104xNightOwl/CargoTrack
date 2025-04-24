import { IView } from "@interfaces/http/handlers";

export default new class LoginRouter {

    index(): IView {
        const route: IView = {
            url: "/login",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/login", { layout: false });
            }
        }

        return route;
    }
}
