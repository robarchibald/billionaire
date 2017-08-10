<template>
  <ul class="list-group">
    <li class="list-group-item" v-for="account in accounts">
      <div class="row">
        <label class="col-md-3">Account ID</label>
        <span class="col-md-9">{{account.account_id}}</span>
      </div>
      <div class="row">
        <label class="col-md-3">Status</label>
        <span class="col-md-3">{{account.status}}</span>
        <label class="col-md-3">Type</label>
        <span class="col-md-3">{{account.customer_type}}</span>
      </div>
      <h3>Applicants</h3>
      <div v-for="applicant in account.applicants">
        <div class="row">
          <label class="col-md-3">Applicant ID</label>
          <span class="col-md-9">{{applicant.applicant_id}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Name</label>
          <span class="col-md-3">{{applicant.name.first}} {{applicant.name.last}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Email</label><span class="col-md-3">{{applicant.email}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Mobile #</label><span class="col-md-3">{{applicant.mobile}}</span>
        </div>
        <div class="row">
          <label class="col-md-3">Address</label>
          <div class="col-md-9">
            <div>{{applicant.address.line_1}}</div>
            <div>{{applicant.address.city}}, {{applicant.address.state}} {{applicant.address.postal_code}}</div>
          </div>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <div>
        <h2>Create New Account</h2>
      </div>
      <form>
        <div class="row">
          <label class="col-md-3">First Name</label><input class="col-md-3" :value="firstName"/>
          <label class="col-md-3">Last Name</label><input class="col-md-3" :value="lastName"/>
        </div>
        <div class="row">
          <label class="col-md-3">Email</label><input class="col-md-3" :value="email"/>
          <label class="col-md-3">Mobile #</label><input class="col-md-3" :value="mobile"/>
        </div>
        <div class="row"><label class="col-md-3">Address</label><input class="col-md-9" :value="address"/></div>
        <div class="row">
          <label class="col-md-3">City</label><input class="col-md-3" :value="city"/>
          <label class="col-md-3">State</label><input class="col-md-3" :value="state"/>
        </div>
        <div class="row">
            <label class="col-md-3">Postal Code</label><input class="col-md-3" :value="postalCode"/>
            <label class="col-md-3">Country</label><input class="col-md-3" :value="country"/>
        </div>
        <div class="row">
          <label class="col-md-5">Social Security Number</label><input class="col-md-4" :value="ssn"/>
        </div>
        <div class="row">
            <label class="col-md-5">Employment Status</label>
            <select v-model="employmentStatus" class="col-md-4">
              <option>employed</option>
              <option>retired</option>
              <option>student</option>
              <option>unemployed</option>
          </select>
        </div>
        <div class="row">
          <label class="col-md-5">Citizenship Country</label><input class="col-md-4" :value="citizenshipCountry"/>
        </div>
        <div class="row">
          <label class="col-md-5">Birth Date</label><input class="col-md-4" :value="birthDate"/>
        </div>
        <input type="button" value="Create Account" v-on:click="createAccount"/>
      </form>
    </li>
  </ul>
</template>

<style>
  .row {
    margin-bottom: 10px;
    margin-right: 0;
  }
</style>

<script>
import axios from 'axios';

export default {
  name: 'accountDetails',
  created() {
    this.getAccounts();
  },
  data() {
    return {
      firstName: 'Joe',
      lastName: 'Jones',
      email: 'email@example.com',
      mobile: '111-222-3333',
      ssn: '999-88-7777',
      address: '1234 Address St.',
      city: 'City',
      state: 'State',
      postalCode: '12345',
      country: 'USA',
      employmentStatus: 'employed',
      citizenshipCountry: 'USA',
      birthDate: '1998-12-31',
      accounts: [],
    };
  },
  methods: {
    getAccounts() {
      axios.get('http://localhost:1234/api/accounts').then((response) => {
        console.log(response.data);
        this.accounts.push(...response.data.items);
      }).catch((err) => {
        console.log('error getting accounts', err);
      });
    },
    createAccount() {
      const account = {
        customer_type: 'individual',
        applicants: [
          {
            name: {
              first: this.firstName,
              last: this.lastName,
            },
            ssn: this.ssn,
            address: {
              line_1: this.address,
              city: this.city,
              state: this.state,
              postal_code: this.postalCode,
              country: this.country,
            },
            employment_status: this.employmentStatus,
            birthday: this.birthDate,
            email: this.email,
            citizenship_country: this.citizenshipCountry,
            mobile: this.mobile,
          },
        ],
      };
      console.log('calling method with', account);
      axios.post('http://localhost:1234/api/accounts', account).then((response) => {
        this.accounts.push(...response.data);
      }).catch((err) => {
        console.log('error creating account', err);
      });
    },
  },
};
</script>
