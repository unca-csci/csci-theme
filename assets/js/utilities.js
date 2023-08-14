export default {
    showSpinner: function (parent, message='Loading...') {
        parent.innerHTML = `
            <div class="loading fa-3x">
                <i class="fa-solid fa-circle-notch fa-spin"></i>
                <p>${message}</p>
            </div>
        `;
    },

    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();
      
        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }
}