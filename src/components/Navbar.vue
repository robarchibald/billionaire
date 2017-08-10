<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class=container>
      <div class=navbar-header>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class=navbar-brand href="/"><img src="static/images/TPTLogo.png" alt="TPT logo" height="30"></a>
      </div>
      
      <div class="collapse navbar-collapse" id="navbar-collapse">
        <form class="navbar-form" role="search">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search ticker (e.g.AAPL,FB)">
            <span class="input-group-btn">
              <button type="submit" class="btn btn-default"><i class="fa fa-search"></i> <span class="sr-only">Submit</span></button>
            </span>
          </div>
        </form>

        <ul class="nav navbar-nav navbar-right">
          <li v-if="me"><a role="button" title="Profile"><img class="miniprofile" :src="me.picture"/> {{me.name}}</a></li>
          <li><a href="/" role="button">Home</a></li>
          <li><a href="/friends" role="button"><i class="fa fa-user" title="Friends"></i></a></li>
          <li><a href="/messages" role="button"><i class="fa fa-comments-o" title="Messages"></i></a></li>
          <li><a href="/notifications" role="button"><i class="fa fa-bell" title="Notifications"></i></a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style>
  form {
    display: inline-block;
  }
  .navbar-brand {
    margin-top: -5px;
  }
  .nav .fa {
    font-size: 15pt;
  }
</style>  

<script>
export default {
  name: 'navbar',
  props: ['me'],
};
</script>
