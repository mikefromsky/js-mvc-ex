/*
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
*/

var mvcPage = (function () {
    var FORM_STATE=false, NAME_STATE, EMAIL_STATE, COMMENT_STATE = false; //
    var View = { //define all view properties and actions
        start: function () {
            this.uName = document.getElementById("uname");
            this.email = document.getElementById("email");
            this.comment = document.getElementById("comment");
            this.go = document.getElementById("go");
            this.commentForm = document.getElementById("comment-form");
            this.go.disabled=true;
        },
        setState: function (elem, bool) {
            this.setColor(elem, bool);
//        var msg = (bool)?"ok":"name";
//        this.showMsg(elem,msg);
        },
        setColor: function (elem, bool) {
//            if (bool) elem.style.borderColor = "LawnGreen"; else elem.style.borderColor = "red";  // simplify!!!
        elem.style.borderColor = (bool) ? "LawnGreen" : "red";
            return this;
        },
        showMsg: function (elem, type) {
            var msgs = {
                name: "Name cannot be less than 3 symbols!",
                textarea: "Textarea cannot be empty!",
                ok: "Ok"
            };
            console.log(msgs[type]);
            /*
             var msgText = document.createTextNode(msgs[type]),
             msg = document.createElement("span").appendChild(msgText);
             elem.parentNode.insertBefore(msg, elem.nextSibling);
             */
        },
        toggleButton:function(bool){
            if(bool){
                this.go.disabled=false;
            } else {
                this.go.disabled=true;
            }
        }
    };

    var Model = { //define models
        validateForm: function () {
            return FORM_STATE = NAME_STATE && EMAIL_STATE && COMMENT_STATE;
            console.log(FORM_STATE);
        },
        validateName: function (val) {
            if (val.value.length < 3) {
                NAME_STATE = false;
            } else {
                NAME_STATE = true
            }
            return NAME_STATE;
        },
        validateEmail:function(val){
            if (val.value.length < 7) { // TODO: regexp
                EMAIL_STATE = false;
            } else {
                EMAIL_STATE = true
            }
            return EMAIL_STATE;
        },
        validateComment:function(val){
            if (val.value.length < 15) { // TODO: anything
                COMMENT_STATE = false;
            } else {
                COMMENT_STATE = true
            }
            return COMMENT_STATE;
        }
    };


    var Controller = { //define all contoller actions
        validateForm: function(){
            Model.validateForm()
            View.toggleButton(FORM_STATE);
        },
        validateName: function () {
            var nameValidateRes = Model.validateName(this);
            View.setState(this, nameValidateRes); // return this!!???
//          View.showMsg(this,"name")
        },
        validateEmail: function(){
            var emailValidateRes = Model.validateEmail(this);
            View.setState(this, emailValidateRes); // return this!!???
        },
        validateComment: function(){
            var commentValidateRes = Model.validateComment(this);
            View.setState(this, commentValidateRes);
        },
        bindEvents: function () {
            View.uName.addEventListener("change", this.validateName);
            View.email.addEventListener("change", this.validateEmail);
            View.comment.addEventListener("change", this.validateComment);

            View.go.addEventListener("click", function(){alert("ok")});

            View.commentForm.addEventListener("change", this.validateForm);
        }

    };

    return {
        initialize: function () {//only method accessible outside
            console.log(View);
            View.start();


            Controller.bindEvents();
        }
    }
});

window.onload = function () {
    mvcPage().initialize();
}