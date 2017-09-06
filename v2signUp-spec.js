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

afterEach(function() {
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
});
    
	it('sign up success', function() {
        //turn off angular sync to get past non angular pages
        //browser.ignoreSynchronization = true;
        //Start at desired page
        browser.get('https://ddtmwutelwebo02.azurewebsites.net/Signup#/signup');
    
        //fill in the form fields
        element(by.model('user.firstName')).click().sendKeys('signuptest' + randVal);
        element(by.model('user.lastName')).click().sendKeys('signuptest' + randVal);
        element(by.model('user.email')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.confirmEmail')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.phone')).click().sendKeys('5555555555');
         //don't know why but have to make this a variable for the expect to work
        var phone = element(by.model('user.phone'));
        expect(phone.getAttribute('value')).toEqual('(555) 555-5555');
        element(by.model('user.company')).click().sendKeys(dateNow);
        element(by.model('user.vin')).click().sendKeys('1FUGGLDV3GLZZ2539');
        
        //turn off async so test can interact with recaptcha iframe
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
        browser.sleep(500);
        browser.switchTo().frame(0);
        
        //click recaptcha checkbox
        element(by.id("recaptcha-anchor")).click();
        browser.sleep(3000);

        //switch back to main content frame and click next
        browser.driver.switchTo().defaultContent();
        element(by.css('input[value="Next"]')).click();
        
        //turn async back on because it can break stuff later in the test suite
        browser.ignoreSynchronization = false;      
    });

        it('sign up duplicate user', function() {
        //turn off angular sync to get past non angular pages
        browser.ignoreSynchronization = true;
        //Start at desired page
        browser.get('https://ddtmwutelwebo02.azurewebsites.net');
    
        //splash page
        splashSignUpButton.click();
        browser.driver.sleep(2000);
        
        element(by.model('user.firstName')).click().sendKeys('logintest' + randVal);
        element(by.model('user.lastName')).click().sendKeys('logintest' + randVal);
        element(by.model('user.email')).click().sendKeys('marrimg@gmail.com');
        element(by.model('user.confirmEmail')).click().sendKeys('marrimg@gmail.com');
        element(by.model('user.phone')).click().sendKeys('5555555555');
        var phone = element(by.model('user.phone'));
        expect(phone.getAttribute('value')).toEqual('(555) 555-5555');
        element(by.model('user.company')).click().sendKeys(dateNow);
        element(by.model('user.vin')).click().sendKeys('1FUGGLDV3GLZZ2539');
        element(by.css('input[value="Next"]')).click();
        browser.driver.sleep(2000);
        expect(headerOne.getText()).toEqual('A user with the specified email already exists.');


        browser.ignoreSynchronization = false;
    });

    it('sign up vin not found', function() {
        //turn off angular sync to get past non angular pages
        browser.ignoreSynchronization = true;
        //Start at desired page
        browser.get('https://ddtmwutelwebo02.azurewebsites.net');
    
        //splash page
        splashSignUpButton.click();
        browser.driver.sleep(2000);
        
        element(by.model('user.firstName')).click().sendKeys(dateNow);
        element(by.model('user.lastName')).click().sendKeys(dateNow);
        element(by.model('user.email')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.confirmEmail')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.phone')).click().sendKeys('5555555555');
        var phone = element(by.model('user.phone'));
        expect(phone.getAttribute('value')).toEqual('(555) 555-5555');
        element(by.model('user.company')).click().sendKeys(dateNow);
        element(by.model('user.vin')).click().sendKeys(dateNow);
        element(by.css('input[value="Next"]')).click();
        expect(headerOne.getText()).toEqual('The provided VIN was not found in any fleet.');
        
        //This section is clicking the page included back button and confirming that all the data you entered into the fields has persisted
        element(by.buttonText('Back')).click();
        
        var firstName = element(by.model('user.firstName'));
        expect(firstName.getAttribute('value')).toEqual(dateNow);
        
        var lastName = element(by.model('user.lastName'));
        expect(lastName.getAttribute('value')).toEqual(dateNow);

        var email = element(by.model('user.email'));
        expect(email.getAttribute('value')).toEqual(dateNow + '@mailinator.com');

        var confirmEmail = element(by.model('user.confirmEmail'));
        expect(confirmEmail.getAttribute('value')).toEqual(dateNow + '@mailinator.com');

        expect(phone.getAttribute('value')).toEqual('(555) 555-5555');

        var company = element(by.model('user.company'));
        expect(company.getAttribute('value')).toEqual(dateNow);

        var vin = element(by.model('user.vin'));
        expect(vin.getAttribute('value')).toEqual(dateNow);
        browser.ignoreSynchronization = false;
    });

    it('sign up incomplete fields modal', function() {
        //turn off angular sync to get past non angular pages
        browser.ignoreSynchronization = true;
        //Start at desired page
        browser.get('https://ddtmwutelwebo02.azurewebsites.net');
    
        //splash page
        splashSignUpButton.click();
        browser.driver.sleep(2000);
        
        element(by.model('user.firstName')).click().sendKeys(dateNow);
        element(by.model('user.lastName')).click().sendKeys(dateNow);
        element(by.model('user.email')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.confirmEmail')).click().sendKeys(dateNow + '@mailinator.com');
        element(by.model('user.phone')).click().sendKeys('5555555555');
        var phone = element(by.model('user.phone'));
        expect(phone.getAttribute('value')).toEqual('(555) 555-5555');
        element(by.model('user.company')).click().sendKeys(dateNow);
        element(by.css('input[value="Next"]')).click();
        expect(element(by.css('.modal__container')));
        browser.driver.sleep(2000);
        element(by.css('div[translate="Close"]')).click();
        var vin = element(by.model('user.vin'));
        expect(vin.getAttribute('value')).toEqual('');
        browser.ignoreSynchronization = false;
    });

    it('sign up error field messages', function() {
        //turn off angular sync to get past non angular pages
        browser.ignoreSynchronization = true;
        //Start at desired page
        browser.get('https://ddtmwutelwebo02.azurewebsites.net');
    
        //splash page
        splashSignUpButton.click();
        browser.driver.sleep(2000);
                
        //clicking all the form fields to pop the error messages below them
        element(by.model('user.firstName')).click();
        element(by.model('user.lastName')).click();
        element(by.model('user.email')).click();
        element(by.model('user.confirmEmail')).click();
        element(by.model('user.phone')).click();
        element(by.model('user.company')).click();
        element(by.model('user.vin')).click();
        element(by.model('user.company')).click();

        //verifying the messages

        var errorFirstName = element(by.css('div[ng-messages="userSignUp.firstName.$error"]'));
        expect(errorFirstName.getText()).toEqual('First name is required.');

        var errorLastName = element(by.css('div[ng-messages="userSignUp.lastName.$error"]'));
        expect(errorLastName.getText()).toEqual('Last name is required.');

        var errorEmail = element(by.css('div[ng-messages="userSignUp.email.$error"]'));
        expect(errorEmail.getText()).toEqual('Business email is required.')

        var errorConfirmEmail = element(by.css('div[ng-messages="userSignUp.confirmEmail.$error"]'));
        expect(errorConfirmEmail.getText()).toEqual('Business email is required.')

        var errorPhone = element(by.css('div[ng-messages="userSignUp.phone.$error"]'));
        expect(errorPhone.getText()).toEqual('Business phone number is required.');

        var errorCompany = element(by.css('div[ng-messages="userSignUp.company.$error"]'));
        expect(errorCompany.getText()).toEqual('Company name is required.');

        var errorVin = element(by.css('div[ng-messages="userSignUp.vin.$error"]'));
        expect(errorVin.getText()).toEqual('VIN is required.');

        browser.ignoreSynchronization = false;
    });
});