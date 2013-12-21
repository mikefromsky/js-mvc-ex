function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}


var mvcPage = (function() {
var FORM_STATE,NAME_STATE,EMAIL_STATE,COMMENT_STATE = false; //
var View = { //define all view properties and actions
    start: function() {
      View.uName = document.getElementById("uname")
    },
    setState: function(elem, bool){
        this.setColor(elem,bool);
        var msg = (bool)?"ok":"name";
        this.showMsg(elem,msg);
    },
    setColor: function(elem,bool){
        if(bool) elem.style.borderColor = "LawnGreen"; else elem.style.borderColor = "red";  // simplify!!!
//        elem.style.borderColor = (bool) ? "LawnGreen" : "red";
        return this;
    },
    showMsg:function(elem,type){
        var msgs = {
            name:"Name cannot be less than 3 symbols!",
            textarea:"Textarea cannot be empty!",
            ok:"Ok"
        }
        var msgText = document.createTextNode(msgs[type]),
            msg = document.createElement("span").appendChild(msgText);
        elem.parentNode.insertBefore(msg, elem.nextSibling);
    }
  };

  var Model = { //define models
    validateForm: function() {
      console.log("clicked!");
    },
    validateName: function(val){
        if(val.value.length < 3){
            NAME_STATE = false;
        } else {
           NAME_STATE = true
        }
        return NAME_STATE;
    }
  };


  var Controller = { //define all contoller actions
    validateForm: Model.validateForm,
    validateName: function(){
        var nameValidateRes = Model.validateName(this);
        View.setState(this,nameValidateRes); // return this!!???
//        View.showMsg(this,"name")
    },
    bindEvents: function() {
      // elem.addEventListener("click", function(){
      //  console.log(this.id);
      // })
      View.uName.addEventListener("change", this.validateName);
    }

  };

  return {
    initialize: function() {//only method accessible outside
      console.log(View);
      View.start();
      Controller.bindEvents();
    } 
  }
});

window.onload = function() {
  mvcPage().initialize();
}