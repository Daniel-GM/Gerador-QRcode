document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('altura').value = parseFloat(window.config.height);
    document.getElementById('altura-value').textContent = `: ${window.config.height}`;

    document.getElementById('largura').value = parseFloat(window.config.width);
    document.getElementById('largura-value').textContent = `: ${window.config.width}`;

    document.getElementById('altura').addEventListener('input', (event) => {
        updateHeight(event.target.value);
    });

    document.getElementById('largura').addEventListener('input', (event) => {
        updateWidth(event.target.value);
    });
});

function updateHeight(value) {
    window.config.height = `${value}px`;
    document.getElementById('altura-value').textContent = `: ${window.config.height}`;
}

function updateWidth(value) {
    window.config.width = `${value}px`;
    document.getElementById('largura-value').textContent = `: ${window.config.width}`;
}

window.updateHeight = updateHeight;
window.updateWidth = updateWidth;
