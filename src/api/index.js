// 将所有API统一进行管理
import requests from "./request";
// mock
import mockRequests from './mockAjax';
// 三级联动接口
// get-无參    http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
// 发请求--axios 发送请求，返回Promise对象
// export const reqCategoryList = ()=>requests({url:'product/getBaseCategoryList',method:'get'})
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner（首页轮播图接口）
export const reqGetBannerList =()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');

// 获取搜索search模块数据  地址： /api/list 、 请求方式： post 、 需要带参数
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo=(params)=>requests({url:"/list",method:"post",data:params});

// 获取产品详情信息的接口，URL: /api/item/{ skuid } 请求方式：GET
export const reqGetGoodsInfo=(skuid)=>requests({url:`/item/${skuid}`,method:'get'});


// 将产品添加到购物车中（获取更新购物车中某一个产品的个数）  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'});

// 获取购物车列表数据的接口  /api/cart/cartList  get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品的选中状态   URL:/api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});


// 获取验证码 /api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get' });

// 注册   /api/user/passport/register  method:post    phone  code  password
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

// 登录   URL: /api/user/passport/login   method:post  phone  password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

// 获取用户信息【需要带用户的token 向服务器请求用户信息】  url:/api/user/passport/auth/getUserInfo  method:post
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 退出登陆 
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'}); 


// 获取用户地址信息--结算
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取商品清单--trade
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息--pay
export const reqPayInfo = (orderId) =>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 获取支付订单状态--pay-支付
export const reqPayStatus = (orderId) =>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

// 获取我的订单信息--center-个人中心-查看，我的订单（page:第几页，limit:每页几个数据）
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`, method:'get'} );