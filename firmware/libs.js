/**
 * Created by lukevenediger on 2016/05/03.
 */

/* jshint ignore:start */
// PLite - promises library
function Plite(n){function t(n,e,i){n&&n.then?n.then(function(n){t(n,e,i)})["catch"](function(n){t(n,i,i)}):e(n)}function e(n){u=function(t,e){try{n(t,e)}catch(i){e(i)}},r(),r=void 0}function i(n){e(function(t,e){e(n)})}function c(n){e(function(t){t(n)})}function o(n,t){var e=r;r=function(){e(),u(n,t)}}var u,f=function(){},r=f,l={then:function(n){var t=u||o;return Plite(function(e,i){t(function(t){e(n(t))},i)})},"catch":function(n){var t=u||o;return Plite(function(e,i){t(e,function(t){i(n(t))})})},resolve:function(n){!u&&t(n,c,i)},reject:function(n){!u&&t(n,i,i)}};return n&&n(l.resolve,l.reject),l}Plite.resolve=function(n){return Plite(function(t){t(n)})},Plite.reject=function(n){return Plite(function(t,e){e(n)})},Plite.race=function(n){return n=n||[],Plite(function(t,e){var i=n.length;if(!i)return t();for(var c=0;i>c;++c){var o=n[c];o&&o.then&&o.then(t)["catch"](e)}})},Plite.all=function(n){return n=n||[],Plite(function(t,e){function i(){--u<=0&&t(n)}function c(t,c){t&&t.then?t.then(function(t){n[c]=t,i()})["catch"](e):i()}var o=n.length,u=o;if(!o)return t();for(var f=0;o>f;++f)c(n[f],f)})},"object"==typeof module&&"function"!=typeof define&&(module.exports=Plite);
/* jshint ignore:end */
