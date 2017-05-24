$(document).ready(()=>{

	// All API calls go to this link
	const apiBaseURL = 'http://api.themoviedb.org/3';

	// All images use this link
	const imageBaseURL = 'http://image.tmdb.org/t/p/';

	const nowPlayingURL = apiBaseURL + '/movie/now_playing?api_key='+apiKey;

	$.getJSON(nowPlayingURL,(nowPlayingData)=>{
		var nowPlayingHTML = getHTML(nowPlayingData);
		console.log(nowPlayingHTML)
		$('#movie-grid').html(nowPlayingHTML);
		$('.movie-poster').click(function(){
			// Change the HTML inside of the modal
			var thisMovieId = $(this).attr("id");
			console.log(thisMovieId);
			var thisMovieURL = `${apiBaseURL}/movie/${thisMovieId}?api_key=${apiKey}`;
			console.log(thisMovieURL);
			$.getJSON(thisMovieURL,(thisMovieData)=>{
				console.log(thisMovieData);
				$('#myModalLabel').html(thisMovieData.title);
				// Open the modal
				$('#myModal').modal();
			});
		});
	});


	// SUBMIT - Event Listener //
	$('#movie-form').submit((event)=>{
		// Don't submit form. JavaScript will handle it.
		event.preventDefault();
		// Inputs return vals. They are self-closing, so there is no HTML to return.
		var userInput = $('#search-input').val();
		$('#search-input').val('');
		// This converts spaces and other characters to URL safe text (such as %20).
		var urlSafeUserInput = encodeURI(userInput);
		var searchURL = `${apiBaseURL}/search/movie?query=${urlSafeUserInput}&api_key=${apiKey}`;

		
		$.getJSON(searchURL,(searchMovieData)=>{
			var searchMovieHTML = getHTML(searchMovieData);
			// console.log(searchMovieHTML);
			$('#movie-grid').html(searchMovieHTML);
		});
	});


	function getHTML(data){
		var newHTML = '';
		for(let i = 0; i < data.results.length; i++){
			var posterURL = imageBaseURL + 'w300' + data.results[i].poster_path;
			newHTML += `<div class="col-sm-6 col-md-3 movie-poster" id="${data.results[i].id}">`;
				newHTML += `<img src="${posterURL}">`;
			newHTML += `</div>`;
		}
		return newHTML;
	}

});






