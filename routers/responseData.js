const ResponseData = function(){
  this.code = ResponseData.NO_ERROR ;
  this.returnData = {};
  this.msg = '';
};

ResponseData.NO_ERROR = 0;//无错误
ResponseData.ILLEGAL_ARGUMENT_ERROR_CODE = 1;//无效参数错误
ResponseData.BUSINESS_ERROR_CODE = 2;//业务错误
ResponseData.AUTH_ERROR_CODE = 3;//认证错误
ResponseData.SERVER_EXCEPTION_ERROR_CODE = 5;//服务器未知错误
ResponseData.TARGET_NOT_EXIT_ERROR_CODE = 6;//目标不存在错误

module.exports = ResponseData;
