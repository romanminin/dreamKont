// const Toast = (() => {
//     const container = (() => {
//         let c = document.getElementById('toast-container');
//         if (!c) {
//             c = document.createElement('div');
//             c.id = 'toast-container';
//             document.body.appendChild(c);
//         }
//         return c;
//     })();

//     function show(msg, type = 'success', delay = 4000) {
//         const toast = document.createElement('div');
//         toast.className = 'toast toast--' + type;
//         toast.innerHTML =
//             '<span class="toast__close" onclick="this.parentElement.remove()">&times;</span>' +
//             msg;
//         container.appendChild(toast);

//         /* анимируем появление */
//         setTimeout(() => toast.classList.add('show'), 10);

//         /* автоматически убираем через delay мс */
//         if (delay) setTimeout(() => {
//             toast.classList.remove('show');
//             toast.addEventListener('transitionend', () => toast.remove());
//         }, delay);
//     }

//     return { success: m => show(m, 'success'),
//              error:  m => show(m, 'error'),
//              info:   m => show(m, 'info') };
// })();
window.Toast = (() => {
    const container = (() => {
        let c = document.getElementById('toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'toast-container';
            document.body.appendChild(c);
        }
        return c;
    })();

    function show(msg, type = 'success', delay = 4000) {
        const toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.innerHTML =
            '<span class="toast__close" onclick="this.parentElement.remove()">&times;</span>' +
            msg;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        if (delay) setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, delay);
    }

    return {
        success: m => show(m, 'success'),
        error: m => show(m, 'error'),
        info: m => show(m, 'info')
    };
})();

