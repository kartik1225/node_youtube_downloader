<template>
	<div>
	<v-app class='green accent-2'>

	<div>
		<v-container>
		<v-card class='elevation-6 deep-orange lighten-4'>
			<v-container>


				<v-layout justify-center>
					<v-icon class='display-3 red--text' style='margin-bottom:20px;'>warning</v-icon>
				</v-layout>

				<h1 class="display-3 text-xs-center red--text">404</h1>


				<h1 class='display-3 text-xs-center'>this page is <strong>does not exist</strong> yet! </h1>
			</v-container>

					<v-btn large block class='white' @click='$router.push("/")'>
						go to home page
					</v-btn>
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
			'$route.params.id':function(i){

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