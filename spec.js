
var helpers = require('/usr/local/lib/node_modules/protractor-helpers');


// spec.js
describe('DTNA', function() {
    var profileButton = element(by.css('.user-info__names'));
    var helpSupport = element(by.linkText('Help & Support'));
    var userSettings = element(by.linkText('Settings'));
    var resetTour = element(by.css('button[ng-click="resetTour()"]'));
    var switchAccount = element(by.id('switchAccountItem'));
    var headerOne = element(by.css('h1'));
    var headerTwo = element(by.css('h2'));
    var tourTitle = element(by.css('.hopscotch-title'));
    var tourNext = element(by.css('.button.button--fixed-width--small.hopscotch-nav-button.next.hopscotch-next'));
    var fleetName = element(by.css('.user-info__tanname'));
    var nameSearch = element(by.css('input[placeholder="NAME"]'));
    var tanSearch = element(by.css('input[placeholder="TAN"]'));
    var continueButton = element(by.buttonText('Continue'));
    var rowElement = element(by.binding('row.Name'));
    var splashLoginButton = element(by.id('loginLink'))
    var randVal = Math.floor(Math.random() * 20);
    var unitidFields = element.all(by.binding('editator'));
    var firstUnitid = unitidFields.first();
    var helpers = require('/usr/local/lib/node_modules/protractor-helpers');
    var Key = protractor.Key;
    var selectAll = element.all(by.css('label[data="table.context.checkboxes"]'));;
    var lastSelectall = selectAll.first();
    var today = new Date();
    var year = today.getFullYear();

    
	it('sign in', function() {
    	//turn off angular sync to get past non angular pages
    	browser.ignoreSynchronization = true;

    	//Start at desired page
    	browser.get('https://portal.dev.detroitconnect.com/');
    
    	//splash page
    	splashLoginButton.click();
    
    	//micrsoft login page
    	browser.driver.findElement(by.id('cred_userid_inputtext')).sendKeys('jordan@metaltoad.com');
    	browser.driver.findElement(by.id('cred_password_inputtext')).sendKeys('J1d3l71985');
    	browser.driver.findElement(by.id('cred_sign_in_button')).click();
    	//have to turn on angular async flag back on
    	browser.ignoreSynchronization = false;
    
    	//ensure that we are on vehicle list page
    	expect(headerOne.getText()).toEqual('VEHICLE LIST');
	});

    //open switch account modal and navigate to DEMO DTNA fleet
	it('switch account', function() {
    	
    	//navigate to account switch modal
    	profileButton.click();
    	switchAccount.click();
    	
    	//modal is now open
        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('DEMO DTNA');})
    	//nameSearch.click().sendKeys('DEMO DTNA');
    	rowElement.click();
    	continueButton.click();
    	expect(fleetName.getText()).toEqual('DEMO DTNA TRUCKING');
	});

    //tour regression check
	it('oobe tour', function() {
    	//steps to restart OOBE
    	profileButton.click();
    	helpSupport.click();
        browser.driver.sleep(5000);
    	resetTour.click();
    	
    	browser.driver.sleep(10000);
    	expect(tourTitle.getText()).toEqual('WELCOME!');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('VEHICLE LIST');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('MAP');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('GETTING AROUND');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('FAULT EVENT INBOX');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('DIAGNOSIS PAGE OVERVIEW');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('MAP AND SERVICE CENTERS');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('VEHICLE HISTORY OVERVIEW');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('VEHICLE INFO');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('VEHICLE ANALYTICS OVERVIEW');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('SETTINGS OVERVIEW');
    	tourNext.click();
    	
    	browser.driver.sleep(3000);
    	expect(tourTitle.getText()).toEqual('TOUR COMPLETE');
    	tourNext.click();
    	expect(headerOne.getText()).toEqual('VEHICLE LIST');
   	});

	it('profile settings', function() { 
		
		//navigate to profile page
		profileButton.click();
		userSettings.click();
		
		//clear() returns a promise so you must use then() to tell the promise what to do once the input is cleared
		element(by.css('input[name="firstName"]')).clear().then(function() 
			{element(by.css('input[name="firstName"]')).sendKeys('Protractor' + randVal);})
		element(by.css('input[name="lastName"]')).clear().then(function() 
			{element(by.css('input[name="lastName"]')).sendKeys('Test' + randVal);})
		element(by.model('user.Phone')).clear().then(function() 
			{element(by.model('user.Phone')).sendKeys(randVal);})
		
		//selecting default timezone to not set then pacific/honolulu
		element(by.css('.picklist__arrow--blue')).click();
		element(by.linkText('Not Set')).click();
		element(by.css('.picklist__arrow--blue')).click();
		element(by.linkText('Pacific/Honolulu')).click();

		//clicking the save button and waiting for save state to activate then checking that the button is disabled
		element(by.buttonText('SAVE USER')).click();
		browser.driver.sleep(5000);
		expect(element(by.css('button[ng-disabled="!user.__view__.changed"]')));
	});

	it('global settings', function() {

		//navigate to profile page
		profileButton.click();
		userSettings.click();
		
		//Global admin settings page
		element(by.linkText('Global')).click();
		
        //had to use an if else statement combined with .isPresent which returns a promise
        element(by.css('.toggle__content.is-on')).isPresent().then(function(isPresent) {
            
            //The if statement toggles off the faults resolved then on again with checks verifying the right functionality exists
            if (isPresent) {
                element(by.css('.toggle__item.toggle__switch')).click();
                browser.driver.sleep(2000);
    			element(by.buttonText('SAVE')).click();
    			browser.driver.sleep(5000);
    			element(by.linkText('FAULTS')).click();
    			expect(browser.isElementPresent(by.buttonText('Unresolved'))).toBe(false);
    			profileButton.click();
				userSettings.click();
				element(by.linkText('Global')).click();
				element(by.css('.toggle__item.toggle__switch')).click();
    			element(by.buttonText('SAVE')).click();
    			browser.driver.sleep(5000);
    			element(by.linkText('FAULTS')).click();
                browser.driver.sleep(5000);
    			expect(element(by.buttonText('Unresolved')));
    			expect(element(by.buttonText('Resolved')));
				expect(element(by.css('#resolveButton')));
    		}
            
            // the else statement toggles on then off again with fault page verification
    		else {
    			element(by.css('.toggle__item.toggle__switch')).click();
                browser.driver.sleep(2000);
    			element(by.buttonText('SAVE')).click();
    			browser.driver.sleep(5000);
                element(by.linkText('FAULTS')).click();
    			expect(element(by.buttonText('Unresolved')));
    			expect(element(by.buttonText('Resolved')));
				expect(element(by.css('#resolveButton')));
				profileButton.click();
				userSettings.click();
				element(by.linkText('Global')).click();
				element(by.css('.toggle__item.toggle__switch')).click();
                browser.driver.sleep(2000);
    			element(by.buttonText('SAVE')).click();
    			browser.driver.sleep(5000);
    			element(by.linkText('FAULTS')).click();
                browser.driver.sleep(5000);
    			expect(browser.isElementPresent(by.buttonText('Unresolved'))).toBe(false);
			}
	   });
    });

    //checking that the checkbox next to all system generated admin roles for fleets is disabled
    it('Admin Deletion Test', function() {
        profileButton.click();
        userSettings.click();
        element(by.linkText('Manage Users and Roles')).click();
        browser.driver.sleep(5000);
        
        browser.executeScript('window.scrollTo(0,10000);').then(function() 
        {expect(nameSearch);})
        
        browser.driver.sleep(3000);
    
        element(by.css('input[placeholder="Name"]')).click().sendKeys('ADMIN - DEMO DTNA TRUCKING');

        browser.executeScript('window.scrollTo(0,10000);').then(function() 
        {expect(nameSearch);})
        
        browser.driver.sleep(1000);

        element.all(by.css('label[data="table.context.checkboxes"]')).get(3).click();
        
        browser.driver.sleep(1000);
        
        element(by.buttonText('Remove Role')).click();
        element(by.css('button[ng-click="roles.removeRoleConfirmed()"]')).click();
        
        browser.driver.sleep(3000);
        
        element(by.css('button[data-dismiss="modal"]')).click();

        browser.driver.sleep(3000);
        expect(element(by.linkText('Admin - Demo DTNA Trucking')));
    });

    it('manage vehicles single upload', function() {
       
         //navigate to account switch modal
        profileButton.click();
        switchAccount.click();
        
        //modal is now open - now passing clear that returns a promise THANKS KEN FOR MAKING ME DO EXTRA 
        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        //nameSearch.click().sendKeys('DEMO DTNA');
        rowElement.click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');

        profileButton.click();
        userSettings.click();
        element(by.linkText('Manage Vehicles')).click();
        
        browser.driver.sleep(2000);
        
        browser.driver.actions().click(firstUnitid).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.BACK_SPACE).sendKeys(protractor.Key.ENTER).perform();
        
        browser.driver.sleep(5000);

        browser.driver.actions().click(firstUnitid).sendKeys(Key.chord(randVal, protractor.Key.ENTER)).perform();
        
        browser.driver.sleep(5000);
        
        expect(firstUnitid.getText()).toEqual(randVal.toString());
    });

    it('view vehicle analytics', function() {
        profileButton.click();
        switchAccount.click();

       //modal is now open - now passing clear that returns a promise THANKS KEN FOR MAKING ME DO EXTRA 
        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('GOLD MEDAL BAKERY');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TT99742');})
        //nameSearch.click().sendKeys('DEMO DTNA');
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('GOLD MEDAL BAKERY');

        element(by.id('vehicleAnalytics')).click();
        expect(element(by.id('analyticsTitle')));

        browser.driver.sleep(2000);

        expect(element(by.css('strong[ng-if="fleetDemographics.recentAvgDistancePerVehicle"]')).getText()).toBeLessThan('20000');
        element.all(by.css('.button')).get(2).click();
        element.all(by.css('.button')).get(3).click();
        element.all(by.css('.button')).get(2).click();
        
    });
        
    it('vehicle list service now toggles', function() {
        
        profileButton.click();
        switchAccount.click();

         nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');

        element(by.css('.faultClassification.status-service-now')).isPresent().then(function(isPresent) {
            
            //The if statement toggles off the filter then back while checking
            if (isPresent) {
                element.all(by.css('.checkbox.button.button--secondary.is-selected')).get(0).click();
                expect(element(by.css('.faultClassification.status-service-now')).isPresent()).toBe(false);
                element.all(by.css('.checkbox.button.button--secondary')).get(0).click();
                expect(element(by.css('.faultClassification.status-service-now')).isPresent()).toBe(true);
            }
            
            // the else statement toggles on then off again
            else {
                element.all(by.css('.checkbox.button.button--secondary')).get(0).click();
                expect(element(by.css('.faultClassification.status-service-now')).isPresent()).toBe(true);
                element.all(by.css('.checkbox.button.button--secondary.is-selected')).get(0).click();
                expect(element(by.css('.faultClassification.status-service-now')).isPresent()).toBe(false);
            }
       });
    });

    it('resolving and unresolving faults', function() {
        
        profileButton.click();
        switchAccount.click();

        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');
        
        browser.driver.sleep(2000);
        
        element(by.id('faultsTab')).click();

        browser.driver.sleep(2000);

        element.all(by.css('.picklist__arrow--blue')).get(1).click();

        browser.driver.sleep(2000);

        element(by.linkText('10 items per page')).click();
        element.all(by.css('.checkbox--faux')).get(1).click();
        element(by.id('resolveButton')).click();
       
        browser.driver.sleep(2000);

        element(by.buttonText('MARK resolved')).click();

        browser.driver.sleep(2000);

        element(by.buttonText('Resolved')).click();

        browser.driver.sleep(2000);

        element.all(by.css('.checkbox--faux')).get(1).click();

        browser.driver.sleep(2000);

        element(by.id('resolveButton')).click();

        browser.driver.sleep(2000);

        element(by.buttonText('MARK unresolved')).click();
    });

    it('vehicle history flag toggling', function() {
        
        profileButton.click();
        switchAccount.click();


         nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');

        element.all(by.binding('row.Serial')).get(0).click();

        browser.driver.sleep(5000);

        element.all(by.css('.icon.icon--medium')).get(0).isPresent().then(function(isPresent) {
            
            //The if statement toggles off the filter then back while checking
            if (isPresent) {
                element.all(by.css('td[ng-click="table.context.toggleFaultFlag(row)"]')).get(0).click();
                expect(element.all(by.css('.icon.icon--medium')).get(0).isPresent()).toBe(false);
                element.all(by.css('td[ng-click="table.context.toggleFaultFlag(row)"]')).get(0).click();
                expect(element.all(by.css('.icon.icon--medium')).get(0).isPresent()).toBe(true);
                element.all(by.css('td[ng-click="table.context.toggleFaultFlag(row)"]')).get(0).click();
                expect(element.all(by.css('.icon.icon--medium')).get(0).isPresent()).toBe(false);
            }
            
            // the else statement toggles on then off again
            else {
                element.all(by.css('td[ng-click="table.context.toggleFaultFlag(row)"]')).get(0).click();
                expect(element.all(by.css('.icon.icon--medium')).get(0).isPresent()).toBe(true);
                element.all(by.css('td[ng-click="table.context.toggleFaultFlag(row)"]')).get(0).click();
                expect(element.all(by.css('.icon.icon--medium')).get(0).isPresent()).toBe(false);

            }
        });
    });

    it('vehicle list status modal', function() {

        profileButton.click();
        switchAccount.click();


         nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');


        browser.driver.sleep(2000);

        element.all(by.css('.faultClassification.status-service-now')).get(0).click();
        expect(element(by.css('.modal_header')));

        
        browser.driver.sleep(2000);

        expect(element(by.css('span[translate="Engine Power Limited:"]')).getText()).toEqual('Engine Power Limited:');
        expect(element(by.css('span[translate="Finish Daily Route:"]')).getText()).toEqual('Finish Daily Route:');
        expect(element(by.css('span[translate="Leads to Vehicle Speed Limitation:"]')).getText()).toEqual('Leads to Vehicle Speed Limitation:');
        expect(element(by.css('span[translate="Red Stop Lamp (Engine Shutdown Code):"]')).getText()).toEqual('Red Stop Lamp (Engine Shutdown Code):');
        expect(element(by.css('span[translate="Special Notes:"]')).getText()).toEqual('Special Notes:');
        expect(element(by.css('span[translate="Stop Truck:"]')).getText()).toEqual('Stop Truck:');
        element(by.buttonText('Close')).click();

        browser.driver.sleep(2000);

        element.all(by.css('.faultClassification.status-service-now')).get(0).click();

        browser.driver.sleep(2000);

        element(by.buttonText('View Diagnosis')).click();

        browser.driver.sleep(2000);

        expect(element(by.id('diagnosisTitle')).isPresent()).toBe(true);
    });

    it('vehicle list map expand', function() {

        profileButton.click();
        switchAccount.click();


        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('CR ENGLAND');})
        tanSearch.clear().then(function() {
            tanSearch.click().sendKeys('TM25438');})
        browser.driver.sleep(2000);
        element(by.css('.radio--faux')).click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('CR ENGLAND');

        element(by.css('.button.map-button.js-toggleIcon')).click();

        browser.driver.sleep(2000);

        element(by.css('.button.map-button.js-toggleIcon.is-open')).click();
       
    });
});