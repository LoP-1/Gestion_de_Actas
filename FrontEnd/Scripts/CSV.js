        document.getElementById('csvForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const fileInput = document.getElementById('csvFile');
            if (!fileInput.files.length) return;
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(msg => {
                document.getElementById('msg').innerText = msg;
                document.getElementById('msg').classList.toggle('error', !msg.includes('correctamente'));
            })
            .catch(err => {
                document.getElementById('msg').innerText = 'Error al subir el archivo';
                document.getElementById('msg').classList.add('error');
            });
        });