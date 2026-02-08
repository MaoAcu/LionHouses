const modal = document.getElementById('contactModal');

function showModalContact(title, message) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    modal.style.display = 'flex';
}

function closeModalContact() {
    modal.style.display = 'none';
}