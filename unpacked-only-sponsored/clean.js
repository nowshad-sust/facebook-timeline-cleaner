const TIMELINE_CLASS = "_5pcb";
const POST_CLASS = "fbUserContent _5pcr";
const SPONSORED_POST_CLASS = "_5paw _4dcu";

var count = 0;

function watchPageForChange(){

	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		mutations.forEach(function(mutation){
			mutation.addedNodes.forEach(function(element) {

				//clean again for some inconsistency due to data loading
				if(count < 3){
					var initialPosts = document.getElementsByClassName(POST_CLASS);
					clean(initialPosts);
				}
				
				var posts = element.getElementsByClassName(POST_CLASS);
				if(posts.length == 2){
					if(isSponsored(posts[1])){
						let border = element.closest('._4ikz');
						element.remove();
						border.remove();
						console.log(++count);
					}
				}else if(posts.length == 1){
					if(isSponsored(posts[0])){
						let border = element.closest('._4ikz');
						element.remove();
						border.remove();
						console.log(++count);
					}
				}
			}, this);
		});
	});

	observer.observe(document.getElementsByClassName(TIMELINE_CLASS)[0], {
		subtree: true,
		childList: true
	});
}

function isSponsored(post){
	if(post.querySelector('._5paw._4dcu') || post.querySelector(".fbUserContent._5pa-")){
		return true;
	}
	return false;
}

function clean(posts){
	for(let post of posts){

		if(isSponsored(post)){
			let border = post.closest('._4ikz');
			post.remove();
			border.remove();
			console.log(++count);
		}
	}
}

(function() {
	//initially run before watching any chnage
	var posts = document.getElementsByClassName(POST_CLASS);
	clean(posts);
	watchPageForChange();
})();
