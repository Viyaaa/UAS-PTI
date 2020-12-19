const USER_URL = "https://dummyapi.io/data/api/user?limit=18";
const POST_URL = "https://dummyapi.io/data/api/post?limit=30";
const COMMENT_URL = "https://dummyapi.io/data/api/post/SFAt3mJK0qu4QOd9LgSX/comment?limit=10";
const TAG_URL = "https://dummyapi.io/data/api/tag?limit=20";
//const RANDOM_TAG_URL = "https://dummyapi.io/data/api/tag?limit="+(Math.floor(Math.random()*20));

//const APP_ID = "5fcf4043bb5b1e5127a0d2b8"; //enjel
//const APP_ID = "5fd9ed34d5eb38edb2d27f66"; //enjel2
//const APP_ID = "5fd318e40e37368a736aff3c"; //viya
//const APP_ID = "5fd30e1b04d7d2200babb209"; //odrik
const APP_ID = "5fd9f5524efe46135d27ad0c"; //viya_2

const user_get = new Vue({
  el: '#user',
  data () {
    return {
      userProfile: null,
	  userList: [],
	  userPic: null,
      userID: null,
	  userTitle: null,
	  userFname: null,
	  userLname: null,
	  userGender: null,
      userPhone: null,
      userEmail: null,
      locStreet: null,
      locCity: null,
      locState: null,
      locCountry: null,
    loading: false,
	  userPostBucket: [],
	  userPosts: null,
    search: "",
    }
  },

  methods: {
	fullProfile: function(id){
		  this.loading = false;
		  this.userPic = '';
          this.userID = '';
          this.userTitle = '';
          this.userFname = '';
          this.userLname = '';
		  this.userGender = '';
          this.userPhone = '';
          this.userEmail = '';
          this.locStreet = '';
          this.locCity = '';
          this.locState = '';
          this.locCountry = '';
        $("#col4").hide();
		  console.log(id)
		  fetch("https://dummyapi.io/data/api/user/" + id, {headers:  {"app-id": APP_ID}}, {
        method: "GET"
      })
      .then(response=>{
        console.log(response);
		this.loading = true;
    $("#col4").show();
        response.json().then((userProfile)=>{
          console.log(userProfile)
		  this.userPic = userProfile.picture;
          this.userID = userProfile.id;
          this.userTitle = userProfile.title;
          this.userFname = userProfile.firstName;
          this.userLname = userProfile.lastName;
		  this.userGender = userProfile.gender;
          this.userPhone = userProfile.phone;
          this.userEmail = userProfile.email;
          this.locStreet = userProfile.location.street;
          this.locCity = userProfile.location.city;
          this.locState = userProfile.location.state;
          this.locCountry = userProfile.location.country;
          console.log(this.userPhone);
        })
      })
	},
	userPost: function(id){
		this.loading = false;
		this.userPosts = ''; 
		fetch("https://dummyapi.io/data/api/user/" + id + '/post?limit=10', {headers:  {"app-id": APP_ID}}, {
        method: "GET"
      })
	  .then(response=>{
        response.json().then((userPostBucket)=>{
          console.log(userPostBucket.data)
          this.loading = true;
          this.userPosts = userPostBucket.data;
          console.log(this.userPosts);
        })
      })
	}
  },
  mounted () {
    axios
	  .get(USER_URL,{headers: {"app-id": APP_ID}})
	  .then(response => {this.userList = response.data.data
      console.log(response)})
    .catch(function(error) {
      if(error.response.status === 429) alert("error "+error.response.status+": Limit API habis! Silahkan coba diesok hari.");
      else if(error.response.status === 404) alert("Not Found!")
    })
  },

  computed: {
    searchList: function(){
      return this.userList.filter((user)=>{
        return user.firstName.toLowerCase().match(this.search.toLowerCase()) ||
               user.lastName.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
  
})

/*const post_get = new Vue({
  el: '#post',
  data () {
    return {
    	postList: null,
    }
  },
  mounted () {
    axios
	  .get(POST_URL,{headers: {"app-id":APP_ID}})
	  .then(response => (this.postList = response.data.data))
  }
})*/

const post_get = new Vue({
  el: '#post',
  data () {
    return {
      postList: null,
      commentBucket: null,
      commentMessage: [], //ngambil isi komen
      loading: false, //flag loading fetch API
      emptyComment: true, //kalo commentnya gada
    }
  },

  methods: {
    showComments(id){
      this.commentMessage = '';
      this.loading = false;
      this.emptyComment = true;
      console.log(id)
      fetch("https://dummyapi.io/data/api/post/" + id + "/comment?limit=10", {headers:  {"app-id": APP_ID}}, {
        method: "GET"
      })
      .then(response=>{
        //console.log(response);
        response.json().then((commentBucket)=>{
          console.log(commentBucket.data)
          //console.log(commentBucket.data.data)
          this.loading = true;
          this.commentMessage = commentBucket.data;
          console.log(this.commentMessage);
          if(this.commentMessage.length == 0){
            this.emptyComment = false;
          }
        })
      })
    }
  },

  mounted () {
    axios
    .get(POST_URL,{headers: {"app-id":APP_ID}})
    .then(response => (this.postList = response.data.data))
    .catch(function(error) {
      if(error.response.status === 429) alert("error "+error.response.status+": Limit API habis! Silahkan coba diesok hari.");
      else if(error.response.status === 404) alert("Not Found!")
    })
  }
})

/*const comment_get = new Vue({
  el: '#comment',
  data () {
    return {
      commentList: null
    }
  },
  mounted () {
   axios
   .get(COMMENT_URL, {headers: {"app-id":APP_ID}})
    .then(response => (this.commentList = response.data.data))
  }
})*/

const tag_get = new Vue({
  el: '#tag',
  data () {
    return {
      tagList: [],
      tagBucket: null,
      postByTag: [],
      search: "",
    }
  },

  methods: {
    selectTag(index){
      console.log(index);
       fetch("https://dummyapi.io/data/api/tag/" + index + "/post?limit=10", {headers:  {"app-id": APP_ID}}, {
        method: "GET"
      })
      .then(response=>{
        //console.log(response);
        response.json().then((tagBucket)=>{
          console.log(tagBucket.data)
          //console.log(commentBucket.data.data)
          this.postByTag = tagBucket.data;
          console.log(this.postByTag);
        })
      })
    }
  },

  mounted () {
    axios
	  .get(TAG_URL,{headers: {"app-id":APP_ID}})
	  .then(response => {
      this.tagList = response.data.data;
      console.log(this.tagList)
    })
    .catch(function(error) {
      if(error.response.status === 429) alert("error "+error.response.status+": Limit API habis! Silahkan coba diesok hari.");
      else if(error.response.status === 404) alert("Not Found!")
    })
  },

  computed: {
    searchTagList: function(){
      return this.tagList.filter((tag)=>{
        return tag.toLowerCase().match(this.search.toLowerCase());
      })
    }
  },

})

$('#home').hide();
$('#user').hide();
$('#post').hide();
$('#comment').hide();
$('#tag').hide();
$('#aboutus').hide();
$('#header').hide();
$('#PotaeMem').hide();

const welkam = new Vue ({
	el: ".welkam",
	methods: {
		welkam: function(){
			$('#home').show();
			$('#user').hide();
			$('#post').hide();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#header').show();
			$('.welkam').hide();
			$('#PotaeMem').hide();
		}
	}
})

const myNavbar = new Vue ({
	el: "#myNavbar",
	methods: {
		home_move: function(){
			$('#home').show();
			$('#user').hide();
			$('#post').hide();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#PotaeMem').hide();
		},
		user_move: function(){
			$('#home').hide();
			$('#user').show();
			$('#post').hide();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#PotaeMem').hide();
		},
		post_move: function(){
			$('#home').hide();
			$('#user').hide();
			$('#post').show();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#PotaeMem').hide();
		},
		/*comment_move: function(){
			$('#home').hide();
			$('#user').hide();
			$('#post').hide();
			$('#comment').show();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#PotaeMem').hide();
		},*/
		tag_move: function(){
			$('#home').hide();
			$('#user').hide();
			$('#post').hide();
			$('#comment').hide();
			$('#tag').show();
			$('#aboutus').hide();
			$('#PotaeMem').hide();
		},
		aboutus_move: function(){
			$('#home').hide();
			$('#user').hide();
			$('#post').hide();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').show();
			$('#PotaeMem').hide();
		},
		PotaeMem_move: function(){
			$('#home').hide();
			$('#user').hide();
			$('#post').hide();
			//$('#comment').hide();
			$('#tag').hide();
			$('#aboutus').hide();
			$('#PotaeMem').show();
		},
	},
})

// navbar button active 
$(".navbar-nav .item a").click(function(){
  $(".item a").removeClass("active");
  $(this).addClass("active");
  console.log("hello");
});

$("#potae").click(function(){
  $(".item a").removeClass("active");
  console.log("hello");
});