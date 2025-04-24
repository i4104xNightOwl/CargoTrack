import { IView } from "@interfaces/http/handlers";

export default new class CustomerRouter {

    index() { 
        const route: IView = {
            url: "/customer",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/customer");
            }
        }

        return route;
    }

} 