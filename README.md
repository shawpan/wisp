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
**wisp.UserControls** holds the methods to manipulate user controls

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
**wisp.Models.UserControl**

**----wisp.Models.UserControl.id** unique id

**----wisp.Models.UserControl.type** type of the control e.g., 'textbox'

**----wisp.Models.UserControl.domElement** html code for this control

**----wisp.Models.UserControl.borderColor** borderColor style property for this control

**----wisp.Models.UserControl.isRequired** boolean; required field if true 

**----wisp.Models.UserControl.validationMethod** currently two types supported (1) 'color' (2) 'message'

**----wisp.Models.UserControl.validationMessage** object to show validation message
