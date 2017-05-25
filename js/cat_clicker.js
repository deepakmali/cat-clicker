var model = {
	currentCat : null,
	cats : [
		{
			clickCount : 0,
			name : "Cat-1",
			image : "img/cat1.jpg"
		},
		{
			clickCount : 0,
			name : "Cat-2",
			image : "img/cat2.jpg"
		},
		{
			clickCount : 0,
			name : "Cat-3",
			image : "img/cat3.jpg"
		},
		{
			clickCount : 0,
			name : "Cat-4",
			image : "img/cat4.jpg"
		},
		{
			clickCount : 0,
			name : "Cat-5",
			image : "img/cat5.jpg"
		}
	]
};

var octopus = {
	init: function(){
		// set out current cat to the first on  in the list
		model.currentCat = model.cats[0];
		// tell our view to initialize
		catListView.init();
		catView.init();
		adminView.init();
	},

	getCurrentCat: function(){
		return model.currentCat ;
	},

	getCats: function(){
		return model.cats ;
	},

	// set the currently slelected cat to the object passed in:
	setCurrentCat: function(cat){
		model.currentCat = cat;
	},

	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	},

	updateCatDetails : function(newCatName, newCatCount, newCatImage){
		cat = this.getCurrentCat();
		cat.name = newCatName ;
		cat.image = newCatImage ;
		cat.clickCount = newCatCount ;
		catView.render();
		catListView.render();
		adminView.render();
	}
};

// view
var catView = {
	init: function(){	// store pointers to our DOM elements for easy access later in the code
		this.catElem = document.getElementById('cat');
		this.catNameElem = document.getElementById('cat-name');
		this.catImageElem = document.getElementById('cat-image');
		this.countElem = document.getElementById('cat-count');

		// on click increment the current cat's counter
		this.catImageElem.addEventListener('click', function(e){
			octopus.incrementCounter();
		});
		this.render();
	},

	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.clickCount;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.image;
	}
};

var catListView = {
	init: function(){
		this.catListElem = document.getElementById('cat-list');
		this.render();
	},

	render: function(){
		var cats = octopus.getCats();
		this.catListElem.innerHTML = '';

		for (var i = 0;i < cats.length ;i++){
			var cat=cats[i];
			var elem = document.createElement('li');
			elem.textContent = cat.name;

			elem.addEventListener('click',(function(cat){
				return function(){
					octopus.setCurrentCat(cat);
					catView.render();
				}
			})(cat));

			this.catListElem.appendChild(elem);
		}
	}
};


var adminView = {
	init : function(){
		this.adminForm = document.getElementById('adminForm');
		this.adminForm.style.visibility = 'hidden';
		this.newName = document.getElementById('newName');
		this.newCount = document.getElementById('newCount');
		this.newImage = document.getElementById('newImage');
		this.adminButton = document.getElementById('admin');
		this.updateButton = document.getElementById('update');
		this.cancelButton = document.getElementById('cancel');
		this.render();
	},
	render : function(){
		this.adminButton.addEventListener('click', function(){
		adminForm.style.visibility = 'visible';
		});
		this.cancelButton.addEventListener('click', function(){
		adminForm.style.visibility = 'hidden';
		});

		// document.console.log(this.newName.value);
		this.updateButton.addEventListener('click', function(){
			var newName1 = newName.value;
			var newImage1 = newImage.value;
			var newCount1 = newCount.value;
			console.log(newCount1, newImage1, newName1);
			octopus.updateCatDetails(newName1, newImage1,newCount1);
			// window.alert(newName);			
		});

	}
};

octopus.init();