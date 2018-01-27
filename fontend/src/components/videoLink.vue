<template>
	<div>
	<v-app class='green accent-2'>


	<!-- loading section -->
	<div v-show='loading'>
		<br>
		<v-layout justify-center>
			<v-progress-circular v-show='loading'  indeterminate v-bind:size="100" v-bind:width="7" ></v-progress-circular>
		</v-layout>
	</div>


	<!-- main content -->
	<v-slide-x-transition>
	<div v-show='!loading'>
		<div class="sidecol grey lighten-3 elevation-5" v-resize='onResize'>	

				<img style='margin-top:-10%' :src='thumb' width="100%" />
				<v-card style='margin-top:-11%'>
				<v-container >
				<h5>{{vData.title}}</h5>
				</v-container>

				<v-btn flat error  @click='gotoyt'>
					go to youtube
				</v-btn>
				</v-card>



		</div>

		<div class="content ">
			<v-layout justify-center>
				<v-flex xs12 sm10 md8 lg6>
					<br>
					<v-container>
					<v-text-field
							  class='elevation-1 grey lighten-2'	
			                  label="youtube link/video title"
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


			        </v-container>

			        <br>
		        </v-flex>
	        </v-layout>
        <v-layout justify-center >

        </v-layout>
		<v-layout wrap justify-space-around v-show='content'>
			<v-flex xs12 sm6 md5>
				<v-container grid-list-lg>

				<v-card class='blue-grey lighten-4'>
					<v-container grid-list-md>

							<v-layout justify-center>
							<v-icon style='font-size: 15px;'>video_label</v-icon> 
							<span style="margin-bottom: auto;margin-top: auto; margin-left:4px;"><strong>video</strong></span>
							</v-layout>

					</v-container>
				</v-card>

				<v-card class='blue-grey'>
				<v-container>
						<h3 class="text-xs-center white--text">Videos in <br> <span class="display-4">mp4</span></h3>
				</v-container>
				<v-divider></v-divider>
				<v-card-actions>
				<v-layout wrap justify-space-around>

				<!-- mp4 loop -->
				<template v-for='link in links.mp4'>
					<v-btn light flat class='white--text' @click='download(link)'>{{link.resolution}}</v-btn>
				</template>
				</v-layout>
				</v-card-actions>
				</v-card>
				</v-container>
			</v-flex>

			<v-flex xs12 sm6 md5>
				<v-container grid-list-lg>
				<v-card class='blue-grey lighten-4'>
					<v-container grid-list-md>

							<v-layout justify-center>
							<v-icon style='font-size: 15px;'>music_note</v-icon>
							<span style="margin-bottom: auto;margin-top: auto;"><strong>audio only</strong> <i> download music video as song</i></span>
							</v-layout>

					</v-container>
				</v-card>

				<v-card class='blue-grey'>
				<v-container>
						<h3 class="text-xs-center white--text">audio in <br> <span class="display-4">m4a</span></h3>
				</v-container>
				<v-divider ></v-divider>
				<v-card-actions>
				<v-layout wrap justify-space-around>

					<v-btn light flat class='white--text' @click='getaudio'>audio</v-btn>

				</v-layout>
				</v-card-actions>
				</v-card>
				</v-container>
			</v-flex>



			<v-flex xs12 sm6 md5>
				<v-container grid-list-lg>

				<v-card class='blue-grey lighten-4'>
					<v-container grid-list-md>

							<v-layout justify-center>
							<v-icon style='font-size: 15px;'>slow_motion_video</v-icon>
							<span style="margin-bottom: auto;margin-top: auto; margin-left:4px;"> <strong>low quality</strong> video</span>
							</v-layout>

					</v-container>
				</v-card>

				<v-card class='blue-grey'>
				<v-container>
						<h3 class="text-xs-center white--text">Videos in <br> <span class="display-4">3gp</span></h3>
				</v-container>
				<v-divider></v-divider>
				<v-card-actions>
				<v-layout wrap justify-space-around>
				<template v-for='link in links.threeGp'>
					<v-btn light flat class='white--text' @click='download(link)'>{{link.resolution}}</v-btn>
				</template>
				</v-layout>
				</v-card-actions>
				</v-card>
				</v-container>
			</v-flex>

			<v-flex xs12 sm6 md5>
				<v-container grid-list-lg>
				<v-card class='blue-grey lighten-4'>
					<v-container grid-list-md>

							<v-layout justify-center>
							<v-icon style='font-size: 15px;'>volume_off</v-icon>
							<span style="margin-bottom: auto;margin-top: auto;"><strong>video</strong> only</span>
							</v-layout>

					</v-container>
				</v-card>

				<v-card class='blue-grey'>
				<v-container>
						<h3 class="text-xs-center white--text">Only videos in <br> <span class="display-4">mp4</span></h3>
				</v-container>
				<v-divider></v-divider>
				<v-card-actions>
				<v-layout wrap justify-space-around>
				<template v-for='link in links.onlyVideo'>
					<a download="true" style="text-decoration:none" :href='link.url'><v-btn light flat class='white--text'>{{link.resolution}}</v-btn></a>
				</template>
				</v-layout>
				</v-card-actions>
				</v-card>
				</v-container>
			</v-flex>
		</v-container>
		</v-layout>
		</div>
		</div>
		</v-slide-x-transition>

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
				content:false,
				error:false,
				thumb:''
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
			this.fetchData(this.$route.params.id);
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
			},
			fetchData(i){
				this.qshow = false;
				this.content = false;
				this.loading = true;	
				axios.get(`${this.$store.state.server}get/info/${i}`).then(r=>{

					this.vData = r.data;
					this.content = true;

					this.thumb = this.vData.thumbnail_url.replace("default","hqdefault")

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

				this.loading = false;


				}else{
					this.$router.push('/error/'+this.$route.params.id);
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
			},
			getaudio(){
				window.location = `${this.$store.state.server}get/audio/${this.$route.params.id}`
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
    overflow: auto
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