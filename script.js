// Capture Form Data
document.getElementById('capture-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const patient = document.getElementById('patientName').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const discipline = document.getElementById('discipline').value;
    const doctor = document.getElementById('doctor').value;
    const admitted = document.getElementById('admitted').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const day = document.getElementById('day').value;
    const remarks = document.getElementById('remarks').value;
    const stickerId = document.getElementById('stickerId').value;

    const tableBody = document.querySelector('#data-table tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${patient}</td>
        <td>${diagnosis}</td>
        <td>${discipline}</td>
        <td>${doctor}</td>
        <td>${admitted}</td>
        <td>${admissionDate}</td>
        <td>${day}</td>
        <td>${remarks}</td>
        <td>${stickerId}</td>
    `;

    tableBody.appendChild(row);
    this.reset();
    document.getElementById("reader").innerHTML = ""; // clear scanner if left open
});

// Search Feature
document.getElementById('searchBox').addEventListener('keyup', function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('#data-table tbody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
});

// QR Code Scanner
function startScan() {
    const html5QrCode = new Html5Qrcode("reader");

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            html5QrCode.start(
                cameraId,
                { fps: 10, qrbox: 250 },
                decodedText => {
                    document.getElementById('stickerId').value = decodedText;
                    html5QrCode.stop().then(() => {
                        document.getElementById("reader").innerHTML = "";
                    });
                },
                error => {
                    // Optional: console.log("Scan error", error);
                }
            ).catch(err => {
                console.error("Start failed", err);
            });
        }
    }).catch(err => {
        console.error("Camera error", err);
    });
}
