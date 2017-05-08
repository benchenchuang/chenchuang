/**
 * Created by Administrator on 2017/5/2.
 */
Vue.component('my-home', {
    template:'<div class="home">'
        +'<div class="mine_info mine_box">'
        +'<div class="fl mine_pic">'
        +'<img src="images/mine.png">'
        +'</div>'
        +'<div class="mine_text">'
        +'<h3 class="main_txt">陈闯<small class="aff_txt ml_10">男</small></h3>'
        +'<p class="mine-addr aff_txt"><i class="iconfont icon-dingwei"></i>常州.新北<span class="ml_10" id="distance"></span></p>'
        +'<p class="mine-weather aff_txt">没有什么比投入更让人期待...</p>'
        +'</div>'
        +'</div>'
        +'<div class="info_list mine_box">'
        +'<a v-for="info in infos " class="info_item" :href="info.href" :v-link="info.link"><i class="iconfont" :class="info.icon"></i>{{info.name}}<div class="item_aff"><span>{{info.text}}</span><i v-if="info.more" class="iconfont icon-right"></i></div> </a>'
//        +'<a class="info_item" href="javascript:void (0);" v-link="{ path: '+"'/skill'"+'}"><i class="iconfont icon-work"></i>应聘岗位<div class="item_aff"><span>前端开发相关工作</span><i class="iconfont icon-right"></i></div> </a>'
//        +'<a class="info_item" v-link="{ path: '+"'/suffer'"+'}"><i class="iconfont icon-shijian"></i>工作经验<div class="item_aff"><span>5年</span><i class="iconfont icon-right"></i></div> </a>'
//        +'<a class="info_item" href="javascript:void (0);"><i class="iconfont icon-dingwei"></i>工作地点<div class="item_aff"><span>常州</span></div> </a>'
//        +'<a class="info_item" href="javascript:void (0);"><i class="iconfont icon-shengri"></i>出生日期<div class="item_aff"><span>1988-03-10</span></div> </a>'
//        +'<a class="info_item" href="tel:13685233639"><i class="iconfont icon-shouji"></i>联系电话<div class="item_aff"><span>136-8523-3639</span></div> </a>'
        +'</div>'
        +'</div>',
    data: function () {
        return {
            infos:[]
        }
    },
    created: function () {
        this.$http({url: 'json/me.json', method: 'GET'}).then(function (response) {
            //求助的部分
            this.infos=response.data;
        });
        var lng, lat;
        setWeather();
        setInterval(setWeather,600000);
    }
});
Vue.component('my-skill', {
    template:'<div class="skill_box">'
        +'<div class="skill_card_cont">'
        +'<div class="skill_card skill_item" v-for="skill in skills">'
        +'<div class="skill_ad" :class="skill.style">'
        +'<span>{{skill.name1}}</span>'
        +'</div>'
        +'<div class="skill_desc">'
        +'<h2 class="skill_name">{{skill.name2}}</h2>'
        +'<p class="skill_txt">{{skill.txt}}</p>'
        +'<div class="skill_age">'
        +'<h3>{{skill.power}}</h3>'
        +'<p>{{skill.power_txt}}</p>'
        +'</div>'
        +'<p class="tip">左右滑动查看更多</p>'
        +'</div>'
        +'</div>'
        +'<div class="skill_item">'
        +'<img class="skill_bg" src="images/skill_bg.png">'
        +'</div>'
        +'</div>'
        +'</div>',
    data: function () {
        return {
            skills:[]
        }
    },
    created: function () {
        this.$http({url: 'json/skills.json', method: 'GET'}).then(function (response) {
            //求助的部分
            this.skills=response.data;
        });
        var disableScroll = function(){
            $(document.body).on('mousewheel', preventDefault).on('touchmove', preventDefault);
        };
        // 外部禁用
        disableScroll();
    }
});
Vue.component('my-works', {
    template:'<div class="works">'
        +'<div class="works_menu">'
        +'<div class="menu_box box_flex">'
        +'<a v-for="nav in navs" :class="[{flex:true},{active:nav.active}]" @click="getWork(nav.get),makeActive(item, $index)">{{nav.name}}</a>'
        +'</div>'
        +'</div>'
        +'<div class="works_box">'
        +'<a class="work_item" :href="work.link" v-for="work in works">'
        +'<img :src="work.pic">'
        +'<p>{{work.name}}</p>'
        +'</a>'
        +'</div>'
        +'</div>',
    data:function(){
        return{
            works:[],
            navs:[
                {name:'2018~2017',get:"first.json",active:true},
                {name:'2016~2015',get:"second.json",active:false},
                {name:'2015~2012',get:"third.json",active:false}
            ]
        }
    },
    methods:{
        getWork:function(url){
            this.$http({url: 'json/'+url, method: 'GET'}).then(function (response) {
                //求助的部分
                this.works=response.data;
            });
        },
        makeActive: function(item, index){
            for(var i=0; i<this.navs.length;i++){
                this.navs[i].active = false;
            }
            this.navs[index].active = true;
        }
    },
    created: function () {
        this.$http({url: 'json/first.json', method: 'GET'}).then(function (response) {
            //求助的部分
            this.works=response.data;
        });
    }
});

Vue.component('my-suffer', {
    template:'<div class="suffer">'
            +'<div class="view">'
                +'<div class="card__full">'
                   +' <div class="card__full-top" :class="shows.style">'
                        +'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" @click="hide()">'
                            +'<path d="M16.59 8.59l-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"/>'
                            +'<path d="M0 0h24v24h-24z" fill="none"/>'
                        +'</svg>'
                        +'<span class="card__full_logo">{{shows.company}}</span>'
                    +'</div>'
                    +'<div class="card__full-bottom">'
                        +'<p class="card__full-time">{{shows.time}}</p>'
                        +'<p class="card__full-handle">{{shows.job}}</p>'
                        +'<p class="card__full-info">{{shows.info}}</p>'
                        +'<p class="card__full-item">{{shows.item}}</p>'
                    +'</div>'
                +'</div>'
                +'<ul class="card__list">'
                    +'<li class="card__item" :class="suffer.style" v-for="(key,suffer) in suffers" @click="show(this)">'
                    +'<div class="card__info">'
                        +'<div class="info-player">'
                            +'<p class="info-player_logo"><img class="logo_p" :src="suffer.logo"></p>'
                                +'<p class="info-player__name">'
                                    +'<small>{{suffer.company}}</small>'
                                    +'<span>工作时间：{{suffer.time}}<em class="now_date">{{newTime}}</em></span>'
                                    +'<span>工作岗位：{{suffer.job}}</span>'
                                +'</p>'
                            +'</div>'
                            +'<div class="info-place"><i class="iconfont icon-right"></i> </div>'
                        +'</div>'
                    +'</li>'
                +'</ul></div></div>',
    data:function(){
        return{
            suffers:[],
            shows:[],
            newTime:'至今'
        }
    },
    methods:{
        show:function($this){
            var card__full=$('.card__full');
            card__full.addClass('active');
            console.log($this.$index);
            var self = $('.card__item').eq($this.$index);
            var selfO = self.offset();
            var ty = $(window).innerHeight()/2 - selfO.top -4;

            self.css({
                'transform': 'translateY(' + ty + 'px)'
            });
            $this.shows=$this.suffer;
        },
        hide:function(){
            var card__full=$('.card__full');
            card__full.removeClass('active');
            $('.card__item').removeAttr('style');
        }
    },
    created: function () {
        this.$http({url: 'json/suffer.json', method: 'GET'}).then(function (response) {
            this.suffers=response.data;
        });
        var Month=(new Date().getMonth())+1;
        this.newTime=(new Date().getFullYear())+'.'+(Month=Month<10?'0'+Month:Month);
    }
});

var Home = Vue.extend({
    template: '#home'
});
var Skill = Vue.extend({
    template: '#skill'
});

var Works = Vue.extend({
    template: '#works'
});
var Suffer = Vue.extend({
    template: '#suffer'
});
/* 创建路由器  */
var router = new VueRouter();
/* 创建路由映射  */
router.map({
    '/home': {
        component: Home
    },
    '/skill': {
        component: Skill
    },
    '/work': {
        component: Works
    },
    '/suffer': {
        component: Suffer
    }
});
router.redirect({
    '/': '/home'
});
/* 启动路由  */
var App = Vue.extend({});
router.start(App, '#app')