function InfoLoader(){ 
   let playlistID = Math.floor(Math.random()*8);
   console.log(playlistID)

    // Select the modal elements
        const modalImage = document.getElementById('playlistModalImage'); // Corrected to use ID
        const ModalTitle = document.getElementById('playlistModalTitle');
        const songBoxes = document.querySelector('.song-boxes'); // Container for songs
        const playlist = data.playlists[playlistID]; // Get the playlist object

        // Set the playlist image
        modalImage.src = playlist.playlist_art;
        ModalTitle.innerHTML = playlist.playlist_name;
        
        // Populate song boxes
        playlist.songs.forEach((song) => {
            var songElement = document.createElement('div');
            songElement.className = 'song-box';
            songElement.innerHTML = `
                <img src="${song.cover_art}" alt="Song Art" class='boxImage'>
                <p>${song.title}</p>
                <p>${song.artist}</p>
                <p>${song.duration}</p>`;
                songBoxes.appendChild(songElement);
        });

    }
    InfoLoader();