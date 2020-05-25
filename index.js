$(function () {
    'use strict';

    const result = $('#results');
    const goSearch = $('[name="rechercher"]');
    const searchedTitre = $('.titre');
    const sortBy = $('.trier');
    const fav = $('#fav');
    const rand = $('#random-track');
    const next = $('#next-tracks')



    // Constructor qui va être utilisé pour chaque track
    class Track {
        constructor(id, name, title, album, cover, preview) {
            this.id = id,
                this.name = name,
                this.title = title,
                this.album = album,
                this.cover = cover,
                this.preview = preview
        }
    };



    // Envoye de la dérnière requête 

    let request_ = localStorage.getItem("request");
    let storedrequest = JSON.parse(request_);
    let url_ = storedrequest;


    sendRequest(url_);




    // Quatres fonctions qui initialisent le localeStorage


    // Pour les favoris

    function storageInit() {

        let songs = [];
        let storedData = localStorage.getItem("deez-web", songs);
        if (storedData == null || storedData == undefined) {
            localStorage.setItem("deez-web", JSON.stringify(songs));
        };
    }
    storageInit();



    // Pour la requête

    function storageUrlInit() {

        let req = [];
        let storedUrl = localStorage.getItem("request", req);
        if (storedUrl == null || storedUrl == undefined) {
            localStorage.setItem("request", JSON.stringify(req));
        };
    }
    storageUrlInit();



    // Pour le resultat de recherche

    function storageSearchedInit() {

        let searched = [];
        let storesearched = localStorage.getItem('searched', searched);
        if (storesearched == null || storesearched == undefined) {
            localStorage.setItem('searched', JSON.stringify(searched));
        };

    }
    storageSearchedInit();




        // Pour les nexts

        function storageNextInit() {

            let next_array = [];
            let storedData = localStorage.getItem("next", next_array);
            if (storedData == null || storedData == undefined) {
                localStorage.setItem("next", JSON.stringify(next_array));
            };
        }
        storageNextInit();






    // Enregistrement d'une requête avec les valeurs du formulaire dans le localeStorage

    function onSearch(event) {
        event.preventDefault()

        let searchedTitreValue = searchedTitre.val();
        searchedTitreValue = encodeURIComponent(searchedTitreValue);

        let sortByValue = sortBy.val();
        sortByValue = encodeURIComponent(sortByValue);

        let _url = `https://api.deezer.com/search?q=${searchedTitreValue}&order=${sortByValue}&output=jsonp`;


        let request = localStorage.getItem("request");
        let newrequest = JSON.parse(request);
        newrequest = _url;

        localStorage.setItem("request", JSON.stringify(newrequest));

        sendRequest(_url);

    }





    // Envoye d'une requête au click sur le bouton search

    goSearch.on('click', onSearch);






    // Fonction qui lance l'encoie d'une requête avec une url donnée en paramètre

    function sendRequest(url) {
        const request = ($.ajax({
            url: url,
            dataType: "jsonp",
        }));

        request.done(onSuccess);
        request.fail(onFail);
        console.log(request);
    }





    // Fonction qui active le bouton, ajouter ou retirer des favoris


    function btnActiv() {

        let btnsList = $('input.btn-add-fav');
        let btnsArray = [...btnsList];

        for (let l = 0; l < btnsArray.length; l++) {

            $(btnsArray[l]).click(function addOrRemove(e) {
                e.preventDefault();

                // Le résultats de recherche stocké dans le localeStorage
                let searched = localStorage.getItem("searched");
                let newsearched = JSON.parse(searched);

                // Les favorits stockés dans le localeStorage
                let stored = localStorage.getItem("deez-web");
                let favoritstored = JSON.parse(stored);

                // Ajouter aux favoris
                if (newsearched[l].id == btnsArray[l].id && $(btnsArray[l]).attr("src") == "img/favoris-to-add.svg") {

                    console.log('add');

                    $(btnsArray[l]).removeAttr("src").attr("src", "img/favoris-to-remove.svg");

                    let track = new Track(newsearched[l].id, newsearched[l].name, newsearched[l].title, newsearched[l].album, newsearched[l].cover, newsearched[l].preview);

                    const found = favoritstored.find(element => element.id == newsearched[l].id);
                    if (favoritstored.indexOf(found) == -1) {
                        favoritstored.unshift(track);
                    }
                }

                // Retirer des favoris
                else if (newsearched[l].id == btnsArray[l].id && $(btnsArray[l]).attr("src") == "img/favoris-to-remove.svg") {

                    const found_ = favoritstored.find(element => element.id == newsearched[l].id);
                    if (favoritstored.indexOf(found_) >= -1) {
                        favoritstored.splice(favoritstored.indexOf(found_), 1);

                        $(btnsArray[l]).removeAttr("src").attr("src", "img/favoris-to-add.svg");
                        console.log('remove');
                    }
                }

                localStorage.setItem("deez-web", JSON.stringify(favoritstored));

                displayFavorit();

            });

        }
    }






    // En cas de la réussite de la requête on stocke le résultats dans le localeStorage et affiche le resultas dans la page


    function onSuccess(results) {
   

        let newsearch = results.data;
        let next_url = results.next;
        let newsearchedinit = [];
      
 

        localStorage.setItem('searched', JSON.stringify(newsearchedinit));
        let newsearched = JSON.parse(localStorage.getItem('searched'));

  

        $.each(newsearch, function (i, item) {

            const track = new Track(item.id, item.artist.name, item.title, item.album.title, item.album.cover_small, item.preview);
            newsearched.push(track);

        });


        localStorage.setItem('searched', JSON.stringify(newsearched));
    

        result.empty();

        showTheResultStocked();
        btnActiv();
        verifyIfIsFavorit();


    }










    // Fonction qui vérifie si le titre éxiste dans les favoris 

    function verifyIfIsFavorit() {

        let favorits = JSON.parse(localStorage.getItem("deez-web"));
        let btns = $('input.btn-add-fav');
        let btnsArr = [...btns];

        for (let n = 0; n < btnsArr.length; n++) {
            for (let s = 0; s < favorits.length; s++) {
                if (btnsArr[n].id == favorits[s].id) {
                    $(btnsArr[n]).removeAttr("src").attr("src", "img/favoris-to-remove.svg");
                }
            }
        }

    }


















    // Afficher le résultats de recherche stockés dans le localStorageStorage

    function showTheResultStocked() {

        let storedsearched = JSON.parse(localStorage.getItem('searched'));

        if (storedsearched.length == 0) {
            result.append(`<p class="no-result">Aucun résultats pour cette recherche...</p>`);
            next.empty();
        } else {
            result.empty();
        

        $.each(storedsearched, function (i, item) {

            result.append(

                `<div class="track track-${item.id}">

                     <div class="media-ctn">

                        <div class="media"> 

                            <div>
                                <img src="${item.cover}" alt="">
                            </div>

                            <div>
                                <h5>${item.name}</h5>
                                <p>${item.title}</p>
                                <p>${item.album}</p>
                            </div>

                        </div>
                       

                        <div class="player">
                            <audio controls src=${item.preview}></audio>
                        </div>

                    </div>

                        <div class='btn-fav-ctn fav-cnt'>
                             <input type="image" src="img/favoris-to-add.svg" id="${item.id}" class="btn-add-fav">
                        </div>

                 </div>`
            );

        });
        next.empty();
        next.append(
            `        <div id="next-ctn">
            <input id="next" type="submit" name="next" value="Voir plus">
        </div>`
        );
    }
   
    }









    // Affiche les favoris stockés dans le localesorage 

    function displayFavorit() {

        let stored = localStorage.getItem("deez-web");
        let favorits = JSON.parse(stored);

        if (favorits.length == 0) {
            fav.append(`<p class="no-favorits">Aucun favoris dans votre liste...</p>`);
        } else {
            fav.empty();
        }

        $.each(favorits, function (j, track) {

            fav.append(

                `<div class="track track-${track.id}">

                             <div class="media-ctn">

                                    <div class="media">
                                        <div>
                                            <img src="${track.cover}" alt="">
                                        </div>

                                        <div>
                                            <h5>${track.name}</h5>
                                            <p>${track.title}</p>
                                            <p>${track.album}</p>
                                        </div>

                                    </div>
    
                                    <div class="player">
                                        <audio controls src=${track.preview}></audio>
                                    </div>

                            </div>

                            <div class='btn-fav-ctn fav-cnt'>
                                <input type="image" src="img/favoris-to-remove.svg" id="${track.id}" class="btn-favorits">
                            </div>

                                </div>`

            );

        });
    };

    displayFavorit();






    // Supprimer un titre dans la page Favoris

    function removeFromFavorit() {

        let stored = localStorage.getItem("deez-web");
        let favorits = JSON.parse(stored);

        $('.btn-favorits').on('click', function (e) {
            e.preventDefault();

            let btn_id = this.id;

            for (let p = 0; p < favorits.length; p++) {
                if (favorits[p].id == btn_id) {
                    favorits.splice([p], 1);
                    $(`div.track-${btn_id}`).hide();
                }
            }

            localStorage.setItem("deez-web", JSON.stringify(favorits));

        });
    }

    removeFromFavorit();

















    // Affiche un titre aléatoirement un titre sur la page d'accueil

    $('#random').click(randomTrack);

    function randomTrack() {

        let tracks = localStorage.getItem("deez-web");
        let tracksob = JSON.parse(tracks);
        if (tracksob.length == 0) {
            rand.empty();
            rand.append(`<p class="no-favorits">Aucun favoris dans votre liste...</p>`);
        } else {

            const randomIndex = window.Math.floor(Math.random() * tracksob.length);

            const track = new Track(tracksob[randomIndex].id, tracksob[randomIndex].name, tracksob[randomIndex].title, tracksob[randomIndex].album, tracksob[randomIndex].cover, tracksob[randomIndex].preview);

            rand.empty();

            rand.append(

            `<div class="track track-${track.id}">
                 <div class="media-ctn">

                    <div class="media">

                        <div>
                            <img src="${track.cover}" alt="">
                        </div>

                        <div>
                            <h5>${track.name}</h5>
                            <p>${track.title}</p>
                            <p>${track.album}</p>
                        </div>

                    </div>

                    <div class="player">
                        <audio controls src=${track.preview}></audio>
                    </div>

                 </div>

            <div class='btn-fav-ctn fav-cnt'>
                <input type="image" src="img/favoris-to-remove.svg" id="${track.id}" class="btn-favorits">
            </div>

        </div>`

            );

        }
    };

    randomTrack();





    function onFail(jqXHR) {
        result.html(

                    `<div class="erreur">
                        Une erreur s'est produite : ${jqXHR.statusText}
                    </div>`

                    );
    }

});