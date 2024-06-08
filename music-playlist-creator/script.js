
//function to load playlists on grid
function populateGridContainer() {
    const gridContainer = document.querySelector('.grid-container');

    data.playlists.forEach((playlist) => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-cards myBtn';
        playlistCard.dataset.playlistID = playlist.playlistID;
        playlistCard.innerHTML = `
            <img src="${playlist.playlist_art}" alt="Playlist Art">
            <p>${playlist.playlist_name}</p>
            <p>${playlist.playlist_creator}</p>
            <button class="close-btn">X</button>
            `;
        //adding like button 
        const likeContainer = document.createElement('div');
        likeContainer.className = 'like-container';
        playlistCard.appendChild(likeContainer);

        const emojiDiv = document.createElement('div');
        emojiDiv.textContent = '👍';
        likeContainer.appendChild(emojiDiv);

        const likeBtn = document.createElement('p');
        likeBtn.id = 'likeBtn' + playlist.playlistID;
        likeBtn.textContent = 0;  
        likeContainer.appendChild(likeBtn);



        // Function to toggle like count
        function toggleLike() {
            var likeCount = parseInt(likeBtn.textContent, 10);
            likeCount = likeCount === 0 ? 1 : 0;  
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
        //delete playlist button
        const closeBtn = playlistCard.querySelector('.close-btn')
        closeBtn.addEventListener('click',function(event){
            event.stopPropagation();
            deletePlaylist(playlistCard);
        });
        
        gridContainer.appendChild(playlistCard);
    });

}

//engage population of main page
populateGridContainer();
//deletes playlist
function deletePlaylist(playlistCard){
    playlistCard.style.display='none';
}


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
    const modalImage = document.getElementById('playlistModalImage'); 
    const ModalTitle = document.getElementById('playlistModalTitle');
    const ModalArtist = document.getElementById('playlistModalArtist');
    const songBoxes = document.querySelector('.song-boxes'); 
    const shuffleBtn = document.getElementById('shuffleBtn');
    let playlist;
    if (playlistID<10){
         playlist = data.playlists[playlistID];
    }else{
         playlist = playlistCard.dataset; 

    }

    // Set existing html elements to required ones
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






//implements modal buttons
    // Get the buttons that open the modal
    var btns = document.querySelectorAll('.myBtn');
  
    // Add event listener to each button and populate the modal
    btns.forEach(function(btn) {
      btn.onclick = function() {
        modal.style.display = "flex";
        populateModal(btn.dataset.playlistID);        
      }
    });
  

//Implents the add playlist Feature
newPlaylistNumber=10;
function submitForm(event){
    event.preventDefault();
    const gridContainer = document.querySelector('.grid-container');
    const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-cards myBtn';
        playlistCard.dataset.playlistID = newPlaylistNumber;

        newPlaylistNumber++;
        playlistCard.innerHTML = `
        <img src="playlist.png" alt="Playlist Art">
            <p>${document.getElementById('playlistName').value}</p>
            <p>${document.getElementById('Creator').value}</p>
            <button class="close-btn">Close</button>
            `;
        playlistCard.dataset.playlist_name = document.getElementById('playlistName').value;
        playlistCard.dataset.playlist_creator = document.getElementById('Creator').value;

        const likeContainer = document.createElement('div');
        likeContainer.className = 'like-container';
        playlistCard.appendChild(likeContainer);

        const emojiDiv = document.createElement('div');
        emojiDiv.textContent = '👍';
        likeContainer.appendChild(emojiDiv);

        const likeBtn = document.createElement('p');
        likeBtn.id = 'likeBtn' + newPlaylistNumber;
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

        const closeBtn = playlistCard.querySelector('.close-btn')
        closeBtn.addEventListener('click',function(event){
            event.stopPropagation();
            deletePlaylist(playlistCard);
        });
        
        gridContainer.appendChild(playlistCard);
        const form = document.getElementById('myForm');
        playlistCard.onclick = function() {
            modal.style.display = "block";
            populateModal(playlistCard.dataset.playlistID);        
          }
          //reset the form after submit
        form.reset();
    }