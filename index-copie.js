



// $(function() {
//     'use strict';

//             const storageService = new StorageService(LS_ID_DEEZ);

//             let tracksFavorits =[];
//             let trackObj = {};


//         function createTrackInfo(artist, title, album, cover){

//             const coverCtnr = document.createElement('div');
//             const coverImg = document.createElement('img');
//             coverImg.setAttribute('src', cover);
//             coverCtnr.appendChild(coverImg);

//             const infoCtnr = document.createElement('div');
//             const artisteName = document.createElement('h5');
//             artisteName.innerText = artist;
//             const trackTitle = document.createElement('p');
//             trackTitle.innerText = title;
//             const albumTitle = document.createElement('p');
//             albumTitle.innerText = album;
//             infoCtnr.appendChild(artisteName);
//             infoCtnr.appendChild(trackTitle);
//             infoCtnr.appendChild(albumTitle);


//             const mediaCtnr = document.createElement('div');
//             mediaCtnr.className='media';

//             mediaCtnr.appendChild(coverCtnr);
//             mediaCtnr.appendChild(infoCtnr);

//             return mediaCtnr;

//         }


//         function creatPlayer(preview){
//             const trackPlayer = document.createElement('audio');
//             trackPlayer.setAttribute('controls', "");
//             trackPlayer.setAttribute('src', preview);

//             const playerCtnr = document.createElement('div');
//             playerCtnr.className='player';

//             playerCtnr.appendChild(trackPlayer);

//             return playerCtnr;
//         }


//         function createBtnFavorits(art, tit, alb, cov, prev){
//             let favoris = {art, tit, alb, cov, prev}
//             const btnFavCtnr = document.createElement('div');
//             btnFavCtnr.className='add-favorite';

//             const aLink = document.createElement('a');
//             aLink.setAttribute('href', 'javascript:void(0)');
//             aLink.className = 'btn-fav'
//             const pictoCtnr = document.createElement('div');
//             const favPicto = document.createElement('img');
//             favPicto.setAttribute('src', 'img/favoris-vide.svg');
//             pictoCtnr.appendChild(favPicto);
//             const btnFavText = document.createElement('p');
//             btnFavText.innerText = "Ajouter aux favoris"
//             pictoCtnr.appendChild(btnFavText);
//             aLink.appendChild(pictoCtnr);


//              aLink.addEventListener('click', function addToFavorit(e) {

//                 e.preventDefault();
//                 // $(e.target).removeClass('removed');


//                 this.className = 'added';

//               tracksFavorits.push(favoris);

//               storageService.setData('tracks', tracksFavorits);
//               let btnFavArray = [];
//                 for(let i = 0; i < tracksFavorits.length; i++){

//                     this.id = `btn-fav-${[i]}`;

//                     btnFavArray.push(this.id);

//                     console.log(this.id);
//                     console.log('le btnFavArray' + btnFavArray )
//                 }


//                 console.log(tracksFavorits);


//             });


//             btnFavCtnr.appendChild(aLink);
//             return btnFavCtnr;

//         }




//          function createTrack({art, tit, alb, cov, prev}){

//             const trackCtnr = document.createElement('div');
//             trackCtnr.className = 'track';

//             trackCtnr.appendChild(createTrackInfo(art, tit, alb, cov));
//             trackCtnr.appendChild(creatPlayer(prev));
//             trackCtnr.appendChild(createBtnFavorits(art, tit, alb, cov, prev));

//             return trackCtnr;
//         };



//     const result = $('#results');
//     const goSearch = $('[name="rechercher"]');
//     const searchedTitre = $('#titre');
//     const sortBy = $('#trier');



//     goSearch.on('click', onSearch);

//     function onSearch(event) {
//         event.preventDefault()

//         let searchedTitreValue = searchedTitre.val();
//         searchedTitreValue = encodeURIComponent(searchedTitreValue);

//         let sortByValue = sortBy.val();
//         sortByValue = encodeURIComponent(sortByValue);

//         console.log(searchedTitreValue);


//         const request = ($.ajax({
//             url: `https://api.deezer.com/search?q=${searchedTitreValue}&order=${sortByValue}&output=jsonp`,
//             dataType: "jsonp",
//         }));

//         request.done(onSuccess);
//         request.fail(onFail);
//     }

//     function onSuccess(results) {
//         result.empty();

//         console.log("Résultat :", results.data);
//         let listItem = [];
//         var tracksArray = results.data;

//         $.each(tracksArray, function (i, item) {

//             let art = item.artist.name;
//             let tit = item.title;
//             let alb = item.album.title;
//             let cov = item.album.cover_small;
//             let prev = item.preview;

//             trackObj = {art, tit, alb, cov, prev};
//             result.append(createTrack(trackObj));

//             });

//     };



// //    ` <div class="track">

// //         <div class="media">
// //             <div>
// //                 <img src=${item.album.cover_small} alt="">
// //             </div>
// //             <div>
// //                 <h5>${item.artist.name}</h5>
// //                 <p>${item.title}</p>
// //                 <p>${item.album.title}</p>
// //             </div>
// //         </div>

// //         <div class="player">
// //             <audio controls src=${item.preview}></audio>
// //         </div>

// //         <div class="add-favorite">
// //             <a href="#">
// //                 <div><img src="img/favoris-vide.svg" alt="">
// //                     <p>Ajouter aux favoris</p>
// //                 </div>
// //             </a>
// //         </div>

// //     </div>`




//     function onFail(jqXHR) {
//         result.html(`<div class="page-title">
//                         Une erreur s'est produite : ${jqXHR.statusText}
//                     </div>`);
//     };

//     let fav = $('#fav');
//     let rand = $('#random-track');
//     let tracksStorage = localStorage.getItem("deez-web");
//     let tracksStorageJson = JSON.parse(tracksStorage);
//     // Affichage dans la console
//     console.log(tracksStorageJson);
//     let tracksStorageTable = tracksStorageJson.tracks;

//     function randomTrack(){
//         const randomIndex  = window.Math.floor(Math.random() * tracksStorageTable.length);
//         console.log('random' + randomIndex );
//         let art = tracksStorageTable[randomIndex].art; 
//         let tit = tracksStorageTable[randomIndex].tit;  
//         let alb = tracksStorageTable[randomIndex].alb;  
//         let cov = tracksStorageTable[randomIndex].cov;  
//         let prev= tracksStorageTable[randomIndex].prev; 
//         let randomTrackObj = {art, tit, alb, cov, prev};

//         rand.append(createTrack(randomTrackObj));
//     };







//     function toFavorits(){

//       for(let i = 0; i < tracksStorageTable.length; i++){
//         console.log('hey' + tracksStorageTable[i].art);
//         console.log('hey' + tracksStorageTable[i].alb);

//               let  art = tracksStorageTable[i].art; 
//               let tit = tracksStorageTable[i].tit;  
//               let alb = tracksStorageTable[i].alb;  
//               let cov = tracksStorageTable[i].cov;  
//               let prev= tracksStorageTable[i].prev; 
//               let trackStoredObj = {art, tit, alb, cov, prev};

//         fav.append(createTrack(trackStoredObj));

//             };

//     };

//     toFavorits();


//     randomTrack();








// });










$(function () {
    'use strict';



    

   
        //   storageService.getData('tracks');
    const result = $('#results');
    const goSearch = $('[name="rechercher"]');
    const searchedTitre = $('.titre');
    const sortBy = $('.trier');
    const favoris = [];
    const fav = $('#fav');

    //  Search on click   

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
        console.log(request);
    }


    


   

    function onSuccess(results) {
        
        result.empty();


        console.log("Résultat :", results.data);
       
        let tracksSearchArray = results.data;


        $.each(tracksSearchArray, function (i, track) {

            let ident = track.id;
            let art = track.artist.name;
            let tit = track.title;
            let alb = track.album.title;
            let cov = track.album.cover_small;
            let prev = track.preview;

            // const trackObj = {ident, art, tit, alb, cov, prev};

            result.append(

                `<div class="track">

                            <div class="media">
                                <div>
                                    <img src="${cov}" alt="">
                                </div>
                                <div>
                                    <h5>${art}</h5>
                                    <p>${tit}</p>
                                    <p>${alb}</p>
                                </div>
                            </div>

                            <div class="player">
                                <audio controls src=${prev}></audio>
                            </div>
                            <div class='btn-fav-ctn-${ident} fav-cnt'>
                            <input type="image" src="img/favoris-to-add.svg" id="${ident}" class="btn-add-fav">
                            <input type="image" src="img/favoris-to-remove.svg" id="${ident}" class="btn-remove-fav">
                         
                            </div>
                        </div>`


            );


        });



     
        

       


     

        $('.btn-add-fav').on('click', function addTofavorite(e) {
            e.preventDefault();
           
            console.log(this);
            let identity = this.id;


    
            for (let i = 0; i < tracksSearchArray.length; i++) {
                if (tracksSearchArray[i].id == identity) {
                    let ident = tracksSearchArray[i].id;
                    let art = tracksSearchArray[i].artist.name;
                    let tit = tracksSearchArray[i].title;
                    let alb = tracksSearchArray[i].album.title;
                    let cov = tracksSearchArray[i].album.cover_small;
                    let prev = tracksSearchArray[i].preview;
    
                    const trackfavobj = {ident, art, tit, alb, cov, prev};
                    // favoris.push(trackFavObj);

                    let favorits = localStorage.getItem("deez-web");
                    let favoristarray = JSON.parse(favorits);
                    favoristarray.unshift(trackfavobj);

                    localStorage.setItem("deez-web", JSON.stringify(favoristarray));
                   
                    
                }
            }
            $(this).css( "z-index", "9" );
            $(`.btn-remove-fav #${identity}`).css( "z-index", "10" );
            

        });







        $('.btn-remove-fav').on('click', function removeFromfavorite(event) {
            event.preventDefault();
    
            let identity2 = this.id;
            console.log(this);
    
    
    
    
            let favorits = localStorage.getItem("deez-web");
            let favoristarray = JSON.parse(favorits);
           
    
            localStorage.setItem("deez-web", JSON.stringify(favoristarray));
        
            for (let i = 0; i < favoristarray.length; i++) {
                if (favoristarray[i].ident == `${identity2}`) {
    
                    favoristarray.splice([i], 1);
        
                    localStorage.setItem("deez-web", JSON.stringify(favoristarray));
    
                }
            }

            
            $(this).css( "z-index", "10" );
            $(`.btn-add-fav #${identity2}`).css( "z-index", "9" );
            






                  
        });


    }




    function displayFavorit(){
       
       let storageVavoritsData = localStorage.getItem("deez-web");
                   
      let storageVavoritsDataObj = JSON.parse(storageVavoritsData);
       console.log(storageVavoritsDataObj);
       console.log(typeof(storageVavoritsData));
        
        $.each(storageVavoritsDataObj, function (j, track) {
    
            let ident = track.ident;
            let art = track.art;
            let tit = track.tit;
            let alb = track.alb;
            let cov = track.cov;
            let prev = track.prev;
    
            // const trackOb = { ident, art, tit, alb, cov, prev };
    
            fav.append(
    
                `<div class="track">
    
                                    <div class="media">
                                        <div>
                                            <img src="${cov}" alt="">
                                        </div>
                                        <div>
                                            <h5>${art}</h5>
                                            <p>${tit}</p>
                                            <p>${alb}</p>
                                        </div>
                                    </div>
    
                                    <div class="player">
                                        <audio controls src=${prev}></audio>
                                    </div>
                                    <div class='btn-fav-ctn-${ident} fav-cnt'>
                                    <input type="image" src="img/favoris-to-remove.svg" id="${ident}" class="btn-remove-fav">
                                    
            
                                    </div>
                                </div>`
    
            );
    
    
        });



    };

    displayFavorit();






           
        
            let rand = $('#random-track');

            $('#random').click(randomTrack);
  
    
 
  
            function randomTrack(){
            let tracksStorage = localStorage.getItem("deez-web");
            let tracksStorageJson = JSON.parse(tracksStorage);
        const randomIndex  = window.Math.floor(Math.random() * tracksStorageJson.length);
        // console.log('random' + randomIndex );
        let ident = tracksStorageJson[randomIndex].ident; 
        let art = tracksStorageJson[randomIndex].art; 
        let tit = tracksStorageJson[randomIndex].tit;  
        let alb = tracksStorageJson[randomIndex].alb;  
        let cov = tracksStorageJson[randomIndex].cov;  
        let prev= tracksStorageJson[randomIndex].prev; 

        rand.empty();
        

        rand.append(
            
            `<div class="track">
    
        <div class="media">
            <div>
                <img src="${cov}" alt="">
            </div>
            <div>
                <h5>${art}</h5>
                <p>${tit}</p>
                <p>${alb}</p>
            </div>
        </div>

        <div class="player">
            <audio controls src=${prev}></audio>
        </div>
        <div class='btn-fav-ctn-${ident} fav-cnt'>
        <input type="image" src="img/favoris-to-remove.svg" id="${ident}" class="btn-remove-fav">
        

        </div>
    </div>`
            
        );

    };

    randomTrack();


    function onFail(jqXHR) {
        result.html(`<div class="alert alert-danger">
                                    Une erreur s'est produite : ${jqXHR.statusText}
                                </div>`);
    }

});








