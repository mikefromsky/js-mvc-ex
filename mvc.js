/*
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
*/
/**
 * Main application object
 * @type {Function}
 */
var mvcPage = (function () {
    /**
     * Constants matching every field in form
     * @type {boolean}
     */
    var FORM_STATE=false, NAME_STATE, EMAIL_STATE, COMMENT_STATE; //
    /**
     * Methods for initialisation of main objects and manipulating them
     * @type {{start: Function, setState: Function, setColor: Function, showMsg: Function, toggleButton: Function}}
     */
    var View = { //define all view properties and actions
        /**
         * Initialise fields of form
         */
        start: function () {
            this.uName = document.getElementById("uname");
            this.email = document.getElementById("email");
            this.comment = document.getElementById("comment");
            this.go = document.getElementById("go");
            this.commentForm = document.getElementById("comment-form");
            this.go.disabled=true;
        },
        /**
         * Sets state for current input (color of borders, and supposed to add text messages)
         * @param elem input element to work with
         * @param bool state of input
         */
        setState: function (elem, bool) {
            this.setColor(elem, bool);
//        var msg = (bool)?"ok":"name";
//        this.showMsg(elem,msg);
        },
        /**
         * Sets color for selected input
         * @param elem input element to work with
         * @param bool state of input
         * @returns {View}
         */
        setColor: function (elem, bool) {
//            if (bool) elem.style.borderColor = "LawnGreen"; else elem.style.borderColor = "red";  // simplify!!!
            elem.style.borderColor = (bool) ? "LawnGreen" : "red";
            return this;
        },
        /**
         * Sets msg after input !!! IS NOT READY FOR USE !!!
         * @param elem input element to work with
         * @param type message text
         */
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
        /**
         * Toggle (enable/disable) state of button (from this object)
         * @param bool
         */
        toggleButton:function(bool){
            if(bool){
                this.go.disabled=false;
            } else {
                this.go.disabled=true;
            }
        }
    };
    /**
     * Methods for validation
     * @type {{validateForm: Function, validateName: Function, validateEmail: Function, validateComment: Function}}
     */
    var Model = { //define models
        /**
         * Get main form state
         * @returns {*}
         */
        validateForm: function () {
            console.log(FORM_STATE);
            return FORM_STATE = NAME_STATE && EMAIL_STATE && COMMENT_STATE;
        },
        /**
         * Validate username
         * @param val input element
         * @returns {*}
         */
        validateName: function (val) {
            if (val.value.length < 3) {
                NAME_STATE = false;
            } else {
                NAME_STATE = true
            }
            return NAME_STATE;
        },
        /**
         * Validate email
         * @param val input element
         * @returns {*}
         */
        validateEmail:function(val){
            if (val.value.length < 7) { // TODO: regexp
                EMAIL_STATE = false;
            } else {
                EMAIL_STATE = true
            }
            return EMAIL_STATE;
        },
        /**
         * Validate comment
         * @param val input element
         * @returns {*}
         */
        validateComment:function(val){
            if (val.value.length < 15) { // TODO: anything
                COMMENT_STATE = false;
            } else {
                COMMENT_STATE = true
            }
            return COMMENT_STATE;
        }
    };

    /**
     * Main methods of application
     * @type {{validateForm: Function, validateName: Function, validateEmail: Function, validateComment: Function, bindEvents: Function}}
     */
    var Controller = { //define all contoller actions
        /**
         * Validate form
         */
        validateForm: function(){
            Model.validateForm()
            View.toggleButton(FORM_STATE);
        },
        /**
         * Validate name
         */
        validateName: function () {
            var nameValidateRes = Model.validateName(this);
            View.setState(this, nameValidateRes); // return this!!???
//          View.showMsg(this,"name")
        },
        /**
         * Validate email
         */
        validateEmail: function(){
            var emailValidateRes = Model.validateEmail(this);
            View.setState(this, emailValidateRes); // return this!!???
        },
        /**
         * Validate comment
         */
        validateComment: function(){
            var commentValidateRes = Model.validateComment(this);
            View.setState(this, commentValidateRes);
        },
        /**
         * Add event listeners to every element of app
         */
        bindEvents: function () {
            View.uName.addEventListener("change", this.validateName);
            View.email.addEventListener("change", this.validateEmail);
            View.comment.addEventListener("change", this.validateComment);

            View.go.addEventListener("click", function(){alert("ok")});

            View.commentForm.addEventListener("change", this.validateForm);
        }

    };

    return {
        /**
         * Initialise main objects and events
         */
        initialize: function () {//only method accessible outside
            console.log(View);
            View.start();


            Controller.bindEvents();
        }
    }
});
/**
 * App start point
 */
window.onload = function () {
    mvcPage().initialize();
}