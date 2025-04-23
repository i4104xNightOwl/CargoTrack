import { IView } from "@interface/http/handlers";

class EmployeeRouter {

    index() { 
        const route: IView = {
            url: "/employee",
            middleware: undefined,
            renderView: function (req: any, res: any): void {
                return res.render("pages/employee");
            }
        }

        return route;
    }

}

export default new EmployeeRouter();