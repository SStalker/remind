Ext.define('Reminder.controller.Places', {
	extend: 'Ext.app.Controller',
	requires: [
		'Ext.data.proxy.LocalStorage'
	],

	config: {
		refs: {
			placeEditor: 'placeeditor',
			remindPlaceListContainer: 'remindplacelistcontainer',
			remindMainMenu: 'remindmainmenu',
			geoMap: 'geomap'

		},
		control: {
			
			placeEditor: {
				savePlaceCommand: 'onSavePlaceCommand',
				deletePlaceCommand: 'onDeletePlaceCommand',
				backCommand: 'onBackCommand',
				openMapCommand: 'onOpenMapCommand'

			},

			remindPlaceListContainer: {
				editPlaceCommand: 'onEditPlaceCommand',
				newPlaceCommand: 'onNewPlaceCommand'
			},

			geoMap: {
				gotPosition: 'userGotPosition',
				customZoomIn: 'onCustomZoomInCommand',
				customZoomOut: 'onCustomZoomOutCommand',
				backCommand: 'onBackGeoCommand',
			}
		}
	},

	onNewPlaceCommand: function() {
		console.log('Controller - Places - onNewPlaceCommand');

		var newPlace = Ext.create('Reminder.model.Places', {		
			place: '',
			latitude: '',
			longitude: ''
		});

		console.log(newPlace);

		this.activatePlaceEditor(newPlace);
	},

	onSavePlaceCommand: function() {
		console.log('Controller - Places - onSavePlaceCommand');

		var placeEditor = this.getPlaceEditor();
		var currentPlace = placeEditor.getRecord();
		var newValues = placeEditor.getValues();

		
		currentPlace.set('place', newValues.place);
		currentPlace.set('latitude', newValues.latitude);
		currentPlace.set('longitude', newValues.longitude);


		var errors = currentPlace.validate();

		
		if( !errors.isValid() ) {

			errors.each(function (item, index, length) {	            
	        	Ext.Msg.alert('Error!', item.getMessage(), Ext.emptyFn);
	        });

			currentPlace.reject();
			return;
		}

		
		var placeStore = Ext.getStore('Places');

		if( placeStore.findRecord('id', currentPlace.data.id) == null ) {
			console.log('Controller - Places - onSavePlaceCommand add');
			placeStore.add(currentPlace);
		}

			placeStore.sync();

		
		this.activatePlaceList();
	},

	onDeletePlaceCommand: function() {
		console.log('Controller - Places - onDeletePlaceCommand');
		
		var placeEditor = this.getPlaceEditor();
		var currentPlace = placeEditor.getRecord();
		var placeStore = Ext.getStore('Places');

			placeStore.remove(currentPlace);
			placeStore.sync();

		this.activatePlaceList();
	},

	onBackCommand: function() {
		console.log('Controller - Places - Back to List');

		this.activatePlaceList();
	},

	onEditPlaceCommand: function(list, record) {
		console.log('Controller - Places - onEditPlaceCommand');
		this.activatePlaceEditor(record);
	},

	onOpenMapCommand: function() {
		console.log('Controller - Places - onOpenMapCommand');
		this.activateLocationMap();
	},

	userGotPosition: function(map, coords) {
		console.log('Controller - Places - userGotPosition');

		var placeEditor = this.getPlaceEditor();
		var coordsLatitude = placeEditor.query('fieldset > textfield[itemId=latitude]')[0];
		var coordsLongitude = placeEditor.query('fieldset > textfield[itemId=longitude]')[0];

		coordsLatitude.setValue(coords.latLng.lat());
		coordsLongitude.setValue(coords.latLng.lng());

		var currentPlace = placeEditor.getRecord();
		var newValues = placeEditor.getValues();

		currentPlace.set('place', newValues.place);
		currentPlace.set('latitude', newValues.latitude);
		currentPlace.set('longitude', newValues.longitude);


		this.activatePlaceEditor(currentPlace);
	},

	onCustomZoomInCommand: function() {
		console.log('Controller - Places - onCustomZoomInCommand');
		var map = this.getGeoMap().getComponent('geomap').getMap();


		if( map.getZoom() < 18 )
			map.setZoom( map.getZoom()+1 );

	},


	onCustomZoomOutCommand: function() {
		console.log('Controller - Places - onCustomZoomOutCommand');
		var map = this.getGeoMap().getComponent('geomap').getMap();


		if( map.getZoom() > 0 )
			map.setZoom( map.getZoom()-1 );

	},

	onBackGeoCommand: function() {
		console.log('Controller - Places - onBackGeoCommand');

		var placeEditor = this.getPlaceEditor();

		this.activatePlaceEditor(placeEditor.getRecord());
	},

	activatePlaceEditor: function(record) {
		var placeEditor = this.getPlaceEditor();

			//console.log(placeEditor);

			placeEditor.setRecord(record);

			//console.log(record);
		

		Ext.Viewport.animateActiveItem( placeEditor, { type: 'slide', direction: 'left' } );
	},

	activatePlaceList: function() {
		var placeList = this.getRemindPlaceListContainer();

		Ext.Viewport.animateActiveItem( placeList, { type: 'slide', direction: 'right' } );
	},

	activateLocationMap: function() {
		var geoMap = this.getGeoMap();
		Ext.Viewport.animateActiveItem( geoMap, { type: 'cover'});
	},

	onTappedMenuButtonCommand: function() {
		console.log('Controller - Places - onTappedMenuButtonCommand');

		var menu = this.getRemindMainMenu();

		if( menu.isHidden() )
			Ext.Viewport.showMenu('left');
		else
			Ext.Viewport.hideMenu('left');

	},

	initialize: function() {
		console.log('Controller - Places - init');
	},

	launch: function() {
		console.log('Controller - Places - launch');
	}
	
});