function openModal(type) {
    const modal = document.getElementById("infoModal");
    const title = document.getElementById("modalTitle");
    const text = document.getElementById("modalText");
    const icon = document.getElementById("modalIcon");

    switch(type) {
        case 'servicios':
            title.innerText = i18n.data.about.modal_services_title;
            text.innerText = i18n.data.about.modal_services_text;
            icon.innerText = "💼";
            break;

        case 'anfitrion':
            title.innerText = i18n.data.about.modal_host_title;
            text.innerText = i18n.data.about.modal_host_text;
            icon.innerText = "🐶";
            break;

        case 'guia':
            title.innerText = i18n.data.about.modal_guide_title;
            text.innerText = i18n.data.about.modal_guide_text;
            icon.innerText = "📍";
            break;
    }

    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
}

window.onclick = function(e) {
    const modal = document.getElementById("infoModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
};