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
    var faultFilterField = element(by.css('input[placeholder="FAULT"]'));
    var titleFilterField = element(by.css('input[placeholder="TITLE"]'));
    var serialFilterField = element(by.css('input[placeholder="SERIAL"]'));
    var unitidFilterField = element(by.css('input[placeholder="UNIT ID"]'));

    
    
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
        //expect(headerOne.getText()).toEqual('DTNA');
    });

    //open switch account modal and navigate to a specific fleet
    it('switch account', function() {
        
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

    it('fault page service checkboxes', function() {
        
        browser.driver.sleep(2000);

        //clicking on faults 
        element(by.css('a[href="/Portal#/faults"]')).click();

        //clicking on the different service filter checkboxes + using the show all button
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(0).click();
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(1).click();
        browser.driver.sleep(2000);
        element.all(by.css('.checkbox--faux')).get(2).click();
        browser.driver.sleep(2000);
        element(by.css('.button--text.checkbox.checkbox--icon--show-all')).click();
        browser.driver.sleep(2000);

    });

    it('daterange dropdown selector', function() {
        //testing all the different ranges
        element(by.id('daterange')).click();
        element(by.css('li[data-range-key="Today"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('Today');
        browser.driver.sleep(2000);
        element(by.id('daterange')).click();
        element(by.css('li[data-range-key="3 Days"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('3 Days');
        element(by.id('daterange')).click();
        browser.driver.sleep(2000);
        element(by.css('li[data-range-key="7 Days"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('7 Days');
        element(by.id('daterange')).click();
        browser.driver.sleep(2000);
        element(by.css('li[data-range-key="14 Days"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('14 Days');
        element(by.id('daterange')).click();
        browser.driver.sleep(2000);
        //this part of the test is broken and needs a more dynamic solution
        element(by.css('li[data-range-key="This Month"]')).click();
        expect(element(by.id('daterange')).getText()).toMatch('1');
        element(by.id('daterange')).click();
        browser.driver.sleep(2000);
        element(by.css('li[data-range-key="30 Days"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('30 Days');
        browser.driver.sleep(2000);
        element(by.id('daterange')).click();
        element(by.css('li[data-range-key="Custom Range"]')).click();
        //Passing in the ranges to the calendar
        element(by.css('input[name="daterangepicker_start"]')).clear().then(function() {
            element(by.css('input[name="daterangepicker_start"]')).click().sendKeys('02/14/2017');})
        element(by.css('input[name="daterangepicker_end"]')).clear().then(function() {
            element(by.css('input[name="daterangepicker_end"]')).click().sendKeys('03/14/2017');})
        browser.driver.sleep(2000);
        element(by.buttonText('Apply')).click();
        element(by.id('daterange')).click();
        browser.driver.sleep(2000);
        //resetting to default 7 days
        element(by.css('li[data-range-key="7 Days"]')).click();
        expect(element(by.id('daterange')).getText()).toEqual('7 Days');
    });

    
    
    
    it('fault flagging', function() {

        var faultFlag = element.all(by.css('td[ng-style="{width:table.model.hasFaultFlag.dimensions.width}"]')).first();

        faultFlag.click();
        browser.driver.navigate().refresh()
        expect(faultFlag);
        faultFlag.click();
     
    });

    
    it('resolving and unresolving faults', function() {
        
        browser.driver.sleep(2000);

        //clicking on faults 
        element(by.css('a[href="/Portal#/faults"]')).click();

        browser.driver.sleep(2000);

        element.all(by.css('.picklist__arrow--blue')).get(1).click();

        browser.driver.sleep(2000);

        element(by.linkText('10 items per page')).click();

        browser.driver.sleep(2000)
        
        element.all(by.css('.checkbox--faux')).get(4).click();
        element(by.css('.button.button--fixed-width.button--indicator--secondary')).click();
       
        browser.driver.sleep(2000);

        var MR = element(by.partialButtonText("MARK resolved"));
        var EC = protractor.ExpectedConditions;

        browser.wait(EC.presenceOf(MR), 5000);

        MR.click();

        browser.driver.sleep(2000);

        element(by.buttonText('Resolved')).click();

        browser.driver.sleep(2000);

        element.all(by.css('.checkbox--faux')).get(4).click();

        browser.driver.sleep(2000);

        element(by.css('.button.button--fixed-width.button--indicator--secondary')).click();

        browser.driver.sleep(2000);

        var MU = element(by.partialButtonText("MARK unresolved"));
        var EC = protractor.ExpectedConditions;

        browser.wait(EC.presenceOf(MU), 5000);

        MU.click();

        browser.driver.sleep(2000);

        element(by.buttonText('Unresolved')).click();

        element.all(by.css('.picklist__arrow--blue')).get(1).click();

        browser.driver.sleep(2000);

        element(by.linkText('20 items per page')).click();


    });
    
    it('filter fields', function() {
        faultFilterField.clear().then(function() {
            faultFilterField.click().sendKeys('1');})
        expect(element.all(by.css('td[ng-style="{width:table.model.Spn.dimensions.width}"]')).getText()).toMatch('1');
        
        faultFilterField.clear().then(function() {
            faultFilterField.click().sendKeys('˙∆øˆ˚∆˚∫ƒ®¥ˆ˙');})
        expect(element(by.css('.teletable-errors-container')).getText()).toBe('NO DATA TO DISPLAY');

        faultFilterField.clear().then(function() {
            faultFilterField.click().sendKeys('/19');})
        expect(element.all(by.css('td[ng-style="{width:table.model.Spn.dimensions.width}"]')).getText()).toMatch('/19');

        faultFilterField.clear().then(function() {
            faultFilterField.click();})

        titleFilterField.clear().then(function() {
            titleFilterField.click().sendKeys('cruise');})
        expect(element.all(by.css('td[ng-style="{width:table.model.SpnText.dimensions.width}"]')).getText()).toMatch('Cruise');
        
        titleFilterField.clear().then(function() {
            titleFilterField.click().sendKeys('˙∆øˆ˚∆˚∫ƒ®¥ˆ˙');})
        expect(element(by.css('.teletable-errors-container')).getText()).toBe('NO DATA TO DISPLAY');

        titleFilterField.clear().then(function() {
            titleFilterField.click().sendKeys('/');})
        expect(element.all(by.css('td[ng-style="{width:table.model.SpnText.dimensions.width}"]')).getText()).toMatch('/');

        titleFilterField.clear().then(function() {
            titleFilterField.click();})

        serialFilterField.clear().then(function() {
            serialFilterField.click().sendKeys('1');})
        expect(element.all(by.css('td[ng-style="{width:table.model.Serial.dimensions.width}"]')).getText()).toMatch('1');
        
        serialFilterField.clear().then(function() {
            serialFilterField.click().sendKeys('˙∆øˆ˚∆˚∫ƒ®¥ˆ˙');})
        expect(element(by.css('.teletable-errors-container')).getText()).toBe('NO DATA TO DISPLAY');

        serialFilterField.clear().then(function() {
            serialFilterField.click().sendKeys('b');})
        expect(element.all(by.css('td[ng-style="{width:table.model.Serial.dimensions.width}"]')).getText()).toMatch('B');

        serialFilterField.clear().then(function() {
            serialFilterField.click();})

        unitidFilterField.clear().then(function() {
            unitidFilterField.click().sendKeys('1');})
        expect(element.all(by.css('td[ng-style="{width:table.model.UnitId.dimensions.width}"]')).getText()).toMatch('1');
        
        unitidFilterField.clear().then(function() {
            unitidFilterField.click().sendKeys('˙∆øˆ˚∆˚∫ƒ®¥ˆ˙');})
        expect(element(by.css('.teletable-errors-container')).getText()).toBe('NO DATA TO DISPLAY');

        unitidFilterField.clear().then(function() {
            serialFilterField.click();})           

    });

    it('time default sort', function() {
        
        browser.driver.navigate().refresh()
        var getToday = element.all(by.binding('row.Timestamp | timezone ')).get(0).getText();
        expect(getToday).toMatch('Today');

    });
    
});