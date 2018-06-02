
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
	function () {

		var data=remote_ip_info;
		var city=data.city;
		getWether(city);

	});

function getWether(city) {
	$(".now_city .now_city_name").html(city);
	$.ajax({
		url:"https://api.jisuapi.com/weather/query?appkey=2f7abc8504b511ab&city="+city,
		dataType:"jsonp",

		success:function (r) {
			console.log(r);
			let data=r.result.daily;
			let data1=r.result.hourly;
			let detail=r.result.index[3].detail;

			$(".now_temp span").html(r.result.temp);
			$(".now_weather span").html(r.result.weather);
			$(".now_now_wind_dire").html(r.result.winddirect);
			$(".now_wind_level").html(r.result.windpower);
			$(".now_air h2").html(r.result.quality);
			$(".now_noice span").html(detail);
			let str="";
			let str1="";
			let str2="";
			let str3="";
			$.each(data,function(index,val){
				//
				str+=`<li>
                    <h1 class="week_date">${val.date.toString().slice(5)}</h1>
                    <h2 class="week_weather">${val.day.weather}/${val.night.weather}</h2>
                    <div class="week_img"><img src="img/${val.day.img}.png"  alt="">
                        <img src="img/${val.night.img}.png" alt=""></div>
                    <h2 class="week_hightemp">${val.day.temphigh}°C</h2>
                    <h2 class="week_lowtemp">${val.night.templow}°C</h2>
                    <h2 class="week_wind">${val.night.winddirect}</h2>
                    <h2 class="week_leave">${val.day.windpower}</h2>
                    </li>`;



			});
			$("#week").html(str);
			$.each(data,function(index,val) {
				if (index === 0) {
					str2 += `
					<div class="futher_box">
						<div class="futher_top">
							<span class="futher_date">今天</span>
							<p><span class="today_hightemp">${val.day.temphigh}</span>/<span class="today_lowtemp">${val.night.templow}</span>°C</p>
						</div>
						<div class="futher_top">
							<span class="futher_weather">${val.day.weather}</span>
							<div class="today_img">
								<img src="img/${val.day.img}.png" alt="">
							</div>
						</div>
					</div>`;
				} 
				if(index===1){
					str2 += `
					<div class="futher_box">
						<div class="futher_top">
							<span class="futher_date">明天</span>
							<p><span class="today_hightemp">${val.day.temphigh}</span>/<span class="today_lowtemp">${val.night.templow}</span>°C</p>
						</div>
						<div class="futher_top">
							<span class="futher_weather">${val.day.weather}</span>
							<div class="today_img">
								<img src="img/${val.day.img}.png" alt="">
							</div>
						</div>
					</div>`;
				}

			});
			console.log(str2);
			$("#futher").html(str2);
			$.each(data1,function(index,val){
				str1+=`<li>
				<h1 class="hours_time">${val.time}</h1>
				<div class="hours_img">
					<img src="img/${val.img}.png" alt="">
				</div>

				<h2 class="hours_temp"><span>${val.temp}</span>°</h2>
			</li>`;
			})
			$("#hours").html(str1);
		}
	});

}
$(".add").click(function(){
	$("#citys").show();
	$(".search").get(0).focus();
})
let input=document.querySelector(".search");
$(".btn").click(function () {
	let val1=$(".search").val();
	console.log(val1);
	let data=[];//存放所有数据
	var province=[];// 存放所有省数据
	var city=[];// 存放某省所有市数据
	$.ajax({

		url:"http://api.jisuapi.com/weather/city?appkey=2f7abc8504b511ab",
		dataType:"jsonp",
		success:function (r) {
			console.log(r);
			data=r.result;
			province=$.grep(data, function (val,index) {
				if(val.parentid==="0"){
					return true;
				}
			});
			let str="";
			$.each(province,function (index,val) {
				// console.log(val);
				if(val.city===val1){
					str=`<div class="hotcitys_title" id="${val.cityid}">
                          ${val.city}
                          <div class="hotcitys_bottom"></div>
                          </div>`
					$(".hotcitys").html(str);
				}
				

			});


		}

	});
	$("#citys").on("click",".hotcitys_title",function () {
		console.log($(this));
		var id=$(this).attr("id");
		city = $.grep(data, function (val,index) {
			if(val.parentid===id){
				return true;
			}
		})
		let str="";
		$.each(city,function(index,val){
			str+=`<div class="hotcitys_item">${val.city}</div>`;
			$(".hotcitys_bottom").html(str);
		});
		console.log(str);

	});
	$("#citys").on("click",".hotcitys_item",function(){
		console.log($(this));
		$("#citys").hide();
		console.log($(this).html());
		getWether($(this).html());
	})
})
$(".hotcitys_item").click(function(){
	let val1=$(".hotcitys_item").html();
	$.ajax({

		url:"http://api.jisuapi.com/weather/city?appkey=2f7abc8504b511ab",
		dataType:"jsonp",
		success:function (r) {
			console.log(r);
			data=r.result;
			province=$.grep(data, function (val,index) {
				if(val.parentid==="0"){
					return true;
				}
			});
			let str="";
			$.each(province,function (index,val) {
				console.log(val1);
				if(val.city===val1){
					str=`<div class="hotcitys_title" id="${val.cityid}">
                          ${val.city}
                          <div class="hotcitys_bottom"></div>
                          </div>`
					$(".hotcitys").html(str);
				}
				

			});


		}

	});
	$("#citys").on("click",".hotcitys_item",function(){
		console.log($(this));
		$("#citys").hide();
		console.log($(this).html());
		getWether($(this).html());
	})
})