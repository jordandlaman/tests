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
    var splashSignUpButton = element(by.buttonText('Sign Up'))
    var randVal = Math.floor(Math.random() * 20);
    var dateNow = Date.now()
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
        browser.get('https://ddtmwutelwebo02.azurewebsites.net/');
    
        //splash page
        splashLoginButton.click();
    
        //micrsoft login page
        browser.driver.findElement(by.id('cred_userid_inputtext')).sendKeys('jordan@metaltoad.com');
        browser.driver.findElement(by.id('cred_password_inputtext')).sendKeys('Izilude1234');
        browser.driver.findElement(by.id('cred_sign_in_button')).click();
        
        //have to turn angular async flag back on
        browser.ignoreSynchronization = false;
    
        //ensure that we are on vehicle list page
        expect(headerOne.getText()).toEqual('DTNA');
    });

    //open switch account modal and navigate to DEMO DTNA fleet
    it('switch account', function() {
        browser.driver.sleep(10000);
        //navigate to account switch modal
        profileButton.click();
        switchAccount.click();
        
        //modal is now open
        nameSearch.clear().then(function() {
            nameSearch.click().sendKeys('NUSSBAUM TRUCKING');})
        //nameSearch.click().sendKeys('DEMO DTNA');
        rowElement.click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('NUSSBAUM TRUCKING');
    });
});

//NEED TO ADD MORE TO FILL OUT ACCOUNT SWITCHER FLOWS