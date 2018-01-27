<template>
	<div>
	<v-app class='green accent-2'>




	<div >
		<v-container>
		<v-card class='elevation-6 deep-orange lighten-4'>
			<v-container>


				<v-layout justify-center>
					<v-icon class='display-3 red--text' style='margin-bottom:20px;'>error_outline</v-icon>
				<h1 class="display-3">{{$route.params.id}}</h1>
				</v-layout>


				<h1 class='display-3 text-xs-center'> <span>YOU</span><strong>TUBE</strong> ID is not VALID </h1>
			</v-container>

					<v-divider></v-divider>
					<v-text-field
							  class='elevation-0 grey lighten-3'	
			                  label="try to find a youtube video here!"
			                  single-line
			                  full-width
			                  hide-details
			                  v-model = 'q'
			                  :append-icon="'search'"
			                  :append-icon-cb="query"
			                  autofocus
			                  @keyup.enter='onenter'
			        ></v-text-field>

			        <!-- query list display -->

			        <!-- fetchData(data.id.videoId) -->
			        <v-list v-show='qshow' class='elevation-1'>
			                  <v-list-tile v-for='data in queryData' @click="$router.push('/get/'+data.id.videoId)">
			                    <v-list-tile-content>
			                      <v-list-tile-title v-text="data.snippet.title"></v-list-tile-title>
			                    </v-list-tile-content>
			                  </v-list-tile>
			        </v-list>
			</v-card>
		</v-container>
	</div>

	</v-app>
	</div>
</template>

<script>
import bodyTemplate from './bodyTemplate'
import axios from 'axios'
	export default{
		components:{
			bodyTemplate
		},
		data(){
			return{
				md:false,
				vData:'',
				links:{
					mp4:'',
					threeGp:'',
					m4a:'',
					onlyVideo:''
				},
				lg:false,
				size:{
					x:0,
					y:0
				},
				q:'',
				queryData:'',
				qshow:false,
				loading:true,
				content:false
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
			},
			links(){
				this.content = true;
			},
			loading(){
				console.log(this.loading);
			},
			'$route.params.id':function(i){
				console.log('loading',this.loading)
				i !== 'undefined'?this.fetchData(i):(alert('video not found try to be more specific'),this.$router.go(-1))
			}
		},
		beforeMount() {
		     this.onResize();
		     const i = this.$route.params.id;
		     i !== 'undefined'?this.fetchData(i):(alert('video not found try to be more specific'),this.$router.go(-1))
			 this.fetchData(this.$route.params.id);
		},
		beforeCreate(){

			const br = this.$vuetify.breakpoint;
					this.md = br.mdOnly;
					this.lg = br.lgOnly;
					this.sm = br.smOnly;
		},
		methods:{
			onResize(){
				this.size = {x:window.innerWidth , y:window.innerHeight}
				const br = this.$vuetify.breakpoint;
					this.md = br.mdOnly;
					this.lg = br.lgOnly;
					this.sm = br.smOnly;
			},
			query(){
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.q}&key=AIzaSyBIdXsWiD1vGMXap3APNptA8KP-f-pZw3g`;

				axios.get(url).then(r=>{
					this.queryData = r.data.items;
					console.log(this.queryData)
				}).catch(e=>{
					console.log(e);
				})
			},
			onenter(){
				const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.q}&key=AIzaSyBIdXsWiD1vGMXap3APNptA8KP-f-pZw3g`;

				axios.get(url).then(r=>{
					this.$router.push('/get/'+r.data.items[0].id.videoId)
					console.log(this.queryData)
				}).catch(e=>{
					console.log(e);
				})
			},
			fetchData(i){
				this.qshow = false;
				this.content = false;
				this.loading = true;
				console.log('started')
				axios.get(`${this.$store.state.server}get/${i}`).then(r=>{

					this.vData = r.data;
					this.content = true;

					if(r.data !== 'error'){

				// mp4 videos
				const mp4 = r.data.formats.filter(d=>{
					const dlink = d.url+'&title='+r.data.title;
					return d.container === 'mp4' && d.audioEncoding !== null && d.resolution !== null;
				})
					this.links.mp4 = mp4;
				
				// 3gp videos
				const threeGp = r.data.formats.filter(d=>{
					return d.container === '3gp'
				}) 
					this.links.threeGp = threeGp;

				// m4a audio
				const m4a = r.data.formats.filter(d=>{
					return d.container === 'm4a'
				})
				this.links.m4a = m4a;

				// only videos
				const onlyVideo = r.data.formats.filter(d=>{
					return d.container === 'mp4' && d.audioEncoding === null && d.resolution !== null;
				})

				this.links.onlyVideo = onlyVideo.slice(0, 3);
				console.log(this.vData);

				this.loading = false;
				console.log('ended');

				}else{

				}

				}).catch(e=>{
					console.log(e);
				})
			},
			download(i){
				console.log('download',i)
				window.location = i.url + '&title=' + this.vData.title;
			},
			gotoyt(){
				window.location = this.vData.video_url;

			}
		}
	}	
</script>

<style>

@media only screen and (min-width: 860px){
.sidecol{
    position: fixed;
    width:30%;
    height: 100%;
    overflow: auto;
}

.content{
	position: absolute;
	width: 70%;
	right: 0;
}

@media only screen and (min-width: 1280px){
	.sidecol {
	    position: fixed;
	    width:24%;
	    height: 100%;
	    overflow: auto;
	}

	.content{
		position: absolute;
		width: calc(100% - 24%);
		right: 0;
	}
}

.sidecol {

}



}

	
</style>