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
        //have to turn on angular async flag back on
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
                nameSearch.click().sendKeys('NUSSBAUM TRUCKING');
            })
            //nameSearch.click().sendKeys('DEMO DTNA');
        rowElement.click();
        continueButton.click();
        expect(fleetName.getText()).toEqual('NUSSBAUM TRUCKING');
    });

    //clicking on the different service filter checkboxes + using the show all button
    it('vehicle list filter checkboxes', function() {

        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(0).click();
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(1).click();
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(2).click();
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(3).click();
        browser.driver.sleep(2000);
        element(by.css('.button--text.checkbox.checkbox--icon--show-all')).click();
        browser.driver.sleep(2000);
    });

    it('map expand button', function() {

        element(by.css('.button.map-button.js-toggleIcon')).click();
        browser.driver.sleep(2000);
        expect(element(by.css('.column.span--8of12.margin-top--large.js-mapWrapper.span--7of12.span--10of12.push--1of12')));
        element(by.css('.button.map-button.js-toggleIcon')).click();
    });

    it('vehicle list table sort arrows', function() {
        //status sort arrows
        element.all(by.css('.icon--sort')).get(0).click();
        element.all(by.css('.icon--sort')).get(0).click();
        //unitid sort arrows
        element.all(by.css('.icon--sort')).get(1).click();
        element.all(by.css('.icon--sort')).get(1).click();
        //serial sort arrows
        element.all(by.css('.icon--sort')).get(2).click();
        element.all(by.css('.icon--sort')).get(2).click();

    });

    it('clicking a serial link and checking it went to the correct vehicle history', function() {
        element.all(by.binding('row.Serial')).first().getText().then(function(original_text) {

            element.all(by.binding('row.Serial')).first().click();

            element(by.binding(' vehicle.Serial ')).getText().then(function(new_text) {
                expect(new_text).toContain(original_text);
            });
        });



    });
});
