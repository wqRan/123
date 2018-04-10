/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const userView = __webpack_require__(3);

const leftnewView = __webpack_require__(4)

const wsCache = new WebStorageCache();

// 用户权限认证
const auth = () => {
  return $.ajax({
    url:'/api/users/issignin',
    headers:{
      'X-Access-Token':wsCache.get('token')
    },
    success: (result)=> {
       
      return result
    }
  })
}


// 渲染用户信息
const render = async() => {

    const ret = JSON.parse(await auth())
    // 应用art-template模板渲染
    let tpl = template.render(userView, {
      issignin: ret.data.issignin,
      username: ret.data.username
    })

    let index = template.render(leftnewView, {
      issignin: ret.data.issignin,
      username: ret.data.username
    })

    $('.user-panel').html(index)

    $('.user-menu').html(tpl)


    $('#user-submit').text('注销')

    setBtnInfo()

    signup()
  

}

// 设置提交按钮的类型信息
const setBtnInfo = () => {
  $('#user-status').on('click', (e) => {
    $('#username').val('')
    $('#password').val('')
    switch (e.target.innerText) {
      case '注册':
          $('#user-submit').text('注册')
        break;
      case '登录':
          $('#user-submit').text('登录')
        break;
    }
  })
}

// 根据按钮的信息做（登录，注册）处理
const signup = () => {
  $('#user-submit').on('click', () => {
    switch ($('#user-submit').text()) {
      case '登录':
        doSignin()
        break;
      case '注册':
        doSignup()
        break;
      case '注销':
        doSignout()
        break;
    }
  })
}

// 注册
const doSignup = () => {
  const username = $('#username').val()
  const password = $('#password').val()

  $.ajax({
    url: '/api/users/signup',
    method: 'POST',
    data: {
      username,
      password
    },
    success: (res) => {
      // TODO
    }
  })
}

// 登录
const doSignin = () => {
  const username = $('#username').val()
  const password = $('#password').val()

  $.ajax({
    url: '/api/users/signin',
    method: 'POST',
    data: {
      username,
      password
    },
    success: (res) => {
      const d = JSON.parse(res).data
      if (d.success) {

        // 将username, token 保存在localstorage里
        wsCache.set('username', d.username, {exp : 3600 * 24})
        wsCache.set('token', d.token, {exp : 3600 * 24})

        // 刷新页面，重新认证
        location.reload()
        console.log($('.status'))
        // $('.status').html('在线')
        // $('.fa-circle').addClass('text-success')
        // $('.img-circle').attr('src','static/images/user2-160x160.jpg')
        // $('.user-image').attr('src','static/images/user2-160x160.jpg')

        
      } else {
        console.log('登录失败。');
      }
    }
  })
}

const doSignout = () => {
  wsCache.delete('username')
  wsCache.delete('token')
  location.reload()
}

module.exports = {
  render,
  auth
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "<h1>  <span>{{title}}</span>  <small>{{subtitle}}</small></h1><ol class=\"breadcrumb\">  <li><a href=\"{{url}}\"><i class=\"fa fa-dashboard\"></i> <span>{{navLevel1}}</span></a></li>  <li class=\"active\">{{navLevel2}}</li></ol>"

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const UserController = __webpack_require__(0)
const PositionController = __webpack_require__(5)
const LayoutController = __webpack_require__(10)
const Router = __webpack_require__(12)

UserController.render()
LayoutController.render()

const router = new Router()
router.route('/', LayoutController.render)
router.route('/newslist', PositionController.render)
router.route('/add', PositionController.add)
router.route('/edit', PositionController.edit)
router.init()

// activeClass： 使leftmenu 在刷新页面的时候自动高亮
$('#leftMenu li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active')
})
const hash = location.hash
$('#leftMenu li')
  .find("a[href='" + hash + "']")
  .parent()
  .addClass('active').siblings().removeClass('active')




/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- Menu Toggle Button --><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">  <!-- The user image in the navbar-->  {{if issignin}}  <img src=\"static/images/user2-160x160.jpg\" class=\"user-image\" alt=\"User Image\">  <span class=\"hidden-xs\" id=\"user-status\">      {{username}}    {{/if}}    {{if !issignin}}  <img src=\"http://placehold.it/50x50\" class=\"user-image\" alt=\"User Image\">  <span class=\"hidden-xs\" id=\"user-status\">      <span>注册</span> <span>登录</span>    {{/if}}  </span></a><ul class=\"dropdown-menu\">  <!-- The user image in the menu -->  {{if issignin}}  <li class=\"user-header\">    <img src=\"static/images/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\">    <p>      Alexander Pierce - Web Developer      <small>Member since Nov. 2012</small>    </p>  </li>  {{/if}}  {{if !issignin}}  <li class=\"user-header\" id=\"user-unsignup\">    <div class=\"box-body\">      <div class=\"form-group\">        <label for=\"exampleInputEmail1\">用户名</label>        <input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" placeholder=\"请输入用户名\">      </div>      <div class=\"form-group\">        <label for=\"exampleInputPassword1\">密码</label>        <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" placeholder=\"请输入密码\">      </div>    </div>  </li>  {{/if}}  <!-- Menu Footer-->  <li class=\"user-footer\">    <div class=\"pull-left\">      <a href=\"#\" class=\"btn btn-default btn-flat\">关闭</a>    </div>    <div class=\"pull-right\">      <a href=\"#\" class=\"btn btn-primary btn-flat\" id=\"user-submit\"></a>    </div>  </li></ul>"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"pull-left image\">  {{if issignin}}  <img src=\"static/images/user2-160x160.jpg\" class=\"img-circle\" alt=\"User Image\">  }</div><div class=\"pull-left info\">  <p>{{username}}</p>  <!-- Status -->  <a href=\"#\" class=\"status\"><i class=\"fa fa-circle text-success \"></i> 在线</a>  {{/if}}  {{if !issignin}}  <img src=\"http://placehold.it/50x50\" class=\"img-circle\" alt=\"User Image\">  }</div><div class=\"pull-left info\">  <p>用户名</p>  <a href=\"#\" class=\"status\"><i class=\"fa fa-circle\"></i> 离线</a>  {{/if}}</div>"

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const listView = __webpack_require__(6)
const paginationView = __webpack_require__(7)
const addView = __webpack_require__(8)
const editView = __webpack_require__(9)
const navView = __webpack_require__(1)

const userController = __webpack_require__(0)


const render = (pageno) => {
  let newNavHtml = template.render(navView, {
    title: '信息管理',
    subtitle: '信息列表',
    navLevel1: '信息管理',
    navLevel2: '列表',
    url: '#/newslist'
  })
  $('#nav').html(newNavHtml)

  renderPositionList(pageno)
}

async function renderPositionList(pageno) {
  const issignin = JSON.parse(await userController.auth())
  if (!issignin.data.issignin) {
    location.hash = '/'
    alert("请登录哦！")
    return
  }

  pageno = parseInt( pageno || 0 , 10)
  $.ajax({
    url: '/api/newslist/list/' + pageno,
    success: (result) => {
      if (result.ret) {
        const {pagesize, total} = result.data
        const pagecount = Math.ceil( total / pagesize )
        if (pageno < pagecount && pageno >= 0) {
          const html = template.render(listView, {
            data: result.data.result,
            pageno,
            hasResult: true
          })
          $('.content').html(html)

          renderPositionPagination({
            pageno,
            pagecount,
            pagesize,
          })

          $('.btn-danger').on('click', async function() {
            if (confirm('真的要删除吗')) {
              let id = $(this).attr('id')
              let result = await removePosition(id)
              if (result) {
                renderPositionList(pageno)
              } else {
                alert('数据删除失败~')
              }
            }
          })

          search()
        } else {
          location.hash = '/newslist/' + ( pageno - 1 )
        }
      }
    }
  })
}

function renderPositionPagination({pageno, pagecount, pagesize}) {
  $("#pagination").html(template.render(paginationView, {
    pageno,
    pagecount,
    pagesize
  }))
}

function removePosition(id) {
  return $.ajax({
    url: `/api/newslist/remove/${id}`
  })
    .then((result) => {
      return result.data
    })
}

function search() {
  $('#searchSubmit').on('click', function () {
    doSearch()
  })
  $('body').on('keyup', function (e) {
    if (e.keyCode == 13) {
      doSearch()
    }
  })
}

function doSearch() {
  let keywords = $('#search').val()
  $.ajax({
    url: '/api/newslist/search',
    type: 'POST',
    data: {
      keywords
    },
    success: (result) => {
      let data = result.data
      let hasResult = data.length > 0 ? true : false
      let html = template.render(listView, {
        data: result.data,
        hasResult
      })
      $('.content').html(html)
    }
  })
}

const add = async () => {


  $('.content').html(addView)
  let newNavHtml = template.render(navView, {
    title: '信息管理',
    subtitle: '信息添加',
    navLevel1: '信息管理',
    navLevel2: '添加',
    url: '#/newslist'
  })
  $('#nav').html(newNavHtml)

  $('#addSubmit').off('click').on("click", function() {
    let options = {
      "success" : handleSuccess,
      "resetForm" : true,
      "dataType" : "json"
    };
    $("#addForm").ajaxSubmit(options);
    
    function handleSuccess(data, status) {
      if (data.ret) {
        alert(data.data.message)
      }
    }
  });
}

const edit = (id) => {
  const params = id.split('|')
  console.log(params)
  let newNavHtml = template.render(navView, {
    title: '信息管理',
    subtitle: '信息编辑',
    navLevel1: '信息管理',
    navLevel2: '编辑',
    url: '#/newslist'
  })
  $('#nav').html(newNavHtml)

  $.ajax({
    url: `/api/newslist/item/${params[0]}`,
    success: (result) => {
      if (result.ret) {
        const html = template.render(editView, result.data)
        $('.content').html(html)

        bindEditSubmit(params[1])
      }
    }
  })
}

function bindEditSubmit(pageno) {
  $('#editSubmit').off('click').on("click", function(e) {
    let options = {
      "success" : handleSuccess,
      "resetForm" : true,
      "dataType" : "json"
    };
    $("#editForm").ajaxSubmit(options);

    function handleSuccess(data, status) {
      if (data.ret) {
        // 不刷新页面，读取缓存里的内容
        // history.back()

        // 刷新页面
        location.hash = '/newslist/' + pageno
      }
    }
  });
}

module.exports = {
  render,
  add,
  edit
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div class=\"box\">  <div class=\"box-header with-border\">    <h3 class=\"box-title\">      <a href=\"#/add\"><button class=\'btn btn-primary\'>添加 <span class=\"fa fa-plus\"></span></button></a>    </h3>    <div class=\"box-tools\">      <div class=\"input-group input-group-sm\" style=\"width: 150px;\">        <input type=\"text\" name=\"table_search\" id=\"search\" class=\"form-control pull-right\" placeholder=\"输入演出名称\">        <div class=\"input-group-btn\">          <button type=\"submit\" id=\"searchSubmit\" class=\"btn btn-default\"><i class=\"fa fa-search\"></i></button>        </div>      </div>    </div>  </div>  <!-- /.box-header -->  <div class=\"box-body\">    <table class=\"table table-bordered\">      <tr style=\"font-size: 13px;\">        <th style=\"width: 10px;text-align: center;\">#</th>        <th style=\"width: 78px;text-align: center;\">演出海报</th>        <th style=\"width: 24%;text-align: center;\">演出名称</th>        <th style=\"width: 12%;text-align: center;\">演出场地</th>        <th style=\"width: 11%;text-align: center;\">演出时间</th>        <th style=\"width: 88px;text-align: center;\">售价</th>        <th style=\"width: 68px;text-align: center;\">售票状态</th>        <th style=\"text-align: center;\">操作</th>      </tr>      {{if hasResult}}        {{each data}}        <tr style=\"font-family:微软雅黑;font-size: 12px;text-align: center;\">          <td>{{$index+1}}.</td>          <td><img src=\"http://localhost:3000/uploads/{{$value.showPic}}\" style=\"width: 50px; height: 50px; margin-top: 15px;\" alt=\"\"></td>          <td style=\"font-size: 13px;padding-top: 25px;\">{{$value.showName}}</td>          <td style=\"font-size: 11px;line-height: 76px;\">{{$value.showLocal}}</td>          <td style=\"font-size: 11px;line-height: 76px;\">{{$value.showTime}}</td>          <td style=\"line-height: 76px; font-weight: bold;color: red\">￥{{$value.showPrice}}</td>          <td style=\"line-height: 76px;\">{{$value.showStates}}</td>          <td style=\"line-height: 76px;\">            <a href=\"#/edit/{{$value._id}}|{{pageno}}\"><button class=\"btn btn-info\" style=\"width: 50px; font-size: 12px; padding: 6px ;background: green;\">编辑 <span class=\"fa fa-edit\"></span></button></a>            <button class=\"btn btn-danger\" id=\"{{$value._id}}\" style=\"width: 50px; font-size: 12px; padding: 6px ;\" >删除 <span class=\"fa fa-remove\"></span></button>          </td>        </tr>        {{/each}}      {{else}}        <tr><td colspan=\"8\">没有找到符合条件的文档。</td></tr>      {{/if}}    </table>  </div>  <!-- /.box-body -->  <div class=\"box-footer clearfix\" id=\"pagination\">  </div></div><!-- /.box -->"

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"pagination pagination-sm no-margin pull-right\">  <li><a href=\"#/newslist/0\">&laquo;</a></li>  <% for (var i = 0; i < pagecount; i++) { %>    {{if i == pageno}}      <li class=\"active\"><a href=\"#/newslist/{{i}}\">{{i+1}}</a></li>    {{else}}      <li><a href=\"#/newslist/{{i}}\">{{i+1}}</a></li>    {{/if}}  <% } %>  <li><a href=\"#/newslist/{{pagecount-1}}\">&raquo;</a></li></ul>"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<!-- Horizontal Form --><div class=\"box box-info\">  <div class=\"box-header with-border\">    <h3 class=\"box-title\">添加票务信息</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\"form-horizontal\" method=\"post\" id=\"addForm\" action=\"/api/newslist/add\" enctype=\"multipart/form-data\">    <div class=\"box-body\">      <div class=\"form-group\">        <label for=\"showName\" class=\"col-sm-1 control-label\">演出名称</label>        <div class=\"col-sm-11\">          <input type=\"text\" class=\"form-control\" id=\"showName\" name=\"showName\" placeholder=\"请输入演出名称\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showPic\" class=\"col-sm-1 control-label\">演出海报</label>        <div class=\"col-sm-11\">          <input type=\"file\" id=\"showPic\" name=\"showPic\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showLocal\" class=\"col-sm-1 control-label\">演出场地</label>        <div class=\"col-sm-11\">          <input type=\"text\" class=\"form-control\" id=\"showLocal\" name=\"showLocal\" placeholder=\"请输入演出场地\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showTime\" class=\"col-sm-1 control-label\">演出时间</label>        <div class=\"col-sm-11\">          <input type=\"text\" class=\"form-control\" id=\"showTime\" name=\"showTime\" placeholder=\"请输入演出时间\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showPrice\" class=\"col-sm-1 control-label\">售价</label>        <div class=\"col-sm-11\">          <input type=\"text\" class=\"form-control\" id=\"showPrice\" name=\"showPrice\" placeholder=\"请输入售价\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showStates\" class=\"col-sm-1 control-label\">售票状态</label>        <div class=\"col-sm-11\">          <input type=\"text\" class=\"form-control\" id=\"showStates\" name=\"showStates\" placeholder=\"请输入售票状态\">        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\"box-footer\">      <a href=\"#/newslist\"><button type=\"button\" class=\"btn btn-default\">返回</button></a>      <button type=\"button\" id=\"addSubmit\" class=\"btn btn-info pull-right\">提交</button>    </div>    <!-- /.box-footer -->  </form></div><!-- /.box -->"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<!-- Horizontal Form --><div class=\"box box-info\">  <div class=\"box-header with-border\">    <h3 class=\"box-title\">编辑票务信息</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\"form-horizontal\" method=\"post\" id=\"editForm\" action=\"/api/newslist/edit/{{_id}}\" enctype=\"multipart/form-data\">    <div class=\"box-body\">      <div class=\"form-group\">        <label for=\"showName\" class=\"col-sm-1 control-label\">演出名称</label>        <div class=\"col-sm-11\">          <input type=\"text\" value=\"{{showName}}\" class=\"form-control\" id=\"showName\" name=\"showName\" placeholder=\"请输入演出名称\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showPic\" class=\"col-sm-1 control-label\">演出海报</label>        <div class=\"col-sm-11\">          <img src=\"http://localhost:3000/uploads/{{showPic}}\" style=\"width: 100px; height: 100px;\" alt=\"\">          <input type=\"file\" id=\"showPic\" name=\"showPic\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showLocal\" class=\"col-sm-1 control-label\">演出场地</label>        <div class=\"col-sm-11\">          <input type=\"text\" value=\"{{showLocal}}\" class=\"form-control\" id=\"showLocal\" name=\"showLocal\" placeholder=\"请输入演出场地\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showTime\" class=\"col-sm-1 control-label\">演出时间</label>        <div class=\"col-sm-11\">          <input type=\"text\" value=\"{{showTime}}\" class=\"form-control\" id=\"showTime\" name=\"showTime\" placeholder=\"请输入演出时间\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showPrice\" class=\"col-sm-1 control-label\">售价</label>        <div class=\"col-sm-11\">          <input type=\"text\" value=\"{{showPrice}}\" class=\"form-control\" id=\"showPrice\" name=\"showPrice\" placeholder=\"请输入售价\">        </div>      </div>      <div class=\"form-group\">        <label for=\"showStates\" class=\"col-sm-1 control-label\">售票状态</label>        <div class=\"col-sm-11\">          <input type=\"text\" value=\"{{showStates}}\" class=\"form-control\" id=\"showStates\" name=\"showStates\" placeholder=\"请输入售票状态\">        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\"box-footer\">      <a href=\"#/newslist\"><button type=\"button\" class=\"btn btn-default\">返回</button></a>      <button type=\"button\" id=\"editSubmit\" class=\"btn btn-info pull-right\">提交</button>    </div>    <!-- /.box-footer -->  </form></div><!-- /.box -->"

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const homeView = __webpack_require__(11)
const navView = __webpack_require__(1)

const render = () => {
  $('.content').html(homeView)
  let newNavHtml = template.render(navView, {
    title: '首页',
    subtitle: '欢迎信息',
    navLevel1: '首页',
    navLevel2: 'welcome',
    url: '#/'
  })
  $('#nav').html(newNavHtml)
}
module.exports = {
  render
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "<div>欢迎来到永乐票务后台系统！！！</div>"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function Router() {
  this.currentUrl = ''
  this.routes = {}
}

Router.prototype.route = function (hash, cb) {
  this.routes[hash] = cb || function() {}
}

Router.prototype.refresh = function(e) {
  let hash = this.parsehash(location.hash.slice(1))
  this.currentUrl = '/' + (hash.route || '')
  this.routes[this.currentUrl](hash.param)
}

Router.prototype.init = function () {
  this.refresh()
  window.addEventListener('hashchange', this.refresh.bind(this), false)
}

Router.prototype.parsehash = function (hash) {
  const hashinfo = hash.split('/')
  return {
    route: hashinfo[1],
    param: hashinfo[2] || ''
  }
}

module.exports = Router


/***/ })
/******/ ]);