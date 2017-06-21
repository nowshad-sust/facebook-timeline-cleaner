console.log("opened filter");

const TIMELINE_CLASS = "_5pcb";
const POST_CLASS = "fbUserContent _5pcr";
const SPONSORED_POST_CLASS = "_5paw _4dcu";

function watchPageForChange(){
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
		mutations.forEach(function(mutation){
			mutation.addedNodes.forEach(function(element) {
				var posts = element.getElementsByClassName(POST_CLASS);
				if(posts.length == 2){
					element.remove();
					console.log("indirect");
				}else if(posts.length == 1){
					if(isSponsored(posts[0])){
						console.log("sponsored");
						element.remove();
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

function isIndirect(post){
	if(post.querySelector('._5pcr')){
		return true;
	}
	return false;
}

function isSponsored(post){
	if(post.querySelector('._4dcu')){
		return true;
	}
	return false;
}

function clean(posts){
	for(let post of posts){
		if(isIndirect(post)){
			console.log('indirect');
			post.remove();
		}else if(isSponsored(post)){
			console.log('sponsored');
			post.remove();
		}
	}
}

console.log('started watching your timeline');

(function() {
	var posts = document.getElementsByClassName(POST_CLASS);
	clean(posts);
	watchPageForChange();
})();