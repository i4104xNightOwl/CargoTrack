import { RequestHandler } from "express";

export interface Request<Header = any, Body = any, Path = any, Parameters = any, Verb = any> {
    header: Header;
    body: Body;
    path: Path;
    params: Parameters;
    verb: Verb;
}

export interface Response<Header = any, Body = any, StatusCode = number> {
    header: Header;
    body: Body;
    statusCode: StatusCode;
}


type ErrorResponse = Response<any, { err: string }, number>;

export interface IView {
    url: string;
    view: string;
    middleware: RequestHandler | undefined;

    /**
     * Render view
     */
    renderView(req: any, res: any): void;
}

export interface IHandler {
    path: string;

    /**
     * Tạo mới một tài nguyên
     * 
     * @param request Yêu cầu HTTP với phương thức POST
     * @returns Promise trả về đối tượng Response chứa thông tin tài nguyên đã tạo hoặc thông báo lỗi
     */
    create(request: Request<any, any, string, undefined, "POST">): Promise<Response<any, any, number> | ErrorResponse>;

    /**
     * Cập nhật thông tin của một tài nguyên theo ID
     * 
     * @param request Yêu cầu HTTP với phương thức PUT và tham số ID
     * @returns Promise trả về đối tượng Response chứa thông tin tài nguyên đã cập nhật hoặc thông báo lỗi
     */
    update(request: Request<any, any, string, { id: number }, "PUT">): Promise<Response<any, any, number> | ErrorResponse>;

    /**
     * Xóa một tài nguyên theo ID
     * 
     * @param request Yêu cầu HTTP với phương thức DELETE và tham số ID
     * @returns Promise trả về đối tượng Response xác nhận xóa thành công hoặc thông báo lỗi
     */
    delete(request: Request<any, any, string, { id: number }, "DELETE">): Promise<Response<any, any, number> | ErrorResponse>;

    /**
     * Lấy danh sách tất cả tài nguyên
     * 
     * @param request Yêu cầu HTTP với phương thức GET
     * @returns Promise trả về đối tượng Response chứa mảng các tài nguyên hoặc thông báo lỗi
     */
    get(request: Request<any, any, string, undefined, "GET">): Promise<Response<Response<any, any, number>, any[], number> | ErrorResponse>;

    /**
     * Lấy thông tin của một tài nguyên theo ID
     * 
     * @param request Yêu cầu HTTP với phương thức GET và tham số ID
     * @returns Promise trả về đối tượng Response chứa thông tin tài nguyên hoặc thông báo lỗi
     */
    getById(request: Request<any, any, string, { id: number }, "GET">): Promise<Response<any, any, number> | ErrorResponse>;
}