"use strict";(self.webpackChunkeliza_docs=self.webpackChunkeliza_docs||[]).push([[2965],{65182:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>o});const s=JSON.parse('{"id":"core/actions","title":"\u26a1 Actions","description":"Actions are core building blocks in Eliza that define how agents respond to and interact with messages. They allow agents to interact with external systems, modify their behavior, and perform tasks beyond simple message responses.","source":"@site/docs/core/actions.md","sourceDirName":"core","slug":"/core/actions","permalink":"/eliza/docs/core/actions","draft":false,"unlisted":false,"editUrl":"https://github.com/ai16z/eliza/tree/main/docs/docs/core/actions.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"tutorialSidebar","previous":{"title":"Providers","permalink":"/eliza/docs/core/providers"},"next":{"title":"Evaluators","permalink":"/eliza/docs/core/evaluators"}}');var t=i(74848),r=i(28453);const a={sidebar_position:6},c="\u26a1 Actions",l={},o=[{value:"Overview",id:"overview",level:2},{value:"Implementation",id:"implementation",level:2},{value:"Conversation Flow",id:"conversation-flow",level:2},{value:"CONTINUE",id:"continue",level:3},{value:"IGNORE",id:"ignore",level:3},{value:"NONE",id:"none",level:3},{value:"External Integrations",id:"external-integrations",level:2},{value:"TAKE_ORDER",id:"take_order",level:3},{value:"Creating Custom Actions",id:"creating-custom-actions",level:2},{value:"Testing Actions",id:"testing-actions",level:3},{value:"Core Concepts",id:"core-concepts",level:2},{value:"Action Structure",id:"action-structure",level:3},{value:"Key Components",id:"key-components",level:3},{value:"Built-in Actions",id:"built-in-actions-1",level:2},{value:"CONTINUE",id:"continue-1",level:3},{value:"IGNORE",id:"ignore-1",level:3},{value:"FOLLOW_ROOM",id:"follow_room",level:3},{value:"Creating Custom Actions",id:"creating-custom-actions-1",level:2},{value:"Basic Action Template",id:"basic-action-template",level:3},{value:"Advanced Action Example",id:"advanced-action-example",level:3},{value:"Implementation Patterns",id:"implementation-patterns",level:2},{value:"State-Based Actions",id:"state-based-actions",level:3},{value:"Service Integration",id:"service-integration",level:3},{value:"Best Practices",id:"best-practices",level:2},{value:"Action Design",id:"action-design",level:3},{value:"Example Organization",id:"example-organization",level:3},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Common Issues",id:"common-issues",level:3},{value:"Advanced Features",id:"advanced-features",level:2},{value:"Action Composition",id:"action-composition",level:3},{value:"Action Chains",id:"action-chains",level:3},{value:"Example: Complete Action Implementation",id:"example-complete-action-implementation",level:2},{value:"Further Reading",id:"further-reading",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"-actions",children:"\u26a1 Actions"})}),"\n",(0,t.jsx)(n.p,{children:"Actions are core building blocks in Eliza that define how agents respond to and interact with messages. They allow agents to interact with external systems, modify their behavior, and perform tasks beyond simple message responses."}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"overview",children:"Overview"}),"\n",(0,t.jsx)(n.p,{children:"Each Action consists of:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"name"}),": Unique identifier for the action"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"similes"}),": Array of alternative names/variations"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"description"}),": Detailed explanation of the action's purpose"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"validate"}),": Function that checks if action is appropriate"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"handler"}),": Implementation of the action's behavior"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"examples"}),": Array of example usage patterns"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"implementation",children:"Implementation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"interface Action {\n  name: string;\n  similes: string[];\n  description: string;\n  examples: ActionExample[][];\n  handler: Handler;\n  validate: Validator;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Source: ",(0,t.jsx)(n.a,{href:"https://github.com/ai16z/eliza/packages/core/src/types.ts",children:"https://github.com/ai16z/eliza/packages/core/src/types.ts"})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"built-in-actions",children:"Built-in Actions"}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"conversation-flow",children:"Conversation Flow"}),"\n",(0,t.jsx)(n.h3,{id:"continue",children:"CONTINUE"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Maintains conversation when more context is needed"}),"\n",(0,t.jsx)(n.li,{children:"Manages natural dialogue progression"}),"\n",(0,t.jsx)(n.li,{children:"Limited to 3 consecutive continues"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"ignore",children:"IGNORE"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Gracefully disengages from conversations"}),"\n",(0,t.jsxs)(n.li,{children:["Handles:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Inappropriate interactions"}),"\n",(0,t.jsx)(n.li,{children:"Natural conversation endings"}),"\n",(0,t.jsx)(n.li,{children:"Post-closing responses"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"none",children:"NONE"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Default response action"}),"\n",(0,t.jsx)(n.li,{children:"Used for standard conversational replies"}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"external-integrations",children:"External Integrations"}),"\n",(0,t.jsx)(n.h3,{id:"take_order",children:"TAKE_ORDER"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Records trading/purchase orders"}),"\n",(0,t.jsx)(n.li,{children:"Processes user conviction levels"}),"\n",(0,t.jsx)(n.li,{children:"Validates ticker symbols and contract addresses"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const take_order: Action = {\n  name: "TAKE_ORDER",\n  similes: ["BUY_ORDER", "PLACE_ORDER"],\n  description: "Records a buy order based on the user\'s conviction level.",\n  validate: async (runtime: IAgentRuntime, message: Memory) => {\n    const text = (message.content as Content).text;\n    const tickerRegex = /\\b[A-Z]{1,5}\\b/g;\n    return tickerRegex.test(text);\n  },\n  // ... rest of implementation\n};\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Source: ",(0,t.jsx)(n.a,{href:"https://github.com/ai16z/eliza/packages/plugin-solana/src/actions/takeOrder.ts",children:"https://github.com/ai16z/eliza/packages/plugin-solana/src/actions/takeOrder.ts"})]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"creating-custom-actions",children:"Creating Custom Actions"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Implement the Action interface"}),"\n",(0,t.jsx)(n.li,{children:"Define validation logic"}),"\n",(0,t.jsx)(n.li,{children:"Implement handler functionality"}),"\n",(0,t.jsx)(n.li,{children:"Provide usage examples"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const customAction: Action = {\n  name: "CUSTOM_ACTION",\n  similes: ["SIMILAR_ACTION"],\n  description: "Action purpose",\n  validate: async (runtime: IAgentRuntime, message: Memory) => {\n    // Validation logic\n    return true;\n  },\n  handler: async (runtime: IAgentRuntime, message: Memory) => {\n    // Implementation\n  },\n  examples: [],\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"testing-actions",children:"Testing Actions"}),"\n",(0,t.jsx)(n.p,{children:"Use the built-in testing framework:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'test("Validate action behavior", async () => {\n  const message: Memory = {\n    userId: user.id,\n    content: { text: "Test message" },\n    roomId,\n  };\n\n  const response = await handleMessage(runtime, message);\n  // Verify response\n});\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"core-concepts",children:"Core Concepts"}),"\n",(0,t.jsx)(n.h3,{id:"action-structure",children:"Action Structure"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"interface Action {\n  name: string;\n  similes: string[];\n  description: string;\n  validate: (runtime: IAgentRuntime, message: Memory) => Promise<boolean>;\n  handler: (\n    runtime: IAgentRuntime,\n    message: Memory,\n    state?: State,\n  ) => Promise<void>;\n  examples: ActionExample[][];\n}\n"})}),"\n",(0,t.jsx)(n.h3,{id:"key-components",children:"Key Components"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"name"}),": Unique identifier for the action"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"similes"}),": Alternative names/triggers for the action"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"description"}),": Explains when and how the action should be used"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"validate"}),": Determines if the action can be executed"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"handler"}),": Implements the action's behavior"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"examples"}),": Demonstrates proper usage patterns"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"built-in-actions-1",children:"Built-in Actions"}),"\n",(0,t.jsx)(n.h3,{id:"continue-1",children:"CONTINUE"}),"\n",(0,t.jsx)(n.p,{children:"Continues the conversation when appropriate:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const continueAction: Action = {\n  name: "CONTINUE",\n  similes: ["ELABORATE", "KEEP_TALKING"],\n  description:\n    "Used when the message requires a follow-up. Don\'t use when conversation is finished.",\n  validate: async (runtime, message) => {\n    // Validation logic\n    return true;\n  },\n  handler: async (runtime, message, state) => {\n    // Continuation logic\n  },\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"ignore-1",children:"IGNORE"}),"\n",(0,t.jsx)(n.p,{children:"Stops responding to irrelevant or completed conversations:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const ignoreAction: Action = {\n  name: "IGNORE",\n  similes: ["STOP_TALKING", "STOP_CHATTING"],\n  description:\n    "Used when ignoring the user is appropriate (conversation ended, user is aggressive, etc.)",\n  handler: async (runtime, message) => {\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"follow_room",children:"FOLLOW_ROOM"}),"\n",(0,t.jsx)(n.p,{children:"Actively participates in a conversation:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const followRoomAction: Action = {\n  name: "FOLLOW_ROOM",\n  similes: ["FOLLOW_CHAT", "FOLLOW_CONVERSATION"],\n  description:\n    "Start following channel with interest, responding without explicit mentions.",\n  handler: async (runtime, message) => {\n    // Room following logic\n  },\n};\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"creating-custom-actions-1",children:"Creating Custom Actions"}),"\n",(0,t.jsx)(n.h3,{id:"basic-action-template",children:"Basic Action Template"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const customAction: Action = {\n  name: "CUSTOM_ACTION",\n  similes: ["ALTERNATE_NAME", "OTHER_TRIGGER"],\n  description: "Detailed description of when and how to use this action",\n  validate: async (runtime: IAgentRuntime, message: Memory) => {\n    // Validation logic\n    return true;\n  },\n  handler: async (runtime: IAgentRuntime, message: Memory) => {\n    // Implementation logic\n    return true;\n  },\n  examples: [\n    [\n      {\n        user: "{{user1}}",\n        content: { text: "Trigger message" },\n      },\n      {\n        user: "{{user2}}",\n        content: { text: "Response", action: "CUSTOM_ACTION" },\n      },\n    ],\n  ],\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"advanced-action-example",children:"Advanced Action Example"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const complexAction: Action = {\n  name: "PROCESS_DOCUMENT",\n  similes: ["READ_DOCUMENT", "ANALYZE_DOCUMENT"],\n  description: "Process and analyze uploaded documents",\n  validate: async (runtime, message) => {\n    const hasAttachment = message.content.attachments?.length > 0;\n    const supportedTypes = ["pdf", "txt", "doc"];\n    return (\n      hasAttachment &&\n      supportedTypes.includes(message.content.attachments[0].type)\n    );\n  },\n  handler: async (runtime, message, state) => {\n    const attachment = message.content.attachments[0];\n\n    // Process document\n    const content = await runtime\n      .getService<IDocumentService>(ServiceType.DOCUMENT)\n      .processDocument(attachment);\n\n    // Store in memory\n    await runtime.documentsManager.createMemory({\n      id: generateId(),\n      content: { text: content },\n      userId: message.userId,\n      roomId: message.roomId,\n    });\n\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"implementation-patterns",children:"Implementation Patterns"}),"\n",(0,t.jsx)(n.h3,{id:"state-based-actions",children:"State-Based Actions"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const stateAction: Action = {\n  name: "UPDATE_STATE",\n  handler: async (runtime, message, state) => {\n    const newState = await runtime.composeState(message, {\n      additionalData: "new-data",\n    });\n\n    await runtime.updateState(newState);\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"service-integration",children:"Service Integration"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const serviceAction: Action = {\n  name: "TRANSCRIBE_AUDIO",\n  handler: async (runtime, message) => {\n    const transcriptionService = runtime.getService<ITranscriptionService>(\n      ServiceType.TRANSCRIPTION,\n    );\n\n    const result = await transcriptionService.transcribe(\n      message.content.attachments[0],\n    );\n\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"best-practices",children:"Best Practices"}),"\n",(0,t.jsx)(n.h3,{id:"action-design",children:"Action Design"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Clear Purpose"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Single responsibility principle"}),"\n",(0,t.jsx)(n.li,{children:"Well-defined triggers"}),"\n",(0,t.jsx)(n.li,{children:"Clear success criteria"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Robust Validation"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Check prerequisites"}),"\n",(0,t.jsx)(n.li,{children:"Validate input data"}),"\n",(0,t.jsx)(n.li,{children:"Handle edge cases"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Error Handling"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Graceful failure"}),"\n",(0,t.jsx)(n.li,{children:"Meaningful error messages"}),"\n",(0,t.jsx)(n.li,{children:"State recovery"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"example-organization",children:"Example Organization"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Comprehensive Coverage"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"examples: [\n  // Happy path\n  [basicUsageExample],\n  // Edge cases\n  [edgeCaseExample],\n  // Error cases\n  [errorCaseExample],\n];\n"})}),"\n",(0,t.jsxs)(n.ol,{start:"2",children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.strong,{children:"Clear Context"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'examples: [\n  [\n    {\n      user: "{{user1}}",\n      content: {\n        text: "Context message showing why action is needed",\n      },\n    },\n    {\n      user: "{{user2}}",\n      content: {\n        text: "Clear response demonstrating action usage",\n        action: "ACTION_NAME",\n      },\n    },\n  ],\n];\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,t.jsx)(n.h3,{id:"common-issues",children:"Common Issues"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Action Not Triggering"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Check validation logic"}),"\n",(0,t.jsx)(n.li,{children:"Verify similes list"}),"\n",(0,t.jsx)(n.li,{children:"Review example patterns"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Handler Failures"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Validate service availability"}),"\n",(0,t.jsx)(n.li,{children:"Check state requirements"}),"\n",(0,t.jsx)(n.li,{children:"Review error logs"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"State Inconsistencies"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Verify state updates"}),"\n",(0,t.jsx)(n.li,{children:"Check concurrent modifications"}),"\n",(0,t.jsx)(n.li,{children:"Review state transitions"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"advanced-features",children:"Advanced Features"}),"\n",(0,t.jsx)(n.h3,{id:"action-composition",children:"Action Composition"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const compositeAction: Action = {\n  name: "PROCESS_AND_RESPOND",\n  handler: async (runtime, message) => {\n    // Process first action\n    await runtime.processAction("ANALYZE_CONTENT", message);\n\n    // Process second action\n    await runtime.processAction("GENERATE_RESPONSE", message);\n\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.h3,{id:"action-chains",children:"Action Chains"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'const chainedAction: Action = {\n  name: "WORKFLOW",\n  handler: async (runtime, message) => {\n    const actions = ["VALIDATE", "PROCESS", "RESPOND"];\n\n    for (const actionName of actions) {\n      await runtime.processAction(actionName, message);\n    }\n\n    return true;\n  },\n};\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"example-complete-action-implementation",children:"Example: Complete Action Implementation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:'import { Action, IAgentRuntime, Memory, State } from "@ai16z/eliza";\n\nconst documentAnalysisAction: Action = {\n  name: "ANALYZE_DOCUMENT",\n  similes: ["READ_DOCUMENT", "PROCESS_DOCUMENT", "REVIEW_DOCUMENT"],\n  description: "Analyzes uploaded documents and provides insights",\n\n  validate: async (runtime: IAgentRuntime, message: Memory) => {\n    // Check for document attachment\n    if (!message.content.attachments?.length) {\n      return false;\n    }\n\n    // Verify document type\n    const attachment = message.content.attachments[0];\n    return ["pdf", "txt", "doc"].includes(attachment.type);\n  },\n\n  handler: async (runtime: IAgentRuntime, message: Memory, state?: State) => {\n    try {\n      // Get document service\n      const docService = runtime.getService<IDocumentService>(\n        ServiceType.DOCUMENT,\n      );\n\n      // Process document\n      const content = await docService.processDocument(\n        message.content.attachments[0],\n      );\n\n      // Store analysis\n      await runtime.documentsManager.createMemory({\n        id: generateId(),\n        content: {\n          text: content,\n          analysis: await docService.analyze(content),\n        },\n        userId: message.userId,\n        roomId: message.roomId,\n        createdAt: Date.now(),\n      });\n\n      return true;\n    } catch (error) {\n      console.error("Document analysis failed:", error);\n      return false;\n    }\n  },\n\n  examples: [\n    [\n      {\n        user: "{{user1}}",\n        content: {\n          text: "Can you analyze this document?",\n          attachments: [{ type: "pdf", url: "document.pdf" }],\n        },\n      },\n      {\n        user: "{{user2}}",\n        content: {\n          text: "I\'ll analyze that document for you",\n          action: "ANALYZE_DOCUMENT",\n        },\n      },\n    ],\n  ],\n};\n'})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h1,{id:"best-practices-1",children:"Best Practices"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Validation"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Thoroughly check input parameters"}),"\n",(0,t.jsx)(n.li,{children:"Verify runtime conditions"}),"\n",(0,t.jsx)(n.li,{children:"Handle edge cases"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Error Handling"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Implement comprehensive error catching"}),"\n",(0,t.jsx)(n.li,{children:"Provide clear error messages"}),"\n",(0,t.jsx)(n.li,{children:"Clean up resources properly"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"Documentation"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Include clear usage examples"}),"\n",(0,t.jsx)(n.li,{children:"Document expected inputs/outputs"}),"\n",(0,t.jsx)(n.li,{children:"Explain error scenarios"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"further-reading",children:"Further Reading"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/eliza/docs/core/providers",children:"Provider System"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"#",children:"Service Integration"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"../../packages/core",children:"Memory Management"})}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>c});var s=i(96540);const t={},r=s.createContext(t);function a(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);