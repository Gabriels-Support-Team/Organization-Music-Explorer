
//function to load playlists on grid
function populateGridContainer() {
    const gridContainer = document.querySelector('.grid-container');

    data.playlists.forEach((playlist) => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-cards myBtn';
        playlistCard.ID = 
        playlistCard.dataset.playlistID = playlist.playlistID;
        playlistCard.innerHTML = `
            <img src="${playlist.playlist_art}" alt="Playlist Art">
            <p>${playlist.playlist_name}</p>
            <p>${playlist.playlist_creator}</p>
            <span class="closePlaylist" >&times;</span>
            `;

        const likeContainer = document.createElement('div');
        likeContainer.className = 'like-container';
        playlistCard.appendChild(likeContainer);

        const emojiDiv = document.createElement('div');
        emojiDiv.textContent = '👍';
        likeContainer.appendChild(emojiDiv);

        const likeBtn = document.createElement('p');
        likeBtn.id = 'likeBtn' + playlist.playlistID;
        likeBtn.textContent = 0;  // Initialize like count to 0
        likeContainer.appendChild(likeBtn);



        // Function to toggle like count
        function toggleLike() {
            var likeCount = parseInt(likeBtn.textContent, 10);
            likeCount = likeCount === 0 ? 1 : 0;  // Toggle like count
            likeBtn.textContent = likeCount;
        }

        // Add event listeners to both the like button and the emoji
        likeBtn.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleLike();
        });

        emojiDiv.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleLike();
        });
        
        gridContainer.appendChild(playlistCard);
    });
}

populateGridContainer();
document.addEventListener('DOMContentLoaded', function(){   
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.addEventListener('click',function(event){
        event.stopPropagation();
        const PlaylistCard = event.target.closest('.playlist-cards');
        PlaylistCard.style.display='none';
});});


//code that implements modal closing feature
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
//function that dynamicallyl populates modals
function populateModal(playlistID) {
    // Select the modal elements
    const modalImage = document.getElementById('playlistModalImage'); // Corrected to use ID
    const ModalTitle = document.getElementById('playlistModalTitle');
    const ModalArtist = document.getElementById('playlistModalArtist');
    const songBoxes = document.querySelector('.song-boxes'); // Container for songs
    const shuffleBtn = document.getElementById('shuffleBtn');
    const playlist = data.playlists[playlistID]; // Get the playlist object

    // Set the playlist image
    modalImage.src = playlist.playlist_art;
    ModalTitle.innerHTML = playlist.playlist_name;
    ModalArtist.innerHTML = playlist.playlist_creator;
    shuffleBtn.textContent = 'shuffle';
    

    // Clear the song boxes container
    songBoxes.innerHTML = '';

    // Populate song boxes
    playlist.songs.forEach((song) => {
        var songElement = document.createElement('div');
        songElement.className = 'song-box';
        songElement.innerHTML = `
            <img src="${song.cover_art}" alt="Song Art" >
            <p>${song.title}</p>
            <p>${song.artist}</p>
            <p>${song.duration}</p>`;
        const randomNum = Math.random();
        if (randomNum < 0.5){
            songBoxes.prepend(songElement)
        }else{
            songBoxes.appendChild(songElement);
        }
    });

   shuffleBtn.addEventListener('click', function(){populateModal(playlistID);})
}






//code that implements modal buttons
    // Get the buttons that open the modal
    var btns = document.querySelectorAll('.myBtn');
  
    // Add event listener to each button and populate the modal
    btns.forEach(function(btn) {
      btn.onclick = function() {
        modal.style.display = "block";
        populateModal(btn.dataset.playlistID);        
      }
    });
  