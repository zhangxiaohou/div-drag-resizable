var selectedUserId = null;
var PRODUCTS_ACCOUNT_TYPE_INFO = 1;
var PRODUCTS_BONUS_TYPE_INFO = 2;
var MAVRO_NOACTIVE_TYPE = 'noactive';
var MAVRO_NOACTIVE_TYPE_ACTIVE = 'noactive_active';
var MAVRO_ACTIVE_TYPE = 'active';
var MAVRO_SELLED_TYPE = 'selled';
var MAVRO_LEADER_BONUS_TYPE = 'leader_bonus';
var ACCRULE_TO_CONVERT = 13;
var showAccountColumns;
var showBonusColumns;
var showInactiveAccounts = false;
var defrostedCell = [];
var Dicts = {};
DFCell = function(index, sec) {
	this.init(index, sec);
};
DFCell.prototype = {
	index : 0,
	sec : 0,
	min : 0,
	hours : 0,
	init : function(index, sec) {
		this.index = index;
		this.sec = sec;
		this.min = Math.floor(this.sec / 60);
		this.hours = Math.floor(this.sec / 3600);
		var _this = this;
		setTimeout(function() {
			_this.show.call(_this);
		}, 100);
	},
	startCounter : function() {
		this.sec = this.sec - 1;
		this.min = Math.floor(this.sec / 60);
		this.hours = Math.floor(this.sec / 3600);
		var _this = this;
		if (this.sec > -1) {
			setTimeout(function() {
				_this.show.call(_this);
			}, 1000);
		}
	},
	show : function() {
		var label = getTranslation('cool_defrosted');
		if (this.hours > 0) {
			label = this.hours + ' ' + getTranslation('hourses');
		} else if (this.min > 0) {
			label = this.min + ' ' + getTranslation('minutes');
		} else if (this.sec > 0) {
			label = this.sec + ' ' + getTranslation('seconds');
		}
		$('tr[datagrid-row-index="' + this.index + '"] td[field="fr"] div',
				$('#products').parent()).html(label);
		this.startCounter();
	}
};
function createDG() {
  createUploader(document.getElementById('add_post_img'));
	$.ajax({
		 url : 'getLogistics',
		 success : function(data) {
			 $.each(data,function(index,value) {
						$("#logistics_company").append("<option value='"+value.name+"'>"+value.name+"</option>");
			 })
		 }
	 });
  $(".tab-checked").click(function(){
		$("#"+$(this).attr("name")).toggle();

	});
}
function reset_model(){
	if($(".qq-upload-list").find("li").length>0){
		$("#post_model_div div").remove();
		var src=$("#add_post_img .qq-upload-success").find("img").attr("src");
		var width=780;
		var height=width*($("#height").val()/$("#width").val());
		$("#post_backimg").attr("src",src).animate({"height":height,"width":width});
	/*	$("#post_model_div").animate({"height":height});*/
		var checkeds=$("#checked_tab").find("input[checked=checked]");
		$.each(checkeds,function(index,value){
			var newTab=$("<div></div>").attr("id",value.name).addClass("moveable-tab").css({'top':index*35+$("#post_model_div").offset().top+3+"px"});
			newTab.append("<span style='padding:0px'>"+$(value).parent().text()+"</span>").prependTo("#post_model_div");
     newTab.draggable({});
		  newTab.resizable({
		 	 minWidth:70,
		 	 minHeight:30,
		 	 maxWidth:300,
		 	 maxHeight:200
		  });
		});
	}else{
		touming("请选择背景图片");
	}

}
$(function() {
	createDG();
	$("#post_model_div div").remove();
});
