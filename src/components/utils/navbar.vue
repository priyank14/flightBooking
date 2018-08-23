<template>
  <div>
    <v-toolbar color="grey lighten-2" app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Flight Booking</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Log in</v-btn>
        <v-btn flat>Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'navbar'
}
</script>
