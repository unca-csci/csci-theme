export default {
    showSpinner: function (parent, message='Loading...') {
        parent.innerHTML = `
            <div class="loading fa-3x">
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <p>${message}</p>
            </div>
        `;
    }
}