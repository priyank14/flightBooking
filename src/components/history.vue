<template>
  <div id="app">
    <v-app>
      <v-toolbar class="indigo accent-3">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Flight Booking</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>Booked Ticket History</v-btn>
          <v-btn flat>Log out</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex md10 offset-md1>
            <v-list three-line subheader>
                  <v-list-tile  v-for="flight in flights" :key="flight.id" avatar class="mb-3 pa-2 elevation-2" style="border-radius:4px">
                    <v-list-tile-avatar>
                      <img v-if="flight.name == 'Indigo'" src="./../assets/indigo.jpg">
                      <img v-if="flight.name == 'JetAirways'" src="./../assets/jet.jpg">
                      <img v-if="flight.name == 'AirIndia'" src="./../assets/airindia.jpg">
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        <v-layout row wrap>
                          <v-flex md6 class="title">{{flight.name}}<span class="caption px-1">({{flight.stops}}Stops)</span></v-flex>
                          <v-flex md6>Duration {{flight.duration}}</v-flex>
                        </v-layout>
                      </v-list-tile-title>
                      <v-list-tile-title>
                        <v-layout row wrap>
                          <v-flex md6>Departure Time : <b>{{flight.arrival}}</b></v-flex>
                          <v-flex md6>Arrival Time : <b>{{flight.departure}}</b></v-flex>
                        </v-layout>
                      </v-list-tile-title>
                       <v-list-tile-title>
                        <v-layout row wrap>
                          <v-flex md6>Origin : <b>{{flight.source}}</b></v-flex>
                          <v-flex md6>Destination : <b>{{flight.destination}}</b></v-flex>
                        </v-layout>
                      </v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-layout row wrap>
                          <v-flex md12>₹ {{flight.cost}}</v-flex>
                          <v-flex md12><v-btn color="error">Cancel</v-btn></v-flex>
                      </v-layout>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      flights: [],
      email: this.$route.params.email
    }
  },
  async created () {
    let email = this.$route.params.email
    let result = await axios.post('http://localhost:3000/getBookedFlights', {email})
    this.flights = result.data.data
    console.log(this.flights)
  }
}
</script>
