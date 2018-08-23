<template>
  <div id="app">
    <v-container fluid>
      <v-app light>
        <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app light width="400">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md12 class="text-xs-right">
                <v-btn color="info" @click="filter">Apply Filter</v-btn>
              </v-flex>
              <v-flex class="my-2" md12>
                <v-card>
                  <v-subheader>Price Range</v-subheader>
                  <v-card-text>
                    <v-layout row>
                      <v-flex
                        shrink
                        style="width: 60px"
                      >
                        <v-text-field
                          v-model="range[0]"
                          class="mt-0"
                          hide-details
                          single-line
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="px-3">
                        <v-range-slider
                          v-model="range"
                          :max="max"
                          :min="min"
                        ></v-range-slider>
                      </v-flex>
                      <v-flex
                        shrink
                        style="width: 100px"
                      >
                        <v-text-field
                          v-model="range[1]"
                          class="mt-0"
                          hide-details
                          single-line
                          type="number"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="my-2" md12>
                <v-card>
                  <v-subheader>No of Stops</v-subheader>
                  <v-card-text>
                    <v-checkbox v-model="selectedStops" color="info" label="0 Stop" value="0"></v-checkbox>
                    <v-checkbox v-model="selectedStops" color="info" label="1 Stop" value="1"></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex class="my-2" md12>
                <v-card>
                  <v-subheader>Airlines</v-subheader>
                  <v-card-text>
                    <v-list>
                      <v-list-tile v-for="(airline,i) in airlines" :key="i">
                        <v-list-tile-action><v-checkbox color="info" v-model="selectedAirline" :value="airline"></v-checkbox></v-list-tile-action>
                          <v-list-tile-avatar>
                           <img v-if="airline == 'Indigo'" src="./../assets/indigo.jpg">
                          <img v-if="airline == 'JetAirways'" src="./../assets/jet.jpg">
                          <img v-if="airline == 'AirIndia'" src="./../assets/airindia.jpg">
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>{{airline}}</v-list-tile-title>
                          </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped" class="indigo accent-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <v-toolbar-title>Flight Booking</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip bottom>
            <v-btn
              v-if="!login"  @click="loginDialogFunc"
              slot="activator"
              icon
            >
              <v-icon>fa-user-plus</v-icon>
            </v-btn>
            <span>Login</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn
              icon v-if="!login"  @click="regisyerDialogFunc"
              slot="activator"
            >
              <v-icon>fa-sign-in</v-icon>
            </v-btn>
            <span>Register</span>
          </v-tooltip>
          <v-btn v-if="login" color="indigo" @click="redirect">
            Booked Ticket History
          </v-btn>
          <v-btn v-if="login" color="indigo">
            Logout
          </v-btn>
        </v-toolbar>
        <v-content>
          <v-container fluid>
            <v-layout row wrap>
              <v-flex md12>
                <p class="caption">Book Domestic and International flights</p>
              </v-flex>
              <v-flex md12>
              <v-layout row wrap>
                <v-flex md2>
                  <v-autocomplete
                    label="From"
                    :rules="[() => !!from || 'This field is required']"
                    :error-messages="errorMessages"
                    v-model="from"
                    persistent-hint
                    :items="airports"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md2 class="px-2">
                  <v-autocomplete
                    label="To"
                    :rules="[() => !!to || 'This field is required']"
                    :error-messages="errorMessages"
                    v-model="to"
                    :items="airports"
                  ></v-autocomplete>
                </v-flex>
                <v-flex md3 class="px-2">
                  <v-menu
                    ref="menu"
                    :close-on-content-click="false"
                    v-model="menu"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      :rules="[() => !!date || 'This field is required']"
                      :error-messages="errorMessages"
                      label="Departure Date"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex md2 class="px-2">
                  <v-text-field
                      label="No of Passengers"
                      type="number"
                    ></v-text-field>
                </v-flex>
                <v-flex md2 class="px-2">
                  <v-btn outline color="indigo"  @click="submt"><v-icon>search</v-icon> Search</v-btn>
                </v-flex>
              </v-layout>
              </v-flex>
              <v-flex md12>
                <v-list three-line subheader>
                  <v-list-tile  v-for="flight in flights" :key="flight.id" avatar class="mb-3 pa-2 elevation-2">
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
                          <v-flex md12><v-btn color="error" @click="book(flight.id)">Book</v-btn></v-flex>
                          <v-flex md12 class="caption" style="color:red">{{flight.capacity}} Remaining</v-flex>
                      </v-layout>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex>
                <v-dialog v-model="logindialog" max-width="700px">
                  <v-card class="mx-auto elevation-20" style="max-width: 700px;background-color: #ffffff;">
                    <v-layout row wrap>
                      <v-flex md12>
                        <v-card-title primary-title>
                          <div class="text-sm-center"> Login Here </div>
                        </v-card-title>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-text-field
                          label="Email"
                          type="email"
                          v-model="loginData.email"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-text-field
                          label="password"
                          v-model="loginData.password"
                          type="password"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-btn color="info" @click="loginFunc">Login</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
              </v-flex>
              <v-flex>
                <v-dialog v-model="registerdialog" max-width="700px">
                  <v-card class="mx-auto elevation-20" style="max-width: 700px;background-color: #ffffff;">
                    <v-layout row wrap>
                      <v-flex md12>
                        <v-card-title primary-title>
                          <div class="text-sm-center"> Register Here </div>
                        </v-card-title>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-text-field
                          label="Name"
                          type="text"
                          v-model="registerData.name"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-text-field
                          label="Email"
                          type="email"
                          v-model="registerData.email"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-text-field
                          label="password"
                          type="password"
                          v-model="registerData.password"
                        ></v-text-field>
                      </v-flex>
                      <v-flex md10 offset-md1>
                        <v-btn color="info" @click="registerFunc">Register</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      logindialog: false,
      registerdialog: false,
      drawer: true,
      clipped: false,
      errorMessages: '',
      airlines: [],
      result: [],
      min: 0,
      max: 20000,
      range: [0, 6000],
      noStops: [0, 1],
      selectedStops: ['0', '1'],
      selectedAirline: [],
      airports: [],
      flights: [],
      from: '',
      to: '',
      date: null,
      menu: false,
      login: false,
      loginData: {
        email: '',
        password: ''
      },
      registerData: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    filter () {
      //this.result.length = 0
      let remove = []
      for(let i=0 ; i < this.flights.length; i++) {
        let flight = this.flights[i]
        if(flight.cost < this.range[0] || flight.cost > this.range[1]) {
          this.flights.splice(i,1)
          i--
        }
      }
    },
    redirect () {
      this.$router.push({path: '/history/' + this.loginData.email})
    },
    async submt () {
      var obj = {
        source: this.from,
        destination: this.to
      }
      let res = await axios.post('http://localhost:3000/getFlights', obj)
      console.log(res.data.data)
      this.flights.length = 0
      this.flights = res.data.data
    },
    async book (flightId) {
      if (this.login) {
        let obj = {
          flightId: flightId,
          email: this.loginData.email
        }
        console.log(obj)
        let res = await axios.post('http://localhost:3000/book', obj)
        console.log(res.data)
        this.$swal('Good job!', 'Your Ticket has been booked!', 'success')
          for(let i = 0; i< this.flights.length; i++) {
          let id = this.flights[i].id
          if(id == flightId) {
            this.flights[i].capacity--
          }
        }
      }
      else {
        this.$swal(
          'Error!',
          'Your need to login before booking!',
          'warning'
        )
      }
    },
    async loginFunc () {
      console.log(this.loginData)
      let res = await axios.post('http://localhost:3000/login', this.loginData)
      if (res.data.data.length > 0) {
        console.log('Login success')
        this.login = true
        this.logindialog = !this.logindialog
        this.$swal(
          'Good job!',
          'Log in Successfull',
          'success'
        )
      }
      else {
        this.$swal(
          'Error!',
          'Invalid credentials',
          'error'
        )
        console.log('Wrong Creditentials')
      }
    },
    async registerFunc () {
      let res = await axios.post('http://localhost:3000/register', this.registerData)
      if (res.data.data) {
        this.$swal(
          'Good job!',
          'Registration Successfull',
          'success'
        )
        this.registerdialog = !this.registerdialog
      }
    },
    loginDialogFunc () {
      this.logindialog = !this.logindialog
    },
    regisyerDialogFunc () {
      this.registerdialog = !this.registerdialog
    }
  },
  async created () {
    let res = await axios.get('http://localhost:3000/getAirports')
    for (let i = 0; i < res.data.data.length; i++) {
      this.airports.push(res.data.data[i].city)
    }
    let res1 = await axios.get('http://localhost:3000/getAirlines')
    for (let i = 0; i < res1.data.data.length; i++) {
      this.airlines.push(res1.data.data[i].name)
    }
    this.selectedAirline = this.airlines
    let result = await axios.get('http://localhost:3000/getFlights')
    this.flights = result.data.data
    this.result = result.data.data
    console.log(this.result)
  }
}
</script>
