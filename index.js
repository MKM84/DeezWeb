



$(function () {
    'use strict';

    const result = $('#results');
    const goSearch = $('[name="rechercher"]');
    const searchedTitre = $('.titre');
    const sortBy = $('.trier');
    const fav = $('#fav');
    let tracksSearchArray = [];
    

    // Constructor qui va être utiliser pour chaque track
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





    // Trois fonctions qui initialisent le localeStorage


    // Pour les favoris

    function storageInit() {

        let songs = [];
        let storedData = JSON.parse(localStorage.getItem("deez-web", songs));
        if (storedData == null || storedData == undefined) {
            localStorage.setItem("deez-web", JSON.stringify(songs));
        };
    }
    storageInit();

    // Pour la requête

    function storageUrlInit() {

        let req = [];
        let storedUrl = JSON.parse(localStorage.getItem("request", req));
        if (storedUrl == null || storedUrl == undefined) {
            localStorage.setItem("request", JSON.stringify(req));
        };
    }
    storageUrlInit();

    // Pour le resultat de recherche

    function storageSearchedInit() {

        let searched = [];
        let storesearched = JSON.parse(localStorage.getItem("searched", searched));
        if (storesearched == null || storesearched == undefined) {
            localStorage.setItem("searched", JSON.stringify(searched));
        };
    }
    storageSearchedInit();




    // Save last search results

    let location = new URL(window.location);
    let lastSearchPage = (location.pathname);

    if (lastSearchPage == "/deez-web/recherche.html") {
        let storedUrl = localStorage.getItem("request");
        let newrequestparsed = JSON.parse(storedUrl);

        sendRequest(newrequestparsed);

    };

    // Send the request on search

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


    goSearch.on('click', onSearch);


    // Fonction qui encoie une requête avec une url donnée en paramètre

    function sendRequest(url) {
        const request = ($.ajax({
            url: url,
            dataType: "jsonp",
        }));

        request.done(onSuccess);
        request.fail(onFail);
        console.log(request);


    }




    // En cas de la reussite de la requête on affiche le resulta dans la page


    function onSuccess(results) {

        console.log("Résultat :", results.data);

        tracksSearchArray = results.data;
        // let next = results.next;
        // verifyBtnFav(tracksSearchArray);

        let searched = localStorage.getItem("searched");
        let newsearched = JSON.parse(searched);


        $.each(tracksSearchArray, function (i, item) {

            const track = new Track(item.id, item.artist.name, item.title, item.album.title, item.album.cover_small, item.preview);

            newsearched.push(track);

        });

        localStorage.setItem("searched", JSON.stringify(tracksSearchArray));

        result.empty();

        showTheResultStocked();
    }






    function showTheResultStocked() {

        let searched = localStorage.getItem("searched");
        let newsearched = JSON.parse(searched);

        $.each(newsearched, function (i, item) {

            const track = new Track(item.id, item.artist.name, item.title, item.album.title, item.album.cover_small, item.preview);


            result.append(

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
                        <input type="image" src="img/favoris-to-add.svg" id="${track.id}" class="btn-add-fav">
                        </div>
                    </div>`
            );




        });



        startBtnFav();




    }






// Fonction qui active le click sur le bouton favoris


    function startBtnFav() {

        let searched = localStorage.getItem("searched");
        let newsearched = JSON.parse(searched);

        $.each(newsearched, function (index, item) {


            $(`#${item.id}`).on('click', function addOrRemove(e) {
                e.preventDefault();
                console.log('cliqué');

                let identity = this.id;
                console.log(identity);

                if (item.id == identity && $(`#${item.id}`).attr("src") == "img/favoris-to-add.svg") {


                    let track = new Track(item.id, item.artist.name, item.title, item.album.title, item.album.cover_small, item.preview);

                    let stored = localStorage.getItem("deez-web");
                    let favoritstostore = JSON.parse(stored);
                    favoritstostore.unshift(track);

                    localStorage.setItem("deez-web", JSON.stringify(favoritstostore));

                    $(`#${item.id}`).removeAttr("src");
                    $(`#${item.id}`).attr("src", "img/favoris-to-remove.svg");

                    console.log('the favoris :' + track);


                    displayFavorit();
                }

                else if ($(`#${item.id}`).attr("src") == "img/favoris-to-remove.svg") {


                    let favorits = localStorage.getItem("deez-web");
                    let favorisarray = JSON.parse(favorits);

                    for (let i = 0; i < favorisarray.length; i++) {
                        if (favorisarray[i].id == identity) {

                            favorisarray.splice([i], 1);

                            localStorage.setItem("deez-web", JSON.stringify(favorisarray));

                        }
                    }

                    $(`#${item.id}`).removeAttr("src");
                    $(`#${item.id}`).attr("src", "img/favoris-to-add.svg");

                    displayFavorit();

                }
            });


        })
    }







    // Fonction qui affiche les favoris stockés dans le localesorage

    function displayFavorit() {

        let stored = localStorage.getItem("deez-web");

        let favorits = JSON.parse(stored);

        $.each(favorits, function (j, track) {
            // const track = new Track(item.id, item.name, item.title, item.album, item.cover, item.preview);


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
                            <input type="image" src="img/favoris-to-add.svg" id="${track.id}" class="btn-add-fav">
                            </div>
                                </div>`

            );


        });



    };

    displayFavorit();



    // Fonction qui affiche un titre aléatoirement un titre sur la page d'accueil




    let rand = $('#random-track');

    $('#random').click(randomTrack);




    function randomTrack() {

        let tracks = localStorage.getItem("deez-web");
        if (tracks) {
            let tracksob = JSON.parse(tracks);
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
        <input type="image" src="img/favoris-to-add.svg" id="${track.id}" class="btn-add-fav">
        </div>
    </div>`

            );

        }
    };


    randomTrack();





    function onFail(jqXHR) {
        result.html(`<div class="alert alert-danger">
                                    Une erreur s'est produite : ${jqXHR.statusText}
                                </div>`);
    }

});






