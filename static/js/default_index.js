
var app = function() {

    var self = {};
    Vue.config.silent = false; // show all warnings
    // Extends an array
    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };
    // Enumerates an array.
    var enumerate = function(v) { var k=0; return v.map(function(e) {e._idx = k++;});};


    self.get_users = function(){
      $.getJSON(get_users_url,
          function (data) {
            self.vue.users = data.users;
            enumerate(self.vue.users);
          })
    };

    self.add_user = function(){
      if(self.vue.name != null){
        $.post(sign_up_user_url,
          {
            name: self.vue.name,
            email: self.vue.email,
            reason: self.vue.reason,
            best_time: self.vue.best_time,
          }, function(data){
            // $.web2py.enableElement($('#add_image_url'));
            self.vue.users.unshift(data.users);
            enumerate(self.vue.users);
          });
          console.log('user added');
          self.vue.enter = false;
          alert("Thank you for messaging me!");
        }
        else{
          alert("enter name");
        }
    };



    self.exp = function(){
      console.log('experience page');
      if(!self.vue.experience){
        self.vue.experience = !self.vue.experience;
        self.vue.education = false;
        self.vue.contact = false;
      }
    }
    self.edu = function(){
      console.log('education page');
      if(!self.vue.education){
        self.vue.education = !self.vue.education;
        self.vue.experience = false;
        self.vue.contact = false;
      }
    }
    self.cont = function(){
      console.log('contact page');
      if(!self.vue.contact){
        self.vue.contact = !self.vue.contact;
        self.vue.education = false;
        self.vue.experience = false;
      }
    }

    self.enter_toogle = function(){
      self.vue.enter = true;
    }

    self.cancel = function(){
      self.vue.enter = false;
    }


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            users: [],
            name: null,
            email: null,
            reason: null,
            best_time: null,
            experience: false,
            education: false,
            contact: false,
            home: false,
            enter: false,
        },
        methods: {
          add_user: self.add_user,
          exp: self.exp,
          edu: self.edu,
          cont: self.cont,
          enter_toogle: self.enter_toogle,
          cancel: self.cancel,
        }

    });

    self.get_users();
    $("#vue-div").show();

    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
