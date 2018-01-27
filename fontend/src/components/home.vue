<template>
	<v-app class='amber'>
		<v-card class='grey lighten-4'>
			<v-container>
			<v-layout justify-center>
				<h1 class='orange--text' style="font-family: 'Russo One', sans-serif; font-size:5em;"><strong>w3</strong>
				<span style="font-family: 'Josefin Sans', sans-serif; margin-left:-17px;" class="black--text">saver</span>
				</h1>
			</v-layout>
			<br>
			<h5 class='text-xs-center'>It's simple & free</h5>
			</v-container>
		</v-card>


		<v-container>
		<v-layout justify-center>
		<v-flex xs12 sm10 md8 lg6>
		<br>
			<v-text-field     class='elevation-3 amber accent-1'
			                  label="paste video url / type video title"
			                  single-line
			                  full-width
			                  hide-details
			                  :append-icon="'search'"
			                  :append-icon-cb="() => {onenter}"
			                  autofocus
			                  v-model='q'
			                  @keyup.enter='onenter'
			></v-text-field>

		<v-list v-show='qshow' class='elevation-1'>
		          <v-list-tile v-for='data in queryData' @click="$router.push('/get/'+data.id.videoId)">
		            <v-list-tile-content>
		              <v-list-tile-title v-text="data.snippet.title"></v-list-tile-title>
		            </v-list-tile-content>
		          </v-list-tile>
		</v-list>

		</v-flex>


        </v-layout>

        <br>
		<h5 class='text-xs-center black--text'>or you can put "w3" like this</h5> 
			<h3 class='text-xs-center black--text' >www.<strong class="amber darken-3">w3</strong>youtube.com/..
			</h3>
			</v-layout>
		</v-container>

	</v-app>


</template>

<script>
import textAni from './helper/textAni.js'
import axios from 'axios';

	export default{
		data(){
			return{
				qshow:false,
				queryData:'',
				q:''
			}
		},
		watch:{
			q(i){
				if(i.length > 0){
					this.qshow = true;
					this.query();
				}else{
					this.qshow = false
				}
			}
		},
		methods:{
			query(){
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.q}&key=AIzaSyBIdXsWiD1vGMXap3APNptA8KP-f-pZw3g`;

				axios.get(url).then(r=>{
					this.queryData = r.data.items;
				}).catch(e=>{
					console.log(e);
				})
			},
			onenter(){
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.q}&key=AIzaSyBIdXsWiD1vGMXap3APNptA8KP-f-pZw3g`;

				axios.get(url).then(r=>{
					this.$router.push('/get/'+r.data.items[0].id.videoId)
				}).catch(e=>{
					console.log(e);
				})
			}
		}
	}
</script>

<style>

</style>