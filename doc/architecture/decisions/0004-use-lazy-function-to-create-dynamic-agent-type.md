# 4. use lazy function to create dynamic agent type

Date: 2017-12-07

## Status

Accepted

## Context

We have 3 approaches and 3 types (function, class, proxy) to build an agent type.

1. Build when system boot. 
  - User can not change class attribute at runtime.
  - The fastest way to create an agent
  - Slowest to boot application when got over thousand agents.
   
2. Build at the first time initialize the agent
  - Lazy function, Lazy class, Lazy proxy (require ES6)
  - User can not change after first time create the agent
  - Fast to boot application
  - Create agent is slower than #1
   
3. Build every time. 
  - Almost same time to boot app with #2
  - User can change attribute before create agent
  - Slowest to create agent 

## Decision

The default value will be #2 LazyFunction. I think it's a good balance between booting application and creating agents.

## Consequences

User will not able to change attributes.