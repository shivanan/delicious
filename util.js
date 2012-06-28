/*
 * Delicious Bookmarker
 * Copyright (c) 2009,2010 Haran Shivanan <shivanan@statictype.org>
 * Licensed under the MIT License. See the LICENSE.txt file
 */
Function.prototype.partial = function(){
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function(){
      var arg = 0;
      for ( var i = 0; i < args.length && arg < arguments.length; i++ )
        if ( args[i] === undefined )
          args[i] = arguments[arg++];
      return fn.apply(this, args);
    };
  };
Array.prototype.filter = function(func) {
    var result = [];
    for(var i=0;i<this.length;i++) 
        if (func(this[i]))
            result.push(this[i]);
    return result;
}
Array.prototype.first = function(func) {
    var result = [];
    for(var i=0;i<this.length;i++) 
        if (func(this[i]))
            return this[i];
    return null;
}
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}


function createLink(txt,func) {
    var a = $('<a/>').attr({'href':'#'}).append(txt);
    $(a).click(func);
    return a;
}
function xmlLoad(url,data,user,password,cb,err_cb,timeout) {
    var error_cb = function(xhr,status,err) {
        if (!!err_cb) err_cb(status);
    }
    var success_cb = function(_data,status) {
        if (!!cb) cb(_data);
    }

    if (!timeout) timeout = 10*1000;
    var options = {
        'async': true
            ,'data': data
            ,'error':error_cb
            ,'success':success_cb
            ,'url':url
            ,"dataType":"xml"
            ,'timeout':timeout
            ,'password':password
            ,'username':user
    }
    $.ajax(options);
}
function registerSubmit(ctrl,btn) {
    $(ctrl).keyup(function(event) {
        if (event.keyCode == 13)
            $(btn).click();
            });
}
function chainSql(tx,statements,done_cb,err_cb) {
    if (statements.length==0) {
        done_cb();
        return;
    }
    var statement = statements[0];
    statements.remove(0);
    tx.executeSql(statement.sql,statement.args,chainSql.partial(tx,statements,done_cb,err_cb),err_cb);
}
