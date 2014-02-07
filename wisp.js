/*
* A Custom Javascript Library for User Controls (text box, dropdown etc.)
 */

(function(){

    //this is the global namespace of this library that holds every functionality
    wisp = {};





    /*
    * This section defines the private methods and variables
     */

    var elementCounter = 1;

    //validate a string for a vaild email address
    function validateEmail(email) {
        //regex for email pattern e.g., something@something.com
        var emailFilter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return emailFilter.test(email);
    }






    /*
    * This section defines the model classes
     */

    //object that holds model classes
    var Models = {};

    //create a UserControl class
    function UserControl()
    {
        this.id = '';
        this.type = 'default';
        this.domElement = '';
        this.borderColor = '';
        this.isRequired = false;
        this.validationMethod = "color"
        this.validationMessageRendered = false;
        this.validationMessage = {
            'default' : 'Error'
        }
    }
    UserControl.prototype = {

        //get unique id
        getId : function() {
            return this.domElement.id;;
        },

        //set unique id
        setId : function(val) {
            this.domElement.id = 'wisp-' + this.type + "-" +val.toString();
        },
        //implements on how this control should be validated
        validate : function(){
            console.log('User Control validation');
        },
        //implements on how to show validation error
        showValidationError : function() {
            console.log('Show validation error');
        },
        //implements on how to clear validation error
        clearValidationError : function() {
            console.log('Clear validation error');
        },
        //render the user control's dom element under element with Id = [targetElId]
        renderControl : function(targetElId){
            //get the target
            var targetEl = document.getElementById(targetElId);
            //check if target exists
            if(targetEl) {
                this.setId(elementCounter++);
                this.domElement = targetEl.appendChild(this.domElement);
                this.validate();
                console.log('rendered user control');
            }

        }
    }


    //create a TextBox UserControl class inherited from UserControl
    function UserControlTextBox()
    {
        this.dataType = '';
    }
    UserControlTextBox.prototype = new UserControl();

    UserControlTextBox.prototype.validationMessage = {
        'text' : 'Required',
        'email' : 'Not a valid email'
    }
    // get value of text box
    UserControlTextBox.prototype.value = function(){
        return this.domElement.value;
    }
    //set a value to text box
    UserControlTextBox.prototype.setValue = function(val){
        this.domElement.value = val;
    }
    //set a hint text to text box
    UserControlTextBox.prototype.setPlaceholder = function(val){
        this.domElement.placeholder = val;
    }

    //show validation error
    UserControlTextBox.prototype.showValidationError = function() {

        if(this.validationMethod != "color") {
            if(!this.validationMessageRendered) {
                console.log(this.getId());
                var errorDiv = document.createElement('div');
                errorDiv.id = 'validate-'+this.getId();
                errorDiv.innerHTML = this.validationMessage[this.dataType] ? this.validationMessage[this.dataType] : "Error";
                document.getElementById(this.getId()).parentNode.appendChild(errorDiv);
                this.validationMessageRendered = true;
            }
            else {
                document.getElementById('validate-'+this.getId()).style.display = "block";
            }
        }
        else
            document.getElementById(this.getId()).style.border = "1px solid #ff0000";
    }

    //clear validation error
    UserControlTextBox.prototype.clearValidationError = function(){

        if(this.validationMethod != "color" && this.validationMessageRendered) {
            document.getElementById('validate-'+this.getId()).style.display = "none";
        }
        else
            document.getElementById(this.getId()).style.border = "1px solid #000000";
    }

    //validate user input for the text box
    UserControlTextBox.prototype.validate = function(){
        console.log('UserControlTextBox validation');
        var userCtrl = this;

        if(userCtrl.dataType == 'email') {
            userCtrl.setPlaceholder("Enter email ... ");
        }
        //add event listener for the text box value change
        this.domElement.oninput = function (){

            //check if field is required
            if(userCtrl.isRequired && userCtrl.value() == ""){
                console.log('required field');
                userCtrl.showValidationError();
            }
            //check if the input is a wrongly formatted email
            else if(userCtrl.dataType == 'email' && !validateEmail(userCtrl.value())){
                console.log('require email field');
                userCtrl.showValidationError();
            }
            else {
                userCtrl.clearValidationError();
            }
        }
    }

    Models.UserControl = UserControl;
    Models.UserControlTextBox = UserControlTextBox;






    /*
    * This section defines the factory methods that creates gui elements
     */

    //factory object to hold factory methods that creates and returns user controls
    var Factory = {};

    //create default control
    function createDefault(){
        console.log('No control type was provided and no default type');
        return CreateTextBox();
    }
    //create and return a text box
    function createTextBox(){
        var txtBox = new Models.UserControlTextBox();

        var txtBoxDom = document.createElement("input");
        txtBoxDom.type = "text";
        txtBoxDom.value = ""
        txtBoxDom.placeholder = "Enter text ...";
        txtBoxDom.style = "border:1px solid #000000";

        txtBox.type = "textbox";
        txtBox.domElement = txtBoxDom;
        txtBox.dataType = "text"

        return txtBox;
    }

    Factory.defaultType = createDefault;
    Factory.textbox = createTextBox;







    /*
    * This section defines the UserControls object that exposes our primary exposed methods
    *  to create fancy user control elements
     */

    //this is the UserControls object that wraps up exposed functions like Create
    var UserControls = {

        // creates and returns a user control of type: ctrltype
        create : function(ctrlType){
            //if ctrlType exists
            if(wisp.Factory[ctrlType] && getType.toString.call(wisp.Factory[ctrlType]) === '[object Function]')
                return wisp.Factory[ctrlType]();
            //else return default
            return wisp.Factory['defaultType']();
        }
    }







    /*
    * This section assigns the prepared objects to wisp namespace
     */
    //assign desired objects to wisp namespace
    wisp.UserControls = UserControls;
    wisp.Factory = Factory;
    wisp.Models = Models;

    //some settings variable
    wisp.isDomReady = false;
    //wisp.elementCounter = 1;
    //add an special method for checking document readyness
    wisp.DomReady = function(mainFunc) {

        if(wisp.isDomReady){
            mainFunc();
        }
        else if(document.addEventListener){
            document.addEventListener("DOMContentLoaded", function(){
                wisp.isDomReady = true;
                mainFunc();
            }, false);
        }
    }
})()

