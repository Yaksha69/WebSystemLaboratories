// Function to fetch all songs
async function fetchSongs() {
    try {
        const response = await fetch('http://localhost:5000/api/songs/all');
        const data = await response.json();
        updateTable(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to update the table with songs
function updateTable(songs) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    songs.forEach((song, index) => {
        tbody.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${song.Name}</td>
                <td>${song.Artist}</td>
                <td>${song.Albums}</td>
                <td>${song.Date}</td>
                <td>
                    <button type="button" class="btn border-dark btn-secondary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="prepareEdit('${song._id}')">
                        <i class="bi bi-pen"></i>
                    </button>
                    <button class="btn border-dark btn-danger" onclick="deleteSong('${song._id}')">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// Function to add a new song
async function addSong(event) {
    event.preventDefault();
    
    const formData = {
        Name: document.getElementById('Name').value,
        Artist: document.getElementById('Artist').value,
        Albums: document.getElementById('Albums').value,
        Date: parseInt(document.getElementById('Date').value)
    };

    try {
        const response = await fetch('http://localhost:5000/api/songs/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Close modal and refresh table
            const modal = bootstrap.Modal.getInstance(document.getElementById('addModal'));
            modal.hide();
            fetchSongs();
            event.target.reset();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to delete a song
async function deleteSong(id) {
    if (confirm('Are you sure you want to delete this song?')) {
        try {
            const response = await fetch(`http://localhost:5000/api/songs/delete/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchSongs();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Function to prepare edit modal
async function prepareEdit(id) {
    // Store the current song ID for updating
    document.getElementById('editModal').dataset.songId = id;
    
    try {
        const response = await fetch(`http://localhost:5000/api/songs/all`);
        const songs = await response.json();
        const song = songs.find(s => s._id === id);
        
        // Fill the edit form with current values
        document.querySelector('#editModal #Name').value = song.Name;
        document.querySelector('#editModal #Artist').value = song.Artist;
        document.querySelector('#editModal #Albums').value = song.Albums;
        document.querySelector('#editModal #Date').value = song.Date;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to update a song
async function updateSong() {
    const id = document.getElementById('editModal').dataset.songId;
    
    const formData = {
        Name: document.querySelector('#editModal #Name').value,
        Artist: document.querySelector('#editModal #Artist').value,
        Albums: document.querySelector('#editModal #Albums').value,
        Date: parseInt(document.querySelector('#editModal #Date').value)
    };

    try {
        const response = await fetch(`http://localhost:5000/api/songs/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
            modal.hide();
            fetchSongs();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', () => {
    fetchSongs();
    
    // Add song form submission
    document.getElementById('addProductForm').addEventListener('submit', addSong);
    
    // Edit save button
    document.querySelector('#editModal .btn-primary').addEventListener('click', updateSong);
});