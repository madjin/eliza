"use strict";(self.webpackChunkeliza_docs=self.webpackChunkeliza_docs||[]).push([[1325],{7044:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var t=n(4848),o=n(8453);const i={id:"evaluationTemplate",title:"Variable: evaluationTemplate",sidebar_label:"evaluationTemplate",sidebar_position:0,custom_edit_url:null},r=void 0,l={id:"variables/evaluationTemplate",title:"Variable: evaluationTemplate",description:"\u2022 Const evaluationTemplate Based on the conversation and conditions, determine which evaluation functions are appropriate to call.\\nExamples You are helping me to decide which appropriate functions to call based on the conversation between {} and {{agentName}}.\\n\\n{{recentMessages}}\\n\\nEvaluator Functions\\n{{evaluatorConditions}}\\n\\nTASK\\n`json\\n[\\n  'evaluatorName',\\n  'evaluatorName'\\n]\\n`\\n\\nYour response must include the JSON block.\"",source:"@site/api/variables/evaluationTemplate.md",sourceDirName:"variables",slug:"/variables/evaluationTemplate",permalink:"/eliza/api/variables/evaluationTemplate",draft:!1,unlisted:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"evaluationTemplate",title:"Variable: evaluationTemplate",sidebar_label:"evaluationTemplate",sidebar_position:0,custom_edit_url:null},sidebar:"apiSidebar",previous:{title:"embeddingZeroVector",permalink:"/eliza/api/variables/embeddingZeroVector"},next:{title:"messageHandlerTemplate",permalink:"/eliza/api/variables/messageHandlerTemplate"}},s={},c=[];function u(e){const a={code:"code",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(a.p,{children:["\u2022 ",(0,t.jsx)(a.code,{children:"Const"})," ",(0,t.jsx)(a.strong,{children:"evaluationTemplate"}),": ",(0,t.jsx)(a.code,{children:"\"TASK: Based on the conversation and conditions, determine which evaluation functions are appropriate to call.\\nExamples:\\n{{evaluatorExamples}}\\n\\nINSTRUCTIONS: You are helping me to decide which appropriate functions to call based on the conversation between {{senderName}} and {{agentName}}.\\n\\n{{recentMessages}}\\n\\nEvaluator Functions:\\n{{evaluators}}\\n\\nEvaluator Conditions:\\n{{evaluatorConditions}}\\n\\nTASK: Based on the most recent conversation, determine which evaluators functions are appropriate to call to call.\\nInclude the name of evaluators that are relevant and should be called in the array\\nAvailable evaluator names to include are {{evaluatorNames}}\\nRespond with a JSON array containing a field for description in a JSON block formatted for markdown with this structure:\\n```json\\n[\\n  'evaluatorName',\\n  'evaluatorName'\\n]\\n```\\n\\nYour response must include the JSON block.\""})]}),"\n",(0,t.jsx)(a.p,{children:"Template used for the evaluation completion."})]})}function d(e={}){const{wrapper:a}={...(0,o.R)(),...e.components};return a?(0,t.jsx)(a,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},8453:(e,a,n)=>{n.d(a,{R:()=>r,x:()=>l});var t=n(6540);const o={},i=t.createContext(o);function r(e){const a=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(a):{...a,...e}}),[a,e])}function l(e){let a;return a=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(i.Provider,{value:a},e.children)}}}]);