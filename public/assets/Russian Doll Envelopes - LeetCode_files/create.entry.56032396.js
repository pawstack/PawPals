webpackJsonp([7],{1314:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=t(1);t(1538);var r=function(e){var n=e.text,t=e.slug,a=e.empty;return o.default.createElement("div",{className:"element-base col-sm-4 col-xs-6"},a?o.default.createElement("div",{className:"element-touch-event text-center",onClick:function(){return window.open("/playground/new","_blank")},"data-dismiss":"modal"},o.default.createElement("div",{className:"element-object"},o.default.createElement("div",{className:"object"},o.default.createElement("span",{className:"text-100"},"+"))),o.default.createElement("div",{className:"element-name"},n)):o.default.createElement("div",{className:"element-touch-event text-center",onClick:function(){return window.open("/playground/new/"+t,"_blank")},"data-dismiss":"modal"},o.default.createElement("div",{className:"element-object"},o.default.createElement("div",{className:"object"},o.default.createElement("img",{role:"presentation",className:"object-img",src:"/static/images/playground/temp_"+t+".jpg"}),o.default.createElement("div",{className:"template-label"},"Template"))),o.default.createElement("div",{className:"element-name"},n)))};r.propTypes={text:l.PropTypes.string.isRequired,link:l.PropTypes.string,empty:l.PropTypes.bool},n.default=r},1315:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t(3);var o=t(0),l=a(o),r=t(7),i=t(524),d=a(i),s=t(525),p=a(s);(0,r.render)(l.default.createElement(d.default,null),document.getElementById("playgroundNav")),(0,r.render)(l.default.createElement(p.default,null),document.getElementById("playground-create-modal"))},1359:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),o=function(e){return e&&e.__esModule?e:{default:e}}(a),l=t(1),r=function(e){var n=e.name,t=e.center,a=e.children,l=n||"simple-modal";return o.default.createElement("div",{className:"modal fade",id:l,tabIndex:"-1",role:"dialog"},o.default.createElement("div",{className:""+(t&&"modal-center")},o.default.createElement("div",{className:"modal-dialog"},o.default.createElement("div",{className:"modal-content"},a))))};r.propTypes={name:l.PropTypes.string,center:l.PropTypes.bool,children:l.PropTypes.node},n.default=r},1536:function(e,n,t){var a=t(840);"string"==typeof a&&(a=[[e.i,a,""]]);t(6)(a,{});a.locals&&(e.exports=a.locals)},1537:function(e,n,t){var a=t(841);"string"==typeof a&&(a=[[e.i,a,""]]);t(6)(a,{});a.locals&&(e.exports=a.locals)},1538:function(e,n,t){var a=t(842);"string"==typeof a&&(a=[[e.i,a,""]]);t(6)(a,{});a.locals&&(e.exports=a.locals)},524:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t(0),o=function(e){return e&&e.__esModule?e:{default:e}}(a);t(1536);var l=function(){return o.default.createElement("span",{className:"dropdown playground-create-btn-dropdown"},o.default.createElement("span",{"data-toggle":"dropdown",className:"playground-create-new-btn-base icon-base"},o.default.createElement("div",{className:"add-icon"},o.default.createElement("i",{className:"fa fa-plus-circle","aria-hidden":"true"})),o.default.createElement("img",{src:"/static/images/LeetCode_Playground.png",height:"24px",alt:"New Playground"})),o.default.createElement("ul",{className:"dropdown-menu dropdown-content"},o.default.createElement("div",{className:"square"}),o.default.createElement("div",{className:"dropdown-view"},o.default.createElement("div",{className:"select-title"},"Playground"),o.default.createElement("div",{className:"selection selection-left"},o.default.createElement("div",{className:"selector",onClick:function(){return window.open("/playground/new","_blank")}},o.default.createElement("div",{className:"new-icon icon"},"+"),o.default.createElement("div",{className:"title"},"New"))),o.default.createElement("div",{className:"selection"},o.default.createElement("div",{className:"selector","data-toggle":"modal","data-target":"#newPlaygroundwModal"},o.default.createElement("div",{className:"more-icon icon"},o.default.createElement("lc",null,"…")),o.default.createElement("div",{className:"title"},"More"))),o.default.createElement("div",{className:"selection-bottom"},o.default.createElement("div",{className:"selector",onClick:function(){return window.open("/playground","_blank")}},o.default.createElement("i",{className:"fa fa-external-link","aria-hidden":"true"}),"  Manage")))))};n.default=l},525:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function o(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function l(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function r(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),d=function(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}(["\n      query {\n        allLeetcodePlaygroundTemplates {\n          templateId\n          name\n          nameSlug\n        }\n      }\n      "],["\n      query {\n        allLeetcodePlaygroundTemplates {\n          templateId\n          name\n          nameSlug\n        }\n      }\n      "]),s=t(0),p=a(s),c=t(1),u=t(1359),m=a(u),f=t(1314),b=a(f);t(1537);var g=t(32),v=t(53),x=function(e){function n(e){o(this,n);var t=l(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e));return t.state={showNewPlaygroundModal:!1,fetchedPlaygroundTemplates:!1},t}return r(n,e),i(n,[{key:"componentDidMount",value:function(){var e=this;g.client.query({query:(0,v.gql)(d)}).then(function(n){var t=n.data.allLeetcodePlaygroundTemplates;e.setState({fetchedPlaygroundTemplates:!0,allLeetcodePlaygroundTemplates:t})})}},{key:"render",value:function(){var e="Loading...",n=[p.default.createElement(b.default,{key:"new-empty-playground",text:"Empty Playground",empty:!0})];return this.state.fetchedPlaygroundTemplates&&this.state.allLeetcodePlaygroundTemplates.forEach(function(e){n.push(p.default.createElement(b.default,{key:"playground-"+e.name,text:e.name,slug:e.nameSlug}))}),e=n,p.default.createElement("div",{className:"CreateModal-base"},p.default.createElement(m.default,{name:"newPlaygroundwModal",center:!0},p.default.createElement("div",{className:"modal-header"},p.default.createElement("button",{type:"button",className:"close","data-dismiss":"modal"},"×"),p.default.createElement("h4",{className:"modal-title"},p.default.createElement("i",{className:"fa fa-file-code-o","aria-hidden":"true"}),"  Create a New Playground")),p.default.createElement("div",{className:"modal-body row"},e),p.default.createElement("div",{className:"modal-footer"},p.default.createElement("button",{type:"button",className:"btn btn-default","data-dismiss":"modal"},"Cancel"))))}}]),n}(s.Component);x.propTypes={name:c.PropTypes.string},n.default=x},840:function(e,n,t){n=e.exports=t(5)(),n.push([e.i,".ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: pre;\n}\n.animation-default,\n.default-animation {\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.default-sticky {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n.backdrop {\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n.hover-panel,\n.panel-hover {\n  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.hover-panel:hover,\n.panel-hover:hover {\n  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);\n}\n.playground-create-btn-dropdown:hover .add-icon {\n  opacity: 1 !important;\n}\n.playground-create-btn-dropdown:hover .dropdown-content {\n  display: block;\n}\n.nav-img-animation img {\n  filter: brightness(0.85);\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.nav-img-animation:hover img {\n  filter: none;\n}\n.navbar #playgroundNav {\n  margin-top: 13px;\n}\n.navbar #playgroundNav .dropdown {\n  text-align: center;\n}\n.navbar #playgroundNav .dropdown-menu {\n  width: 160px;\n  left: 50%;\n  margin-left: -80px;\n}\n.navbar #playgroundNav .square {\n  margin-left: 75px;\n  z-index: -1;\n  background: white;\n  -ms-transform: rotate(45deg);\n  /* IE 9 */\n  -webkit-transform: rotate(45deg);\n  /* Safari */\n  transform: rotate(45deg);\n  height: 10px;\n  width: 10px;\n}\n.navbar #playgroundNav .dropdown-view {\n  background: white;\n  border-radius: 5px;\n  margin-top: -5px;\n  font-size: 10px;\n  color: #95a5a6;\n}\n.navbar #playgroundNav .dropdown-view .select-title {\n  padding-top: 5px;\n  padding-bottom: 5px;\n  margin-left: 5px;\n  margin-right: 5px;\n  border-bottom: 1px solid #ecf0f1;\n}\n.navbar #playgroundNav .dropdown-view .selection-left {\n  border-right: 1px solid #ecf0f1;\n}\n.navbar #playgroundNav .dropdown-view .selection-bottom {\n  border-top: 1px solid #ecf0f1;\n  margin-left: 5px;\n  margin-right: 5px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n.navbar #playgroundNav .dropdown-view .selection-bottom .selector {\n  margin-left: 0;\n  margin-right: 0;\n}\n.navbar #playgroundNav .dropdown-view .selector {\n  cursor: pointer;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  margin-left: 5px;\n  margin-right: 5px;\n  border-radius: 5px;\n}\n.navbar #playgroundNav .dropdown-view .selector:hover {\n  background: #f5f5f5;\n}\n.navbar #playgroundNav .dropdown-view .selection {\n  cursor: pointer;\n  width: 50%;\n  display: inline-block;\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.navbar #playgroundNav .dropdown-view .selection .icon {\n  font-size: 32px;\n  font-weight: 200;\n  height: 40px;\n}\n.navbar #playgroundNav .dropdown-view .selection .new-icon {\n  color: #0088cc;\n}\n.navbar #playgroundNav .dropdown-view .selection .more-icon {\n  color: #FEA116;\n}\n.navbar #playgroundNav .dropdown-view .selection .more-icon lc {\n  position: absolute;\n  left: 106px;\n  top: 42px;\n  font-weight: 600;\n}\n.navbar #playgroundNav .dropdown-view .selection .title {\n  margin-top: 5px;\n}\n.navbar #playgroundNav .dropdown-content {\n  text-align: center;\n  padding-top: 8px;\n  padding-bottom: 0;\n  background: none;\n  border: none;\n}\n.navbar #playgroundNav .icon-base {\n  padding-top: 13px;\n  padding-right: 5px;\n  padding-left: 5px;\n  color: white;\n  cursor: pointer;\n}\n.navbar #playgroundNav .icon-base .add-icon {\n  opacity: 0;\n  position: absolute;\n  z-index: 10;\n  font-size: 14px;\n  top: 10px;\n  right: 0;\n  background: #222222;\n  border-radius: 1020px;\n  line-height: 0;\n  padding-top: 1px;\n  padding-left: 2px;\n  padding-right: 0px;\n  padding-bottom: 1px;\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.navbar #playgroundNav img {\n  filter: brightness(0.85);\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.navbar #playgroundNav:hover img {\n  filter: none;\n}\n",""])},841:function(e,n,t){n=e.exports=t(5)(),n.push([e.i,".ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: pre;\n}\n.animation-default,\n.default-animation {\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.default-sticky {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n.backdrop {\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n.hover-panel,\n.panel-hover {\n  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.hover-panel:hover,\n.panel-hover:hover {\n  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);\n}\n@media (max-width: 375px) {\n  .CreateModal-base .modal-body.row {\n    padding: 0;\n    padding-bottom: 20px;\n  }\n  .CreateModal-base .element-base {\n    padding-left: 0;\n    padding-right: 0;\n  }\n}\n.CreateModal-base .modal-content {\n  background: #FAFAFA;\n}\n.CreateModal-base .modal-body.row {\n  margin-right: 0;\n  margin-left: 0;\n}\n",""])},842:function(e,n,t){n=e.exports=t(5)(),n.push([e.i,".ellipsis {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: pre;\n}\n.animation-default,\n.default-animation {\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.default-sticky {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n.backdrop {\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n}\n.hover-panel,\n.panel-hover {\n  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n}\n.hover-panel:hover,\n.panel-hover:hover {\n  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);\n}\n.element-base {\n  margin-top: 20px;\n}\n.element-base .element-touch-event {\n  cursor: pointer;\n}\n.element-base .element-touch-event:hover .element-name {\n  color: #17807d;\n}\n.element-base .element-touch-event:hover .element-object {\n  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);\n}\n.element-base .element-name {\n  margin-top: 10px;\n}\n.element-base .element-object {\n  transition: all 0.4s;\n  -o-transition: all 0.4s;\n  -moz-transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);\n  margin: 0 auto;\n  height: 100px;\n  width: 150px;\n  border-radius: 10px;\n  background: white;\n  vertical-align: middle;\n}\n.element-base .element-object .object {\n  position: relative;\n  top: 35%;\n  transform: translateY(-35%);\n}\n.element-base .element-object .object .text-100 {\n  font-size: 50px;\n}\n.element-base .element-object .object .object-img {\n  height: 100px;\n  width: 150px;\n  border-radius: 10px;\n}\n.element-base .element-object .object .template-label {\n  color: #373737;\n  border-bottom-right-radius: 10px;\n  border-bottom-left-radius: 10px;\n  position: absolute;\n  padding: 5px;\n  width: 100%;\n  bottom: 0;\n  font-size: 12px;\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  background: rgba(255, 255, 255, 0.5);\n}\n",""])}},[1315]);