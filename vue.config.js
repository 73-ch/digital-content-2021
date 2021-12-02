module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/styles/_variable.scss";
                `
            }
        }
    }
}