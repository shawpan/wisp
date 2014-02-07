wisp
====

A JavaScript library for fancy User Controls

Sample
======
Add script
```
<script type="text/javascript" src="../wisp.js"></script>
```
Then,
```
wisp.DomReady(function(){
            var txtName = wisp.UserControls.create('textbox');
            txtName.isRequired = true;
            txtName.dataType = 'email';
            txtName.validationMethod = "color";
            txtName.renderControl('target1');

            var txtName2 = wisp.UserControls.create('textbox');
            txtName2.isRequired = true;
            txtName2.dataType = 'text';
            txtName2.validationMethod = "message";
            txtName2.renderControl('target2');
            console.log(txtName.value());
        })
```
Documentation
=============
**wisp.DomReady(mainFunction)** is the entry point method
```
//this should be the entry point
//put everything inside the function to be safe
wisp.DomReady(function(){
            var txtName = wisp.UserControls.create('textbox');
            txtName.isRequired = true;
            txtName.dataType = 'email';
            txtName.validationMethod = "color";
            txtName.renderControl('target1');
        })
```
**wisp.UserControls** has the methods to manipulate user controls

current types are **(1) 'textbox'**

**----wisp.UserControls.create(userControlType, customUserControlCreateFunction)** if customUserControlCreateFunction is provided, it ignores userControlType
```
//create a user control of type textbox
 var txtName2 = wisp.UserControls.create('textbox');
```
```
//create a user control using customCreateControl function
// customCreateControl returns a object that inherits from wisp.Models.UserControl
function customCreateControl(){
       //CustomUserControlTextBox inherits from wisp.Models.UserControl
        var txtBox = new CustomUserControlTextBox(); 

        var txtBoxDom = document.createElement("input");
        txtBoxDom.type = "text";
        txtBoxDom.value = ""
        txtBoxDom.placeholder = "Enter text here";
        txtBoxDom.style = "border:1px solid #000000";

        txtBox.type = "textbox";
        txtBox.domElement = txtBoxDom;
        txtBox.dataType = "text"

        return txtBox;
    }
 var txtName2 = wisp.UserControls.create('',customCreateControl);
```
**wisp.Models.UserControl** should be inherited by all types of UserControls
```
//a new UserControl for text box
function UserControlTextBox()
    {
        this.dataType = '';
    }
    UserControlTextBox.prototype = new UserControl();
```

**----wisp.Models.UserControl.id** unique id

**----wisp.Models.UserControl.type** type of the control e.g., 'textbox'

**----wisp.Models.UserControl.domElement** html code for this control

**----wisp.Models.UserControl.borderColor** borderColor style property for this control

**----wisp.Models.UserControl.isRequired** boolean; required field if true 

**----wisp.Models.UserControl.validationMethod** currently two types supported (1) 'color' (2) 'message'

**----wisp.Models.UserControl.validationMessage** object to show validation message

**----wisp.Models.UserControl.getId()** returns its unique Id

**----wisp.Models.UserControl.setId(value)** sets unique id to value

**----wisp.Models.UserControl.validate()** must be implemented to set validation method/settings
```
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
```

**----wisp.Models.UserControl.showValidationError()** must be implemented to show validation 
```
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
```

**----wisp.Models.UserControl.clearValidationError()** must be implemented to clear validation
```
//clear validation error
    UserControlTextBox.prototype.clearValidationError = function(){

        if(this.validationMethod != "color" && this.validationMessageRendered) {
            document.getElementById('validate-'+this.getId()).style.display = "none";
        }
        else
            document.getElementById(this.getId()).style.border = "1px solid #000000";
    }
```

**----wisp.Models.UserControl.renderControl(targetElementId)** renders the user control inside dom element with id=targetElementId
