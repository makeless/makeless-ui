import {VueRouter} from "vue-router/types/router";
import Page from "../pages/page";

export default interface Router {
    mode: string;
    base: string;

    createRouter(pages: Page[]): VueRouter;
}
