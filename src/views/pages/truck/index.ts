import { IView } from "@interfaces/http/handlers"

export default new class TruckRouter {

    index(): IView {
        const route: IView = {
            url: "/truck",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                res.render("pages/truck")
            }
        }
        return route;
    }
}