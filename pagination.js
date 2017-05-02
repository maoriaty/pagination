//分页插件
/**
*by Jabin 2017.5.1
*/
;(function($){
	var ms = function(ele,opt){
		this.element = ele;
		this.defaults = {
			'pageCount' : 7,
			'current' : 1,
			'dot' : 6,//当大于多少页时开始用省略号代替数字
			 backFn : function(){},
			 // setcss
			 'color' : '#333',
			 'textDecoration' : 'none',
			 'currentColor' : "red",
			 'cursor' : 'default'
		};
		this.options = $.extend({},this.defaults,opt);
	}
	ms.prototype = {
		init : function(){
			this.fillHtml();
			this.bindEvent();
			return this;
		},
		fillHtml : function(){
			var current = this.options.current,
			pageCount = this.options.pageCount;
			this.element.empty();
			//上一页
			if(current > 1){
				this.element.append('<a href="javascript:;" class="prevPage">&nbsp;<&nbsp;</a>')
			}else{
				this.element.remove('.prevPage');
				this.element.append('<span>&nbsp;<&nbsp;</span>')
			}
			// 中间页
			if(pageCount > this.options.dot){
				if(current-1>1){
					this.element.append('<a href="##" class="tcdNumber">'+1+'</a>');
				}
				if(current-1>2){
					this.element.append('<span>...</span>');
				}
				var start = current-1,end = current+1;
				if(current<=1){
					start = 1;
				}
				if(current >= pageCount){
					end = pageCount;
				}
				for(start;start <= end;start++){
					if(current != start){
						this.element.append('<a href="##" class="tcdNumber">'+start+'</a>');
					}else{
						this.element.append('<span class="current">'+start+'</span>')
					}
				}
				if(end < pageCount-1){
					this.element.append('<span>...</span>');
				}
				if(current+1 < pageCount){
					this.element.append('<a href="##" class="tcdNumber">'+pageCount+'</a>')
				}
			}else{
				for(var start=1;start <= pageCount;start++){
					if(current != start){
						this.element.append('<a href="##" class="tcdNumber">'+start+'</a>');
					}else{
						this.element.append('<span class="current">'+start+'</span>')
					}
				}
			}
			
			// 下一页
			if(current < pageCount){
				this.element.append('<a href="javascript:;" class="nextPage">&nbsp;>&nbsp;</a>')
			}else{
				this.element.remove('.nextPage');
				this.element.append('<span>&nbsp;>&nbsp;</span>');
			}
			this.setCss();
			return this;
		},
		bindEvent : function(e){
			var that = this;
			this.element.off('click');
			this.element.on('click','a.tcdNumber',function(){
				var current = parseInt($(this).text());
				that.options.current = current;
				that.fillHtml();
				if(typeof(that.options.backFn) == 'function'){
					that.options.backFn(current);
				}
			})
			// 上一页
			this.element.on('click','a.prevPage',function(){
				var current = parseInt(that.element.children('span.current').text());
				that.options.current = current-1;
				that.fillHtml();
				if(typeof(that.options.backFn) == 'function'){
					that.options.backFn(current-1);
				}
			})
			// 下一页
			this.element.on('click','a.nextPage',function(e){
				var current = parseInt(that.element.children('span.current').text());
				// console.log(current);
				that.options.current = current+1;
				that.fillHtml();
				if(typeof(that.options.backFn) == 'function'){
					that.options.backFn(current+1);
				}
				e.preventDefault();
			})
			return this;
		},
		setCss :function(){
			this.element.children('a').css({
				'color' : this.options.color,
				'textDecoration' : this.options.textDecoration
			});
			this.element.children('span').css({
				'cursor':this.options.cursor
			});
			this.element.children('span.current').css({
				'color':this.options.currentColor
			});
		}
	}
	$.fn.createPage = function(options){
		var test = new ms(this,options);
		return test.init();
	}
})(jQuery)