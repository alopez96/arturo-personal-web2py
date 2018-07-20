
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
            self.vue.current_email = data.current_user_email;
            self.vue.form = data.show;
          })
    };

    self.add_user = function(){
      if(self.vue.email != null){
        $.post(sign_up_user_url,
          {
            name: self.vue.name,
            email: self.vue.email,
            phone_number: self.vue.phone,
            org: self.vue.org,
            reason: self.vue.reason,
          }, function(data){
            self.vue.users.unshift(data.users);
            enumerate(self.vue.users);
          });
          console.log('user added');
          alert("Thank you for messaging me!");
        }
        else{
          alert("Please enter email");
        }
    };

    self.delete_message = function(id, idx){
      console.log('delete');
      $.post(delete_message_url,{
        message_id: id,
      },function(data){
        if(data.success){
          self.vue.users.splice( idx, 1 );
          enumerate( self.vue.users);
        }
      })
    }

    self.hom = function(){
      console.log('home page');
    }

    self.edu = function(){
      console.log('education page');
    }

    self.exp = function(){
      console.log('experience page');
    }

    self.cont = function(){
      console.log('contact page');
    }

    self.res = function(){
      console.log('contact page');
      // if(!self.vue.resume){
      //   self.vue.resume = !self.vue.resume;
      //   self.vue.education = false;
      //   self.vue.experience = false;
      //   self.vue.home = false;
      // }
    }

    self.enter_toogle = function(){
      self.vue.enter = true;
    }

    self.cancel = function(){
      self.vue.enter = false;
    }

    $().ready (function (){
      $('#nav-home').click (function (event){
        // event.preventDefault();
        var goTop = $('#home').offset().top;
        $("html, body").animate({
          scrollTop: 0
        }, "slow");
      });

      $('#nav-edu').click(function (event){
        // event.preventDefault();
        var goTop = $('#education').offset().top;
        $("html, body").animate({
          scrollTop: goTop
        }, 500);
      });

      $('#nav-exp').click(function (event){
        // event.preventDefault();
        var goTop = $('#experience').offset().top;
        $("html, body").animate({
          scrollTop: goTop
        }, 500);
      });

      $('#nav-contact').click(function (event){
        // event.preventDefault();
        var goTop = $('#contact').offset().top;
        $("html, body").animate({
          scrollTop: goTop
        }, 500);
      });
    });


    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            users: [],
            logged_in: false,
            name: null,
            email: null,
            phone: null,
            org: null,
            reason: null,
            experience: true,
            education: true,
            contact: true,
            home: true,
            resume: true,
            enter: true,
            current_email: null,
            form: true,
        },
        methods: {
          add_user: self.add_user,
          delete_message: self.delete_message,
          hom: self.hom,
          exp: self.exp,
          edu: self.edu,
          cont: self.cont,
          res: self.res,
          enter_toogle: self.enter_toogle,
          cancel: self.cancel,
          delete_message: self.delete_message,
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
