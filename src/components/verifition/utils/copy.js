import Clipboard from 'clipboard';
import { Notify } from 'vant';
export default {
    clipboardSuccess(){
        Notify({
            type: 'success',
            message: '复制成功',
        });
    },

    clipboardError() {
        Notify({
            type: 'danger',
            message: '复制失败',
        });
    },

    handleClipboard(text, event, onSuccess, onError) {
        event = event || {};
        const clipboard = new Clipboard(event.target, {
            text: () => text,
        });
        clipboard.on('success', () => {
            onSuccess ? onSuccess() : clipboardSuccess();
            clipboard.off('error');
            clipboard.off('success');
            clipboard.destroy();
        });
        clipboard.on('error', () => {
            onError ? onError() : clipboardError();
            clipboard.off('error');
            clipboard.off('success');
            clipboard.destroy();
        });
        clipboard.onClick(event);
    },
}