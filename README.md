wisp
====

A JavaScript library for fancy User Controls

Sample
======

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
