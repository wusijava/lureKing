export default{
    getUrlKey: function (name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    getSessionValue: function (name) {
        return sessionStorage.getItem(name);
    },
    setSessionValue: function (name,value) {
        return sessionStorage.setItem(name,value);
    }
}