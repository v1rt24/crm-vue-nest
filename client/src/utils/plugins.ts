import {App} from 'vue';

declare const M: { toast: Function };

export default {
    install(app: App, options: any) {
        app.config.globalProperties.$successMessage = (html: string) => {
            M.toast({html});
        };

        app.config.globalProperties.$errorMessage = (text: string) => {
            M.toast({html: `[Ошибка]: ${text}`});
        };
    },
};