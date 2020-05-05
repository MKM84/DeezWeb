$(function () {
    'use strict';



        function createTrackInfo(artist, title, album, cover){

            const coverCtnr = document.createElement('div');
            const coverImg = document.createElement('img');
            coverImg.setAttribute('src', cover);
            coverCtnr.appendChild(coverImg);

            const infoCtnr = document.createElement('div');
            const artisteName = document.createElement('h5');
            artisteName.innerText = artist;
            const trackTitle = document.createElement('p');
            trackTitle.innerText = title;
            const albumTitle = document.createElement('p');
            albumTitle.innerText = album;
            infoCtnr.appendChild(artisteName);
            infoCtnr.appendChild(trackTitle);
            infoCtnr.appendChild(albumTitle);


            const mediaCtnr = document.createElement('div');
            mediaCtnr.className='media';

            mediaCtnr.appendChild(coverCtnr);
            mediaCtnr.appendChild(infoCtnr);

            return mediaCtnr;
            
        }


        function creatPlayer(preview){
            const trackPlayer = document.createElement('audio');
            trackPlayer.setAttribute('controls', "");
            trackPlayer.setAttribute('src', preview);

            const playerCtnr = document.createElement('div');
            playerCtnr.className='player';

            playerCtnr.appendChild(trackPlayer);

            return playerCtnr;
        }


        function createBtnFavorits(){

            const btnFavCtnr = document.createElement('div');
            btnFavCtnr.className='add-favorite';

            const aLink = document.createElement('a');
            aLink.setAttribute('href', '#');
            const pictoCtnr = document.createElement('div');
            const favPicto = document.createElement('img');
            favPicto.setAttribute('src', 'img/favoris-vide.svg');
            pictoCtnr.appendChild(favPicto);
            const btnFavText = document.createElement('p');
            pictoCtnr.appendChild(btnFavText);
            aLink.appendChild(pictoCtnr);
            // aLink.addEventListener('click', function() {
            //     callback();
            // });

            btnFavCtnr.appendChild(aLink);

            return btnFavCtnr;

        }

         function createTrack({art, tit, alb, cov, prev}){

            const trackCtnr = document.createElement('div');
            trackCtnr.className = 'track';

            trackCtnr.appendChild(createTrackInfo(art, tit, alb, cov));
            trackCtnr.appendChild(creatPlayer(prev));
            trackCtnr.appendChild(createBtnFavorits());

            return trackCtnr;
        };



    const result = $('#results');
    const goSearch = $('[name="rechercher"]');
    const searchedTitre = $('.titre');
    const sortBy = $('.trier');



    goSearch.on('click', onSearch);

    function onSearch(event) {
        event.preventDefault()

        let searchedTitreValue = searchedTitre.val();
        searchedTitreValue = encodeURIComponent(searchedTitreValue);

        let sortByValue = sortBy.val();
        sortByValue = encodeURIComponent(sortByValue);

        console.log(searchedTitreValue);


        const request = ($.ajax({
            url: `https://api.deezer.com/search?q=${searchedTitreValue}&order=${sortByValue}&output=jsonp`,
            dataType: "jsonp",
        }));

        request.done(onSuccess);
        request.fail(onFail);
    }

    function onSuccess(results) {
        result.empty();


        console.log("Résultat :", results.data);
        let listItem = [];
        var tracksArray = results.data;

        $.each(tracksArray, function (i, item) {


            let art = item.artist.name;
            let tit = item.title;
            let alb = item.album.title;
            let cov = item.album.cover_small;
            let prev = item.preview;

            const trackObj = {art, tit, alb, cov, prev};
            listItem.push(trackObj);
            

    result.append(createTrack(trackObj));

   
        
            });

    }



//    ` <div class="track">

//         <div class="media">
//             <div>
//                 <img src=${item.album.cover_small} alt="">
//             </div>
//             <div>
//                 <h5>${item.artist.name}</h5>
//                 <p>${item.title}</p>
//                 <p>${item.album.title}</p>
//             </div>
//         </div>

//         <div class="player">
//             <audio controls src=${item.preview}></audio>
//         </div>

//         <div class="add-favorite">
//             <a href="#">
//                 <div><img src="img/favoris-vide.svg" alt="">
//                     <p>Ajouter aux favoris</p>
//                 </div>
//             </a>
//         </div>

//     </div>`
       



    function onFail(jqXHR) {
        result.html(`<div class="alert alert-danger">
                        Une erreur s'est produite : ${jqXHR.statusText}
                    </div>`);
    }

});