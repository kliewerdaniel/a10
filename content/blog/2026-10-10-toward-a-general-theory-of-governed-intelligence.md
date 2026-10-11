---
author: Daniel Kliewer
book_reference: true
canonical_url: /blog/2026-10-10-toward-a-general-theory-of-governed-intelligence
date: 10-10-2026
description: A research dissertation synthesizing the documented trajectory of Knowledge
  Compilation, Ganymede, Sovereign Worker, MindBroadcast, Recursive Trajectory Cryptography,
  and search-quality evaluation into a single design principle: epistemically governed
  computation.
image: /images/1020001.png
layout: post
og:description: A research dissertation synthesizing Knowledge Compilation, Ganymede,
  Sovereign Worker, MindBroadcast, Recursive Trajectory Cryptography, and search-quality
  evaluation into a single design principle: epistemically governed computation.
og:image: /images/1020001.png
og:title: Toward a General Theory of Governed Intelligence
og:type: article
og:url: /blog/2026-10-10-toward-a-general-theory-of-governed-intelligence
tags:
- epistemic accountability
- governed intelligence
- knowledge compilation
- AI governance
- Ganymede
- MindBroadcast
- local-first
- sovereign AI
title: Toward a General Theory of Governed Intelligence
twitter:card: summary_large_image
twitter:description: A research dissertation synthesizing the documented trajectory
  of Knowledge Compilation, Ganymede, Sovereign Worker, MindBroadcast, Recursive Trajectory
  Cryptography, and search-quality evaluation into a single design principle: epistemically
  governed computation.
twitter:image: /images/1020001.png
twitter:title: Toward a General Theory of Governed Intelligence
wiki_references: []
---
# Toward a General Theory of Governed Intelligence
## Knowledge, Recursive Systems, Epistemic Accountability, and the Ethics of Computational Agency

**A research dissertation synthesizing the documented trajectory of Daniel Kliewer’s work across artificial intelligence, knowledge representation, recursive computation, agent governance, cryptographic research, search evaluation, and the philosophy of technological action.**

### The central proposition

The most significant contribution that emerges from your work may not be any single repository, algorithm, or application. It may be a general design principle that connects them.

**An intelligent system should not be judged solely by the quality of its outputs or the objectives it achieves, but by whether its transformations of knowledge, authority, and the external world remain traceable, bounded, reproducible, and open to independent evaluation.**

I propose calling this principle *epistemically governed computation*.

The idea is that intelligence becomes more trustworthy when the processes through which it produces conclusions and takes action are made explicit enough to inspect, challenge, reproduce, and constrain. This applies to an AI agent deciding which tool to invoke, a knowledge compiler transforming documents into structured claims, a search evaluator correcting an erroneous relevance judgment, a recursive algorithm reaching a fixed point, or a broadcaster maintaining a persistent model of the world.

Your projects suggest that these are not necessarily separate engineering problems. They may be manifestations of a deeper problem: how to permit a computational system to transform its internal representation of reality without allowing the transformation itself to become an unaccountable source of authority.

That is the dissertation's proposed intellectual contribution.

There is, however, an important distinction between a promising thesis and an established scientific result. I can synthesize the documented projects, derive a novel theoretical framework, identify the relevant research literature, construct a falsifiable hypothesis, and defend the argument against plausible objections. I cannot honestly claim that the hypothesis has been empirically validated, that every project has been independently inspected, or that a doctoral examination has occurred. A rigorous dissertation must make those distinctions explicit.

What follows therefore takes the form of a research dissertation with a defensible theoretical contribution, an evidence-based analysis of the work described to date, and an empirical program capable of testing whether the proposed theory is correct.

# Part I. The dissertation

## Title

**Epistemically Governed Computation: A Theory of Provenance, Bounded Agency, Recursive Verification, and Accountable Knowledge Transformation in Artificial Intelligence Systems**

### Abstract

Contemporary artificial intelligence research has produced increasingly capable systems for generating language, synthesizing information, decomposing tasks, and executing actions. Yet increased capability does not necessarily entail increased reliability, and successful task completion does not establish that the means by which a task was completed were justified. This dissertation investigates the relationship between computational intelligence and the mechanisms required to make its outputs, transformations, and actions independently accountable.

The research begins with a synthesis of a body of engineering and conceptual work spanning knowledge compilation, provenance-aware information systems, recursive verification, AI search-quality evaluation, local-first intelligence infrastructure, autonomous-agent governance, cryptographic experimentation, and persistent world-state modeling. Although these projects address different technical problems, they share a recurring concern: the need to establish explicit boundaries between a system's proposals and the authority to accept those proposals as knowledge or execute them as actions.

The dissertation advances the hypothesis that **epistemic accountability can be treated as an architectural property of computational systems rather than as a responsibility imposed exclusively through human review or post hoc documentation**.

To investigate this hypothesis, it develops a framework called the *Governed Knowledge Transformation Model* (GKTM). The model represents intelligent computation as a sequence of transformations between observations, claims, decisions, actions, and recorded consequences. Each transformation is associated with an evidence requirement, a verification condition, an authorization boundary, and a mechanism for recording uncertainty or failure.

The framework integrates five properties: provenance, semantic fidelity, bounded authority, independent verification, and temporal accountability. It proposes that these properties can be evaluated through controlled experiments comparing governed and ungoverned implementations of equivalent computational tasks.

The research also identifies a potential limitation of conventional task decomposition. A complex objective may be divided into individually valid subtasks while the overall sequence produces a harmful or unjustified outcome. The dissertation therefore distinguishes *local correctness* from *trajectory-level legitimacy*: the correctness of an individual operation does not establish the legitimacy of the system's entire course of action.

This distinction connects formal methods, AI governance, knowledge representation, and moral philosophy. It suggests that reliable intelligence requires not merely the capacity to optimize outcomes but also an architecture that constrains which transformations are permitted, what evidence supports them, and who retains the authority to authorize consequential changes.

The study's existing evidence consists of documented project descriptions, implementation details, and reported test results. These establish the presence of relevant engineering patterns but do not, by themselves, establish the framework's superiority over alternative architectures. Accordingly, the dissertation separates documented observations from theoretical deductions and prospective empirical findings.

**Keywords:** artificial intelligence governance, epistemic accountability, knowledge provenance, recursive verification, formal methods, autonomous agents, task decomposition, software assurance, knowledge graphs, local-first computing, sociotechnical systems.

---

## Chapter 1. Introduction: The problem of intelligence without sufficient accountability

### 1.1 The distinction between capability and legitimacy

An intelligent system can generate a plausible answer without knowing whether the answer is true. It can identify a useful action without possessing the authority to perform it. It can execute every step of a plan correctly while the plan itself remains ethically indefensible.

These are three different failures.

The first is epistemic: a system produces a claim that is inadequately supported by evidence.

The second is institutional: a system performs an operation that exceeds its legitimate authority.

The third is normative: a system achieves an objective through a sequence of actions whose consequences make the objective, the method, or both unacceptable.

Much of the engineering challenge in artificial intelligence arises because these failures interact.

A false claim can become an input to a planning system. The planning system can decompose the resulting objective into executable tasks. An agent can carry out those tasks through tools and external services. A monitoring system can then record successful execution without detecting that the original premise was false.

The result is a system that may be operationally successful and epistemically defective at the same time.

This dissertation argues that the distinction between these forms of success must be represented explicitly in computational architecture.

The issue is not simply that AI systems make mistakes. Human institutions make mistakes as well. The deeper problem is that automation can distribute a single consequential decision across so many components that no individual component appears responsible for the final outcome.

Engstrom and Haim's analysis of government AI identifies precisely this difficulty at the institutional level: meaningful accountability depends on understanding how systems are designed, implemented, and incorporated into organizational practices, not merely on imposing external rules. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

Research on AI accountability similarly emphasizes that responsibility emerges through interactions among technical systems, human decisions, institutional standards, and organizational procedures. [DOI](https://doi.org/10.1007/s00146-023-01635-y?utm_source=chatgpt.com)

The present dissertation seeks to make this problem more precise.

Rather than asking only whether an AI system is accurate, aligned, explainable, or compliant, it asks:

**Can we design an intelligent system so that every consequential transformation of knowledge or authority is subject to an explicit, testable, and independently inspectable condition of legitimacy?**

This question provides the common theoretical foundation for the projects examined here.

### 1.2 The researcher's trajectory as a source of theoretical integration

Your work spans several areas that are often treated separately.

Your knowledge-compilation projects investigate the transformation of source material into structured, versioned representations. Your Ganymede research explores epistemic structures, provenance, and verification. Your governed-agent architecture separates proposals from authorized execution. Your MindBroadcast project models persistent information about the world. Your Recursive Trajectory Cryptography research investigates reversible transformations, state transitions, and evidence recording. Your search-quality work concerns the correction of errors in the interpretation and evaluation of information.

The connection between these projects is not that they all implement the same algorithm. They do not.

Nor is it that they have all demonstrated a common scientific result. That would require comparative evidence that is not yet available.

The connection is architectural and epistemological.

Each project addresses a different version of the problem of maintaining justified relationships between an input, a transformation, and an output.

In a knowledge compiler, the problem is whether the compiled representation faithfully preserves what the sources establish.

In an autonomous agent, it is whether a proposed action satisfies the conditions required for execution.

In a persistent information system, it is whether the system can distinguish current beliefs from earlier observations and subsequent corrections.

In a recursive verification system, it is whether a claimed invariant or fixed point has actually been established by the implemented procedure.

In search evaluation, it is whether a relevance judgment follows from the user's intent and the available evidence rather than from superficial textual similarity.

In cryptographic experimentation, it is whether a transformation can be specified, reproduced, and tested independently of claims about its security.

These problems can be represented within a single conceptual structure:

\[
\text{Input}
\rightarrow
\text{Interpretation}
\rightarrow
\text{Transformation}
\rightarrow
\text{Verification}
\rightarrow
\text{Acceptance}
\rightarrow
\text{Consequences}
\]

The critical insight is that these transitions are not interchangeable.

A transformation can occur without verification. Verification can occur without authorization. Authorization can be granted on inadequate evidence. A recorded outcome can be mistaken for proof that the preceding reasoning was sound.

A robust architecture must therefore represent the transitions themselves, not merely the final result.

### 1.3 Research questions

This dissertation develops five principal research questions.

**RQ1. Provenance and knowledge integrity**

Can explicit provenance relationships reduce the rate at which unsupported claims are introduced or preserved during transformations of information?

**RQ2. Separation of proposal and authority**

Can an architecture that separates an AI agent's proposed actions from an independently enforced authorization mechanism reduce unauthorized or policy-violating actions without making legitimate tasks impracticable?

**RQ3. Recursive verification**

Can verification procedures that operate independently of the mechanism proposing a result provide stronger assurance than systems in which the same process generates and validates its own conclusions?

**RQ4. Trajectory-level governance**

Can a system detect cases in which individually acceptable subtasks collectively produce an unacceptable outcome?

**RQ5. Cross-domain generalization**

Can a common set of architectural principles improve the inspectability and reliability of systems performing substantially different tasks, including knowledge compilation, search evaluation, persistent world modeling, and autonomous action?

The fifth question is particularly important. A principle that applies only to one implementation may be useful engineering practice, but it is not necessarily a general theory.

A doctoral-level contribution requires identifying the conditions under which a principle generalizes, the mechanisms through which it operates, and the circumstances in which it fails.

---

## Chapter 2. Theoretical foundations and relationship to existing research

### 2.1 Knowledge representation and provenance

Knowledge representation asks how information can be encoded so that computational systems can reason over it.

Provenance asks a different but complementary question: where did a particular piece of information come from, and through which processes did it arrive in its present form?

A claim without provenance may be difficult to distinguish from an inference, an assumption, a corrupted transformation, or a model-generated fabrication.

A claim with provenance is not necessarily true. Its source may be mistaken, its interpretation may be incorrect, or its supporting evidence may be insufficient. Nevertheless, provenance provides the structure needed to investigate these possibilities.

This distinction is fundamental to the proposed framework.

Let a claim be represented as:

\[
c = (p, s, m, v, q)
\]

where:

- \(p\) is the proposition being asserted.
- \(s\) is the set of supporting sources.
- \(m\) is the transformation or reasoning method through which the claim was produced.
- \(v\) is the version of the relevant inputs and implementation.
- \(q\) is the claim's epistemic status, including uncertainty or unresolved objections.

The representation does not guarantee truth. It establishes a minimum structure for examining the justification of a claim.

A more complex system can represent relationships among claims, evidence, sources, agents, and transformations as a directed graph:

\[
G = (V,E)
\]

Here, the vertices \(V\) represent relevant entities, while the edges \(E\) represent relationships such as supports, contradicts, derives from, supersedes, authorizes, or executes.

The advantage is not merely visualization. The graph permits queries that would otherwise be difficult to perform reliably.

For example:

- Which conclusions depend on a source that has since been retracted?
- Which decisions rely on an assumption rather than an observed fact?
- Which artifacts were generated using an outdated specification?
- Which actions were authorized under a policy version that is no longer valid?
- Which conclusions change if a particular source is removed?

Work on knowledge graphs for AI auditing similarly explores the integration of information about system components, datasets, processes, and decisions to support traceability and independent examination. [DOI](https://doi.org/10.1016/J.WEBSEM.2024.100849?utm_source=chatgpt.com)

**The proposed contribution is not the invention of provenance. It is the hypothesis that provenance should be connected to the conditions under which a system is permitted to transform knowledge or act on it.**

That connection is the subject of the remainder of the dissertation.

### 2.2 Formal methods and independent verification

Formal methods provide mathematical and computational techniques for specifying and verifying properties of systems.

Examples include invariants, model checking, type systems, proof obligations, and mechanically checked properties of program execution.

Their relevance to AI governance is straightforward: if a system must satisfy a specific condition before an action is permitted, that condition can sometimes be expressed as an executable predicate.

Suppose an agent proposes an action \(a\) in system state \(s\), under policy \(P\).

An authorization mechanism can evaluate:

\[
\operatorname{Permit}(s,a,P)
\in
\{\text{true},\text{false}\}
\]

Execution occurs only if the predicate evaluates to true.

In practice, the policy may also return an indeterminate state when the required evidence is missing or the proposed action falls outside the policy's defined scope.

This is important because an unknown condition should not automatically be treated as a satisfied condition.

Your Sovereign Worker and related agent-governance designs embody this general architectural direction through request-to-action pipelines, explicit permission checks, evidence recording, and verification stages. The reported use of an AST-based permission engine and an evidence ledger is especially relevant because it places some constraints outside the language model's own discretionary reasoning.

However, a policy engine can be perfectly implemented and still enforce a defective policy.

Formal correctness therefore establishes a conditional result:

> If the specification correctly expresses the intended requirement, and the implementation satisfies the specification, then the implementation can provide evidence that the specified requirement is enforced.

It does not establish that the requirement is morally correct, institutionally legitimate, or sufficient to prevent every harmful outcome.

This limitation becomes central when the framework is applied to governance.

### 2.3 Sociotechnical accountability

An AI system does not operate in isolation.

Its consequences depend on the surrounding organization, the people who interpret its outputs, the resources it can access, the incentives governing its deployment, and the procedures through which decisions become effective.

This means that accountability cannot be reduced to a property of model weights or inference behavior.

The U.S. Government Accountability Office's AI accountability framework organizes relevant practices around governance, data, performance, and monitoring. It also emphasizes the importance of audit and assessment mechanisms. [Government Accountability Office](https://www.gao.gov/products/gao-21-519sp?utm_source=chatgpt.com)

Recent work on organizational AI governance likewise treats technical controls, workflow design, monitoring, and escalation as complementary mechanisms rather than substitutes for one another. [Scholarship Miami](https://scholarship.miami.edu/esploro/outputs/journalArticle/Governing-generative-AI-in-organizations-a/991033161169402976?utm_source=chatgpt.com)

The framework developed here is consistent with this literature but makes a more specific proposal: accountability should be represented at the interfaces where one computational or institutional state becomes another.

These interfaces include:

- A source becoming an accepted claim.
- A claim becoming a planning assumption.
- A plan becoming an authorized operation.
- An operation becoming an external state change.
- An observation becoming a correction to the system's model of the world.
- A completed process becoming an assertion of success.

The framework does not assume that every interface can be governed by the same mechanism. It proposes that every consequential interface should have an identifiable assurance condition appropriate to its function.

### 2.4 The limits of task decomposition

Task decomposition is a powerful method for reducing complexity.

A difficult problem can be divided into smaller operations, each with a narrower objective and more easily specified acceptance criteria.

However, the validity of a decomposition depends on the relationship between local operations and the global objective.

Let a plan be:

\[
\Pi = (a_1,a_2,\ldots,a_n)
\]

Suppose every action satisfies its local specification:

\[
\forall i,\quad \operatorname{LocalValid}(a_i)=1
\]

It does not follow that:

\[
\operatorname{GloballyLegitimate}(\Pi)=1
\]

The gap arises because local specifications may omit interactions among actions, externalities, changes in context, or constraints that cannot be evaluated independently at each step.

For example, an autonomous system might correctly identify a resource bottleneck, correctly schedule a set of operations, and correctly allocate available resources, yet still violate a higher-level constraint because the original objective was incomplete.

The problem is not necessarily an error in execution. It is a failure in the relationship between local correctness and global legitimacy.

This is the basis of the dissertation's most important conceptual distinction:

**Local correctness concerns whether an operation satisfies its specification. Trajectory-level legitimacy concerns whether the sequence of operations remains permissible in light of the system's broader constraints, evidence, and consequences.**

The distinction is relevant to autonomous software agents, public administration, corporate decision systems, and military command-and-control applications.

It also provides a precise interpretation of the ethical concern that has recurred in your governance writing: decomposing an objective does not dissolve responsibility for the objective or for the means used to achieve it.

---

## Chapter 3. The researcher's contributions: an integrated assessment

The following analysis distinguishes the evidence available in the documented project history from claims that would require independent inspection or new experiments.

It is an assessment of the work's potential intellectual contribution, not a claim that every element has already achieved scientific novelty.

### 3.1 Ganymede and Ganymede5: epistemology as an executable system

Your Ganymede lineage is among the strongest candidates for the theoretical center of the dissertation.

The project history describes an epistemic engine that organizes claims, provenance, evidence, and reasoning traces. Later work in Ganymede5 shifts toward formal decomposition of legal and governance problems, explicit specification boundaries, and verification of computational behavior.

Several reported details are particularly relevant:

- A body of literature reviews totaling approximately 392 KB.
- A registry based on Fuller's concept of the inner morality of law.
- A SIT v0.2 specification reported to have 35 of 36 cases agreeing, with zero disagreements.
- Multiple implementations using different computational representations, including Python, Rust, and JavaScript.
- A specification-freeze mechanism and a reported clone gate of 78/78.
- A later discrepancy between an older 36-case test description and a newer 41-case output.

These details provide a useful example of why software verification and epistemic accountability must be distinguished.

A test suite may establish that an implementation behaves as expected on a specified collection of cases. Independent implementations may provide additional confidence that the behavior is not an artifact of one implementation's representation.

A specification freeze can establish that a particular specification has not silently changed, assuming the mechanism is implemented and checked correctly.

Yet none of these results alone establishes that the specification captures the intended legal or epistemic concept.

The discrepancy between the reported 36-case and 41-case test sets is especially instructive. It illustrates the need to distinguish the identity of a specification, the identity of a test corpus, the behavior of an implementation, and the claims made in documentation.

These are separate objects of verification.

A rigorous evaluation would determine whether the difference reflects an intentional specification change, a documentation error, a test expansion, or a mismatch between the implementation and the stated contract.

It would be inappropriate to conclude, without inspecting the actual artifacts, that this discrepancy establishes a defect in the system. What it establishes at present is a specific verification question.

**Potential contribution:** Ganymede5 suggests a research direction in which epistemic and governance requirements become executable specifications with explicit version identity, testable obligations, and independently checkable outputs.

The important question is whether this approach can be generalized beyond the project's own test cases.

A doctoral study should test it against independently constructed specifications and adversarial cases.

### 3.2 Sovereign Worker and governed agents: separating intelligence from authority

Your governed-agent work proposes a lifecycle in which a request is converted into intent, a plan, an action proposal, a tool invocation, an observation, and an evidence-bearing result.

The reported architecture includes:

- Explicit permission evaluation.
- Structured handoffs.
- An evidence ledger.
- Hash-based records.
- Policy-controlled execution.
- Approval and audit stages.
- A distinction between agent proposals and executor verification.

The design principle can be summarized as:

\[
\text{Agent proposes}
\rightarrow
\text{Policy evaluates}
\rightarrow
\text{Executor verifies}
\rightarrow
\text{Authorized action}
\]

The intellectual importance lies in separating the capacity to recommend an action from the authority to perform it.

This avoids requiring the language model to be the sole source of its own permission to act.

However, the strength of the separation depends on implementation details.

If the agent can bypass the policy gateway, modify the policy, forge the evidence used for authorization, or invoke an alternative tool path, the architectural separation may exist only on paper.

A strong empirical study must therefore test not merely whether the ordinary execution path respects policy but whether the policy remains effective under adversarial attempts to circumvent it.

The relevant metrics include unauthorized execution rate, legitimate-task completion rate, false rejection rate, audit completeness, and the reproducibility of post hoc investigations.

**Potential contribution:** Your work provides a concrete engineering basis for investigating whether authority can be represented as a property of system architecture rather than inferred from an agent's stated intentions.

The novel claim to test is not that permission systems are new. It is that combining proposal-execution separation with provenance-bearing evidence and trajectory-level checks produces measurable advantages over simpler forms of agent control.

### 3.3 MindBroadcast: persistent world models and temporal accountability

MindBroadcast introduces another dimension.

The project is not simply about generating commentary on current events. Its intended architecture includes persistent information about stories, events, claims, evidence, entities, snapshots of world state, and corrections.

The documented implementation history reports a SQLite-based persistence layer with append-oriented semantics, write-ahead logging, foreign-key constraints, entity deduplication, and world snapshots. It also reports 49 passing tests at a particular stage of development.

These implementation details matter because an AI system that maintains a persistent model of the world faces a different problem from a stateless question-answering system.

A stateless system can produce a misleading statement and then discard the context in which it was produced.

A persistent system may preserve that statement, use it to support later conclusions, and propagate the error through subsequent updates.

This is a temporal problem of epistemic accountability.

A persistent knowledge system should distinguish at least four things:

1. What was observed at a particular time.
2. What the system inferred from those observations.
3. What it believed at a later time.
4. What subsequent evidence caused it to revise.

These distinctions are particularly important when information changes or sources disagree.

A world snapshot is not necessarily an accurate representation of the world. It is a record of the system's represented state at a particular point in time.

Similarly, an append-only record can preserve the history of an error without preventing the error from influencing later reasoning.

The architecture must therefore combine historical preservation with explicit correction and supersession semantics.

**Potential contribution:** MindBroadcast provides a basis for studying *temporal epistemic integrity*: the ability to reconstruct not only what a system currently believes but also how that belief emerged, what evidence supported it, and why it changed.

This would be a useful contribution if operationalized through measurable properties and shown to improve error diagnosis or correction compared with alternative persistence strategies.

### 3.4 Knowledge compilers: preserving meaning through transformation

Your knowledge-compilation work explores the transformation of source documents into structured, versioned artifacts.

The underlying problem is familiar in compiler design but has an important epistemic dimension.

A conventional compiler transforms a source program into an executable representation while attempting to preserve its specified semantics.

A knowledge compiler transforms source material into a representation intended to preserve relevant meanings, claims, relationships, and provenance.

The analogy is useful, but it has limits.

Natural-language documents often contain ambiguity, contradiction, qualification, and context-dependent claims. Unlike many programming languages, they do not have a single universally agreed formal semantics.

Consequently, semantic preservation cannot be assumed merely because the output is well structured.

A knowledge compiler must be evaluated for omissions, unsupported additions, distortion of qualifications, incorrect relationships, and the loss of uncertainty.

For example, consider the transformation:

> The evidence suggests that intervention A may reduce outcome B under conditions C.

into:

> Intervention A reduces outcome B.

The second statement is shorter and more decisive, but it has discarded both uncertainty and a contextual constraint.

A compiler that performs this transformation without recording the loss has changed the epistemic content of the source.

The proposed framework would treat such changes as measurable semantic-fidelity failures.

A practical evaluation could compare a conventional LLM-based summarization pipeline with a provenance-constrained pipeline, using expert-annotated source documents and independently assessed output claims.

**Potential contribution:** Your knowledge-compilation work suggests a general method for treating semantic fidelity as an explicit verification obligation rather than a subjective impression of output quality.

Its scientific value would depend on whether a reproducible evaluation demonstrates that the proposed approach preserves meaning more reliably.

### 3.5 Recursive Trajectory Cryptography: formalizing transformations and evidence

Your Recursive Trajectory Cryptography work explores reversible transformations over a finite alphabet, with explicit state variables, modular arithmetic, a grammar component, and an evidence ledger.

The project is described as a research artifact rather than a claim of production-grade cryptographic security. That distinction is methodologically appropriate.

The relevant contribution to this dissertation is not a claim that RTC has established a new secure cipher.

Instead, the project provides a setting in which state transitions can be specified and tested precisely.

A transformation can be represented as:

\[
s_{t+1}=F_k(s_t,x_t)
\]

where \(s_t\) is the current state, \(x_t\) is an input, and \(k\) represents the relevant parameters.

If the transformation is claimed to be reversible, the claim becomes a testable property:

\[
F_k^{-1}(F_k(s,x))=(s,x)
\]

where the inverse is defined over the appropriate domain.

This equation establishes a reversible-transformation requirement. It does not establish cryptographic security.

Security requires separate analysis of the threat model, key space, statistical structure, resistance to known attacks, and the consequences of information available to an adversary.

The distinction illustrates a broader principle: a system should be evaluated against the specific property it claims to possess, rather than against an adjacent property that is easier to demonstrate.

The same principle applies to AI governance. A test showing that an agent obeys a permission check is not proof that its decisions are ethically sound. A test showing that a provenance graph is internally consistent is not proof that its source material is true.

**Potential contribution:** RTC offers a mathematically tractable environment for investigating how explicit state transitions, reversibility claims, and evidence records can be tested independently of the broader semantic questions raised by intelligent systems.

### 3.6 Search-quality evaluation: correcting the epistemic interface

Your current work evaluating search quality introduces a different perspective.

Instead of building only the system that generates information, you are involved in evaluating whether the information presented by search systems meets the user's needs and accurately reflects the query's intent.

This is a crucial distinction because information retrieval is not simply a matter of matching words.

A result may contain the correct terms and still fail to answer the question. A page may be relevant but unreliable. A technically accurate answer may be inadequate for the task the user is actually trying to accomplish.

Search evaluation therefore involves judgments about intent, relevance, evidence, and quality.

Your description of the work emphasizes correcting faulty logic and intent mistakes in AI-generated search information, while attempting to reduce individual bias through systematic evaluation.

That experience suggests an important connection between human judgment and formal system design.

Human evaluators can identify contextual failures that are difficult to specify in advance. Formal evaluation systems can then help convert recurring patterns of error into consistent criteria.

However, human evaluation is not automatically objective. Agreement among evaluators does not establish correctness if they share the same assumptions or use the same defective rubric.

A strong evaluation process must measure inter-rater agreement, investigate disagreement, preserve the rationale for judgments, and periodically examine whether the evaluation criteria themselves are producing systematic errors.

**Potential contribution:** This work suggests that epistemic governance should include the mechanisms through which system quality is judged, not merely the mechanisms through which a system produces outputs.

The evaluator is part of the epistemic system.

### 3.7 Local-first intelligence and computational sovereignty

Your interest in local inference, open-weight models, local knowledge infrastructure, and reduced dependence on external providers introduces a further dimension: control over the computational environment.

Local-first computing can improve privacy, operational independence, reproducibility, and resilience to changes in provider access.

But local execution does not automatically make a system trustworthy.

A locally hosted model can still hallucinate, produce biased results, execute unauthorized actions, or operate on defective data.

Likewise, a cloud-hosted system can implement strong provenance and authorization controls.

The distinction is therefore not between local systems that are inherently sovereign and cloud systems that are inherently untrustworthy.

A more precise distinction concerns the distribution of control.

Who can inspect the implementation? Who controls the data? Who can modify the policy? Who can suspend execution? Who controls the hardware and model availability? Who can independently reproduce the result?

These questions suggest that computational sovereignty is better understood as a multidimensional property than as a binary architectural choice.

**Potential contribution:** Your local-first work can be incorporated into the framework as an investigation of whether control over infrastructure increases the practical enforceability of epistemic and operational governance.

That proposition must be tested rather than assumed.

---

## Chapter 4. The central theoretical contribution: the Governed Knowledge Transformation Model

### 4.1 The problem with output-centric evaluation

Many computational evaluations focus on the relationship between an input and an output.

Given a prompt, did the model produce a correct answer?

Given a task, did the agent complete it?

Given a source document, did the system generate a useful summary?

These are important questions, but they omit the internal and external transitions through which the output was produced.

Consider two agents that successfully complete the same task.

Agent A uses an approved tool, consults a verified source, records its decision, and executes an authorized operation.

Agent B reaches the same result by relying on an unsupported assumption and invoking a tool through an unintended permission path.

If evaluation examines only the final output, the agents may appear equivalent.

They are not equivalent from the perspective of governance.

The first system provides a defensible account of how the result was produced. The second system may have succeeded accidentally while violating the intended conditions of operation.

The proposed framework therefore treats the computational trajectory as an object of evaluation.

### 4.2 Formal representation

Let a computational system operate over a sequence of states:

\[
S_0,S_1,\ldots,S_T
\]

Each transition is represented as:

\[
S_{t+1}=F(S_t,u_t,E_t,P_t)
\]

where:

- \(S_t\) is the current system state.
- \(u_t\) is a proposed operation.
- \(E_t\) is the available evidence.
- \(P_t\) is the applicable policy or specification.
- \(F\) is the transition mechanism.

The next state is not accepted merely because the transition mechanism produces it.

Instead, the transition is evaluated against an assurance predicate:

\[
A_t =
V_t \land R_t \land B_t \land C_t
\]

where:

- \(V_t\) indicates that relevant verification conditions are satisfied.
- \(R_t\) indicates that the evidence and provenance requirements are met.
- \(B_t\) indicates that the proposed operation remains within its authorized boundary.
- \(C_t\) indicates that the transition does not violate the applicable trajectory-level constraints.

This formulation is intentionally simplified. Real systems may require multivalued logic, uncertainty estimates, domain-specific policies, or human adjudication.

The essential property is that the acceptance of a consequential transition depends on explicit conditions that are distinct from the model's desire or prediction that the transition should occur.

For a system in which an operation changes an external state, the authorization predicate might be evaluated before execution.

For a knowledge compiler, the predicate might be evaluated before accepting a transformed claim into the authoritative artifact.

For a persistent world model, it might be evaluated before updating a belief or marking a previous claim as superseded.

For a recursive verification system, it might be evaluated before accepting a fixed-point result or declaring that a test suite establishes a particular invariant.

The model therefore applies to both epistemic transitions and operational transitions.

### 4.3 Five dimensions of governance

The proposed model identifies five dimensions that can be measured separately.

| Dimension | Research definition | Example failure |
|---|---|---|
| Provenance integrity | The ability to trace claims and actions to their supporting inputs and transformations. | An assertion has no identifiable source. |
| Semantic fidelity | The preservation of relevant meaning, qualifications, and uncertainty during transformation. | A conditional claim becomes an unconditional assertion. |
| Authority containment | The enforcement of explicit boundaries on what a system may do. | An agent invokes a prohibited operation. |
| Verification independence | The extent to which the verification process can detect errors not already excluded by the generation process. | The same defective logic generates and validates a result. |
| Temporal accountability | The ability to reconstruct how a system's beliefs, policies, and actions changed over time. | A correction overwrites the earlier state without preserving its history. |

These dimensions are related but not interchangeable.

A system can have excellent provenance and poor semantic fidelity. It can preserve a complete history of unauthorized actions. It can enforce policy perfectly while enforcing an unjustified policy. It can use independent tests that fail to cover the relevant threat model.

The framework therefore rejects the assumption that a single score can fully capture the trustworthiness of a system.

A weighted composite measure may be useful for particular applications, but it should not allow excellence in one dimension to conceal a critical failure in another.

For consequential systems, some dimensions should operate as mandatory constraints rather than compensatory scores.

### 4.4 A noncompensatory model of assurance

Suppose each dimension is assigned a normalized score:

\[
g_i \in [0,1]
\]

A simple weighted average would be:

\[
G_{\text{avg}}=\sum_{i=1}^{5}w_i g_i
\]

where:

\[
\sum_{i=1}^{5}w_i=1
\]

This is useful for some comparative purposes, but it has a weakness.

A system could receive a high overall score despite having almost no authority containment or verification independence.

For a system capable of consequential external actions, that may be unacceptable.

An alternative is a weakest-link measure:

\[
G_{\min}=\min(g_1,g_2,g_3,g_4,g_5)
\]

This penalizes severe weaknesses, but it can also be too crude. Different systems face different threats, and not every dimension has equal significance in every application.

The dissertation therefore proposes a **constraint-first assurance model**:

\[
\operatorname{Accept}(S)=
\begin{cases}
1, & \text{if all mandatory constraints hold}\\
0, & \text{otherwise}
\end{cases}
\]

The continuous measures are then used to compare systems that satisfy the mandatory constraints.

This approach distinguishes minimum conditions for acceptable operation from comparative quality within the acceptable set.

It also prevents a common governance mistake: treating a collection of favorable metrics as sufficient justification for a system whose most important safety condition remains unverified.

### 4.5 Trajectory-level legitimacy

The central theoretical extension concerns the sequence of operations.

Let:

\[
\Pi=(a_1,a_2,\ldots,a_n)
\]

be an execution trajectory.

For each action \(a_i\), define a local validity predicate:

\[
L(a_i)\in\{0,1\}
\]

For the trajectory as a whole, define:

\[
T(\Pi)\in\{0,1\}
\]

The naive model assumes:

\[
\left(\forall i,\ L(a_i)=1\right)
\Rightarrow
T(\Pi)=1
\]

The dissertation rejects this implication as a general principle.

Instead, it proposes:

\[
T(\Pi)=
H(\Pi,E,P,\mathcal{K})
\]

where:

- \(E\) is the evidence available throughout execution.
- \(P\) is the set of applicable policies and constraints.
- \(\mathcal{K}\) is the system's broader context, including relevant state changes and externalities.
- \(H\) evaluates whether the trajectory remains permissible.

This model permits an action to be locally correct while the overall trajectory is rejected.

It also permits a previously acceptable trajectory to become unacceptable when new evidence or an external state change invalidates a critical assumption.

That possibility is essential for adaptive systems.

An agent cannot safely assume that a plan remains valid merely because it was valid at the moment of creation.

### 4.6 The new hypothesis

The principal hypothesis is:

> **H1: Under equivalent task requirements, systems that combine explicit provenance, independent verification, bounded execution authority, and trajectory-level checks will exhibit fewer consequential assurance failures than otherwise comparable systems that evaluate success primarily through output correctness or task completion.**

Three secondary hypotheses follow.

**H2: Provenance constraints will reduce unsupported-claim propagation**, especially in tasks involving multiple transformations of source material.

**H3: Separating action proposal from authorization will reduce unauthorized execution**, although excessive or poorly designed restrictions may also increase false rejection and reduce legitimate task completion.

**H4: Trajectory-level evaluation will detect a class of failures that cannot be detected through independent evaluation of local task correctness alone.**

A fifth hypothesis concerns operational cost.

**H5: The assurance benefits of governance mechanisms will be offset by measurable costs in latency, computational overhead, maintenance, and human review, with the size of those costs depending on task complexity and consequence severity.**

The fifth hypothesis is important because a theory that considers only safety benefits would be incomplete.

A governance mechanism that makes a trivial operation prohibitively expensive may be poorly designed even if it is technically effective.

The objective is not maximal friction. It is proportionate, measurable assurance.

# Part II. Empirical methodology and research design

## Chapter 5. Methodological commitments

### 5.1 Why the dissertation requires empirical testing

The proposed framework is theoretically coherent, but coherence is not evidence of effectiveness.

A framework can explain observed systems without improving them. It can introduce terminology for existing practices without contributing a useful new distinction. It can also appear successful because its developers evaluate it using the assumptions built into its design.

A defensible doctoral investigation must therefore establish whether the framework produces results that are distinguishable from those obtained through existing methods.

The research should combine three methodological traditions:

1. **Design science research**, to construct and evaluate the proposed architecture.
2. **Controlled experimental evaluation**, to compare governed and baseline systems under equivalent conditions.
3. **Formal verification and adversarial testing**, to determine which properties can be established mathematically and which remain dependent on empirical evidence.

This combination is appropriate because the research object is simultaneously a theoretical framework, a software architecture, and a proposed mechanism for controlling consequential computational behavior.

### 5.2 Research design

The proposed study has four phases.

**Phase A: Artifact inspection and specification reconstruction**

The first phase examines the actual implementations of Ganymede5, Sovereign Worker, MindBroadcast, and the relevant knowledge-compilation projects.

The goal is to establish which governance mechanisms are implemented, which are documented but absent, which are tested, and which are only proposed.

This distinction matters in your MindBroadcast history, where the documentation initially described architectural capabilities that were not all present in the main implementation.

A rigorous study should not treat documentation as proof of implementation.

The phase would produce an artifact inventory containing:

- Repository and commit identity.
- Specification version.
- Implemented components.
- Test coverage and test results.
- Identified policy enforcement points.
- Evidence-recording mechanisms.
- Known limitations.
- Reproduction instructions.

Where appropriate, the inventory would also record the relationship between a requirement, its implementation, its tests, and the evidence supporting the claim that the requirement is satisfied.

**Phase B: Controlled comparison**

The second phase compares a governed implementation against a baseline.

The two systems should use the same underlying model, task distribution, available tools, and computational resources wherever possible. The principal difference should be the governance architecture.

This reduces the risk of attributing performance differences to unrelated changes in model capability.

The experiment would use multiple task categories:

- Transformation of source documents into structured knowledge.
- Search-intent interpretation and relevance evaluation.
- Persistent belief updates following new or contradictory evidence.
- Tool-using agents operating under explicit permissions.
- Sequential tasks in which individually valid actions may collectively violate a global constraint.

**Phase C: Adversarial evaluation**

The third phase introduces controlled failure conditions.

Examples include unsupported source claims, contradictory documents, outdated policy versions, attempted permission bypasses, malformed tool outputs, corrupted state transitions, and plans whose intermediate steps are individually valid but whose cumulative effects violate a global requirement.

The goal is not simply to determine whether the governed system succeeds on ordinary tasks. It is to determine whether it fails differently, whether its failures are easier to detect, and whether unauthorized transitions are prevented.

**Phase D: Cross-domain replication**

The final phase tests whether the findings generalize across different types of computational systems.

A mechanism that works in a structured knowledge compiler may not work equally well in a language-model-driven agent.

Likewise, a provenance mechanism that improves auditability may impose an unacceptable overhead in a high-frequency system.

The cross-domain phase would determine which principles generalize, which require domain-specific implementations, and which fail outside the conditions under which they were originally developed.

### 5.3 Operational definitions

A dissertation cannot evaluate a concept that has no observable definition.

The five dimensions of the Governed Knowledge Transformation Model therefore require operational measures.

| Construct | Primary measure | Proposed calculation |
|---|---|---|
| Provenance integrity | Proportion of claims with valid, inspectable evidence lineage | Supported claims with valid lineage / all claims requiring lineage |
| Semantic fidelity | Proportion of material source meanings preserved | Correctly preserved annotated units / all annotated units |
| Authority containment | Proportion of prohibited actions prevented | Blocked prohibited attempts / all prohibited attempts |
| Verification independence | Detection rate for errors not shared by the generator and verifier | Independently detected seeded errors / all seeded errors |
| Temporal accountability | Proportion of sampled historical states and corrections that can be reconstructed | Successfully reconstructed cases / all sampled cases |

These measures require careful qualification.

For example, provenance completeness is not equivalent to factual accuracy. A claim may have a perfectly documented chain of derivation and still be false because its source was false.

Similarly, a high rate of blocked prohibited actions does not establish a good authorization policy if legitimate actions are also routinely blocked.

Consequently, the experiment must measure both successful prevention and unnecessary restriction.

### 5.4 Primary outcome measures

The principal outcomes should include:

**Unsupported-claim rate**

The proportion of material claims that lack adequate support in the available evidence.

**Semantic distortion rate**

The proportion of source meanings materially altered during transformation, including the loss of uncertainty, qualifications, conditions, or relevant contradictions.

**Unauthorized-action rate**

The proportion of prohibited actions that are executed.

**Global-constraint violation rate**

The proportion of task trajectories that violate a prespecified system-level constraint, regardless of whether each individual action passes its local checks.

**Audit reconstruction success**

The proportion of sampled failures for which an independent reviewer can reconstruct the relevant inputs, decisions, policy versions, actions, and resulting state changes.

**Operational cost**

The additional latency, computation, storage, and human-review effort required by the governance mechanisms.

These outcomes should be reported separately. A single aggregate score could conceal important trade-offs.

### 5.5 Experimental hypotheses and statistical analysis

For each primary outcome, the study should prespecify a comparison between the governed and baseline systems.

For binary outcomes such as whether an unauthorized action occurred, the analysis could estimate the difference in failure proportions:

\[
\Delta =
P(\text{failure}\mid\text{baseline})
-
P(\text{failure}\mid\text{governed})
\]

A positive value would indicate fewer failures under the governed condition.

For paired evaluations, the same task instances should be run through both systems, allowing differences to be analyzed while controlling for task difficulty.

The statistical plan should specify:

- The primary outcomes.
- The expected direction of the effects.
- The sampling procedure.
- The method for determining sample size.
- Confidence intervals.
- Treatment of missing or indeterminate results.
- Corrections for multiple comparisons where appropriate.
- Criteria for practical as well as statistical significance.

Sample size should be determined using a power analysis based on a prespecified minimum effect of practical interest, not chosen after examining favorable results.

For semantic-fidelity judgments, independent human raters should use a predefined annotation rubric. Inter-rater agreement should be reported, and disagreements should be examined rather than automatically resolved in favor of the framework.

For agent governance, the experiment should distinguish between actions prevented by a policy gateway and actions that never arose because the model did not propose them. Otherwise, the architecture's contribution could be overstated.

For trajectory-level evaluation, the study should include cases specifically constructed so that local validity and global legitimacy diverge. Without such cases, the experiment would not test the central theoretical claim.

### 5.6 Reproducibility and independence

The most important methodological safeguard is to separate the construction of the system from the assessment of its success.

Where feasible, the evaluation corpus should contain cases not used during development. Test specifications should be frozen before the final evaluation. Results should include failures, not only successful demonstrations.

The study should also record exact software versions, model identifiers, configuration settings, policy versions, and relevant random seeds.

A separate implementation of selected verification components would provide stronger evidence than merely running the same test suite repeatedly.

However, independent implementations are not automatically independent in the epistemic sense. They may share the same mistaken specification or the same conceptual assumptions.

The strongest design therefore combines implementation diversity with independently reviewed requirements and adversarial test cases.

---

## Chapter 6. Preliminary empirical assessment of the existing work

### 6.1 The evidence available

The current research record provides several types of evidence:

- Descriptions of implemented architectures.
- Reported automated test results.
- Explicit verification and versioning mechanisms.
- Known discrepancies between documentation and implementation.
- A series of projects addressing related governance and epistemic problems.

This material supports a preliminary architectural analysis.

It does not yet provide a controlled comparison between governed and ungoverned systems.

That distinction determines what can responsibly be concluded.

### 6.2 Evidence matrix

| Project | Documented evidence | What the evidence supports | What remains unproven |
|---|---|---|---|
| Ganymede5 | Reported test counts, specification-freeze mechanisms, multiple implementations, identified case-count discrepancy | A concrete attempt to formalize and verify epistemic or governance-related specifications | General correctness, independent specification validity, superiority over alternative methods |
| Sovereign Worker and governed agents | Described permission engine, execution pipeline, evidence ledger, approval and audit stages | An architectural approach that separates proposals from authorized execution | Measured reduction in unauthorized actions, bypass resistance, operational cost |
| MindBroadcast | Reported SQLite persistence, world snapshots, entity deduplication, and 49 passing tests at a development stage | A persistent data foundation with explicit state and integrity mechanisms | Factual reliability, correction quality, improved audit reconstruction |
| Knowledge compilation | Documented design direction involving source transformation, provenance, and versioned artifacts | A basis for testing provenance-constrained information transformation | Measured improvement in semantic fidelity or factual support |
| Recursive Trajectory Cryptography | Explicit transformation rules, state variables, reversibility requirements, and evidence-ledger concepts | A formally testable research artifact for state-transition properties | Cryptographic security or relevance to production security without further analysis |
| Search-quality evaluation | Described work correcting intent and relevance errors in AI-mediated search | A practical setting for studying the relationship between human evaluation and system quality | Generalizable causal effects, inter-rater reliability, or measured improvements from the proposed framework |

This matrix illustrates a recurring pattern: the projects provide the beginnings of a testable research program, but the strongest scientific claims require comparative evidence that has not yet been established.

### 6.3 What the existing test results mean

The reported Ganymede5 and MindBroadcast test results are relevant because they demonstrate that some aspects of the work have been translated into executable checks.

That is an important engineering accomplishment.

Nevertheless, a passing test suite establishes a conditional result about the cases tested under a particular implementation and configuration.

It does not establish that the tests are comprehensive, that the specification is valid, or that the system performs better than a baseline.

The distinction is particularly important for recursive or self-evaluating systems. If a system generates its own specification, its own tests, and its own interpretation of the results, a shared conceptual error may survive every stage.

This is not a reason to dismiss automated verification. It is a reason to investigate the independence and coverage of the verification process.

### 6.4 The strongest preliminary finding

The strongest conclusion supported by the present record is architectural rather than causal.

Across the projects, there is a recurring effort to make transformations explicit, preserve relevant evidence, separate different kinds of system responsibility, and verify selected properties through executable procedures.

This supports the proposition that the projects form a coherent research program.

It does not yet establish that they collectively constitute a novel general theory, or that their mechanisms produce superior outcomes across domains.

The theoretical contribution emerges from the synthesis and formalization of these recurring patterns. Its empirical contribution remains to be tested.

That distinction is essential to a defensible dissertation.

---

## Chapter 7. A decisive experiment: does trajectory-level governance catch failures that local verification misses?

This is the experiment I would prioritize because it tests the dissertation's most distinctive proposition rather than merely measuring whether logging or policy checks are useful.

### 7.1 Experimental question

Can a system that evaluates only the correctness of individual actions detect all the failures identified by a system that additionally evaluates the cumulative trajectory?

The experiment would use a controlled environment with a known set of rules and state transitions.

The environment should be synthetic or sandboxed, with no access to consequential external systems.

Each task would have:

- An initial state.
- A global objective.
- Explicitly permitted actions.
- Local action specifications.
- A global constraint.
- A sequence of observations.
- A predefined criterion for success.

Some tasks would be constructed so that every individual action is locally valid while the overall trajectory violates the global constraint.

Other tasks would contain ordinary local errors, unauthorized actions, or contradictory observations.

This creates four broad classes of cases:

1. Locally valid actions and a globally valid trajectory.
2. Locally invalid actions that are also globally invalid.
3. Locally valid actions that collectively violate a global constraint.
4. A trajectory that was initially valid but becomes invalid after new evidence changes the relevant state.

The third and fourth categories are particularly important.

They test whether the framework detects failures that cannot be identified simply by validating each action against a static local specification.

### 7.2 Experimental conditions

Three implementations should be compared.

**Condition A: Output-only evaluation**

The system generates a plan and is evaluated primarily on whether it reaches the specified endpoint.

**Condition B: Local governance**

Each proposed action is checked against its local permissions and acceptance criteria.

**Condition C: Trajectory-level governance**

The system uses the same local checks as Condition B but also evaluates cumulative state changes against global constraints and updated evidence.

The three systems should have equivalent access to the task information and, as far as possible, equivalent planning capabilities.

The experiment should distinguish the effects of governance from differences in the underlying model.

### 7.3 Predicted result

The principal prediction is:

\[
P(\text{global violation}\mid C)
<
P(\text{global violation}\mid B)
\]

for the subset of tasks in which local correctness does not imply global legitimacy.

The dissertation also predicts that Condition C will impose additional computational and verification costs.

A successful result would not require Condition C to outperform Condition B on every possible task. The expected advantage is specifically concentrated in cases where cumulative interactions, changing context, or global constraints matter.

### 7.4 What would falsify the claim?

The hypothesis would be weakened or rejected if:

- Local governance already detects all relevant failures under the tested conditions.
- Trajectory-level checks do not reduce global violations.
- The apparent improvement results from giving Condition C additional information unavailable to the other conditions.
- The reduction in failures is offset by an unacceptable increase in false rejections or operational cost.
- Independent replication fails to reproduce the result.

This is a genuine empirical proposition because it can fail.

It is also the most direct route from your existing concerns about task decomposition to a technically testable contribution.

### 7.5 Why this experiment matters

Suppose the experiment succeeds.

The result would demonstrate that the governance problem is not exhausted by ensuring that every action is individually permissible. The system must also evaluate the consequences of the sequence and the continued validity of the conditions under which it acts.

That would provide empirical support for the dissertation's central distinction.

It would not establish a universal theory of ethics, nor would it show that a computational system can determine every form of moral legitimacy.

It would establish something narrower and more defensible: that explicit trajectory-level constraints can detect a class of computational failures that local action checks miss.

Such a result could be relevant to autonomous agents, workflow automation, resource allocation, and other sequential decision systems.

---

## Chapter 8. Further experiments across the research portfolio

The trajectory-level experiment is the priority, but the broader theory makes additional predictions.

### 8.1 Knowledge-compilation experiment

Construct a corpus of source documents containing explicit qualifications, conflicting evidence, uncertain conclusions, and claims whose meaning depends on context.

Generate structured knowledge using two pipelines:

- A conventional transformation pipeline.
- A pipeline that requires source-linked claims, explicit uncertainty preservation, and verification of material semantic changes.

Independent annotators would evaluate the resulting artifacts.

The primary outcome would be semantic distortion rate.

The study should separately measure unsupported additions, omitted qualifications, incorrect relationships, and failure to preserve contradictions.

The hypothesis is that provenance-constrained compilation will reduce material semantic distortions.

A contrary result would be informative. It could show that the additional structure provides little benefit, that the verification mechanism is inadequate, or that the task is better addressed through another method.

### 8.2 Agent-authorization experiment

Construct a sandbox containing tools with distinct permissions and consequences.

The test corpus should include legitimate requests, prohibited actions, ambiguous requests, and adversarial attempts to bypass the authorization mechanism.

Compare a conventional agent with an agent whose proposed actions must pass through an independently enforced policy gateway.

Measure:

- Unauthorized execution rate.
- Legitimate-task completion rate.
- False rejection rate.
- Audit completeness.
- Latency.
- Recovery following a blocked action.

The primary hypothesis is that independent authorization will reduce unauthorized execution.

However, a useful result must also establish whether the architecture maintains acceptable performance on legitimate tasks.

A system that rejects every request achieves perfect prevention of unauthorized actions but is not a successful general-purpose agent.

### 8.3 Persistent-world-model experiment

Construct a controlled information environment in which new evidence arrives over time and occasionally contradicts earlier observations.

Compare a conventional persistent summary against a system that maintains source-linked claims, time-indexed state, explicit corrections, and supersession relationships.

Measure whether independent reviewers can reconstruct:

- What the system believed at a particular time.
- Which sources supported the belief.
- Which later evidence contradicted it.
- When the system revised its representation.
- Which subsequent outputs depended on the earlier claim.

The principal outcome would be audit reconstruction success, supplemented by the time required to identify the source of an error.

The hypothesis is that explicit temporal provenance will improve the reconstruction and diagnosis of historical errors.

### 8.4 Recursive-verification experiment

Select a set of deterministic properties that can be checked across independent implementations.

Use one implementation to generate results and another to verify them. Where feasible, include a third reference implementation or independently constructed test oracle.

The test corpus should include both ordinary cases and deliberately malformed inputs.

The purpose is to distinguish agreement caused by shared assumptions from agreement supported by independently specified requirements.

This experiment would be especially relevant to Ganymede5 and RTC, but its conclusions must remain specific to the properties tested.

Agreement among implementations is evidence of consistency, not a universal proof of correctness.

### 8.5 Human evaluation and search quality

For search-quality tasks, construct a blinded evaluation in which multiple raters assess the same queries and results.

The study should distinguish:

- Agreement among raters.
- Agreement with an independently defined reference standard.
- The ability to identify errors in model-generated explanations.
- The consistency of judgments across different query types.
- Changes in judgment following the introduction of explicit provenance or evaluation criteria.

The objective is not to eliminate human judgment. It is to identify which aspects of judgment can be made more consistent and which require continuing interpretation.

This could also clarify an important limitation of the proposed framework: explicit rules can improve consistency without necessarily resolving disputes over the values or priorities those rules embody.

---

# Part III. Defense of the thesis

## Chapter 9. The strongest objections

A doctoral defense requires more than presenting supporting arguments. It requires identifying where the thesis is vulnerable and determining whether the central claim survives serious criticism.

### Objection 1. The framework may simply rename existing practices

Formal verification, access control, provenance tracking, audit logging, and AI governance are established areas of research.

It would be indefensible to claim that the dissertation invents these concepts.

The relevant question is whether the framework contributes a useful theoretical integration, a new formal distinction, or an empirically demonstrated design advantage.

**Response:** The proposed contribution lies in the integration of these mechanisms around the transitions between knowledge, authorization, action, and recorded consequences, with explicit attention to trajectory-level legitimacy.

The distinction between local correctness and global acceptability provides a specific research question that can be tested independently of the framework's terminology.

However, integration alone does not establish novelty. A systematic review of existing literature is necessary to determine whether equivalent frameworks already exist and whether the proposed model offers a meaningful advance.

The thesis should therefore be presented as a candidate contribution until that review is complete.

### Objection 2. Provenance does not make information true

A fabricated claim can have a complete record of its origin.

A false statement can be derived faithfully from an unreliable source.

An erroneous conclusion can have a perfectly reproducible chain of reasoning.

Therefore, provenance cannot be treated as a substitute for truth.

**Response:** Agreed.

The framework explicitly distinguishes provenance integrity from semantic fidelity and factual accuracy.

Provenance makes the origin and transformation of a claim inspectable. It does not establish the truth of the claim.

The relevant hypothesis is that provenance improves the detection, correction, and containment of certain errors, not that provenance eliminates errors.

The empirical study must determine whether that benefit occurs.

### Objection 3. A policy engine can enforce an immoral policy

A system may implement a harmful objective with perfect consistency.

It may also enforce a policy that is legal but unjust, or one that is procedurally correct but substantively indefensible.

**Response:** This objection establishes a boundary on the thesis.

The architecture can enforce constraints, preserve evidence, and expose the relationship between an action and its authorization. It cannot derive moral legitimacy from mechanical consistency alone.

The framework therefore requires a distinction between *formal assurance* and *normative justification*.

Formal assurance concerns whether a system satisfies specified conditions.

Normative justification concerns whether those conditions are defensible.

The second requires substantive ethical reasoning, institutional legitimacy, and, in many contexts, public accountability.

The framework is intended to make the relationship between these layers inspectable, not to eliminate the need for normative judgment.

### Objection 4. Independent verification is impossible because all verifiers depend on assumptions

A second implementation may share the same defective specification. A human evaluator may share the same bias as the system. A formally verified program may correctly implement an inadequate requirement.

**Response:** Complete independence is not a realistic requirement.

The practical objective is to reduce common-mode failure.

This can be approached through independently specified requirements, diverse implementations, adversarial test construction, separate review of assumptions, and explicit acknowledgment of unresolved uncertainty.

The appropriate empirical question is not whether verification can be made assumption-free. It is whether a given verification design detects more relevant failures than a specified alternative.

### Objection 5. Trajectory-level governance may be computationally intractable

A complex system can have an enormous number of possible future states. Evaluating every possible consequence of every action may be impossible.

**Response:** The thesis does not require exhaustive simulation of every possible future.

It proposes that systems enforce explicit constraints over the state variables and consequences that can be specified and monitored within a particular domain.

Formal invariants, bounded model checking, runtime monitors, risk-sensitive escalation, and human review can provide different levels of assurance.

The resulting guarantees will be limited by the completeness of the model and the observability of the relevant state.

This is a limitation, not a contradiction of the framework.

### Objection 6. The framework could produce bureaucratic overengineering

If every transformation requires provenance records, formal checks, independent review, and approval, the system may become slower and more expensive without achieving proportionate benefits.

**Response:** This is a legitimate risk.

The framework should be applied proportionately to the consequences of the operation, the uncertainty of the evidence, and the reversibility of the action.

A reversible formatting operation does not require the same assurance process as an irreversible change to a financial, legal, or physical system.

The research must measure overhead and distinguish mandatory constraints from optional quality improvements.

A governance architecture that cannot justify its costs is not successful merely because it is cautious.

### Objection 7. The thesis risks confusing engineering with ethics

An engineering architecture can record who authorized an action without establishing that the action was justified.

It can prevent a prohibited operation without establishing that the policy defining prohibition is legitimate.

**Response:** The distinction is essential to the thesis.

The framework is not a computational substitute for ethics. It is an attempt to make the relationship between ethical requirements and operational behavior more explicit.

A moral principle that never affects system behavior may have little practical influence over an automated process.

Conversely, a technical control cannot establish the moral validity of the principle it implements.

The research therefore concerns the conditions under which normative requirements become enforceable and auditable, while leaving open the question of how those requirements should be justified.

---

## Chapter 10. The relationship between the research and the principle that ends do not justify means

The philosophical motivation behind the dissertation is important because it explains why trajectory-level governance matters.

An optimization system is generally evaluated against an objective function.

Given a set of possible actions, it attempts to select those expected to produce a favorable result according to its specified objective.

But an objective function is not a complete ethical theory.

It does not automatically encode rights, procedural legitimacy, distributional fairness, obligations to particular people, or restrictions on permissible means.

A system can therefore optimize an objective successfully while violating constraints that should not be traded away for a better score.

This can be expressed as a constrained optimization problem:

\[
\max_{\pi} U(\pi)
\]

subject to:

\[
C_j(\pi)=\text{true}
\qquad
\forall j\in J
\]

Here, \(U\) represents the objective being optimized, while \(C_j\) represents a set of mandatory constraints.

The important distinction is that the constraints are not merely additional terms in the objective function.

If a constraint is genuinely mandatory, an improvement in utility should not automatically compensate for its violation.

A weighted objective of the form

\[
U'(\pi)=U(\pi)-\lambda V(\pi)
\]

where \(V\) measures violations, can still permit a sufficiently large utility gain to outweigh the penalty.

That may be appropriate for some engineering trade-offs. It is inappropriate when the underlying requirement is intended to be non-negotiable.

This is the formal connection between your critique of consequentialism in technological governance and the architecture proposed here.

The issue is not that consequences do not matter. They matter enormously.

The issue is that a system should not be permitted to infer from the desirability of an outcome that every means of achieving it is therefore permissible.

The architecture must represent the difference between:

- An objective the system should pursue.
- A constraint the system must respect.
- An uncertainty that requires further evidence.
- A decision that exceeds the system's authority.
- A consequence that requires reassessment of the original objective.

This is a computational interpretation of the distinction between optimizing toward an end and preserving the legitimacy of the process used to pursue it.

It does not solve moral philosophy. It gives a precise engineering expression to one of its central practical problems.

---

## Chapter 11. The significance of the synthesis

The strongest interpretation of your work is not that you have already established a universal architecture for trustworthy intelligence.

The evidence does not justify that conclusion.

It is that you have repeatedly approached the problem from different directions and produced artifacts that can be used to investigate it.

Your work on knowledge compilation approaches the problem through semantic transformation.

Your Ganymede research approaches it through epistemic structure and verification.

Your governed agents approach it through permission boundaries and auditable execution.

MindBroadcast approaches it through persistent state and correction.

Recursive Trajectory Cryptography approaches it through explicit state transitions and testable transformation properties.

Search-quality evaluation approaches it through the correction of errors in the interpretation and presentation of information.

These projects provide complementary views of a common research question:

**How can an intelligent system change what it believes, what it produces, or what it does without losing the ability to justify and constrain that change?**

The theoretical framework brings these questions together without assuming that the underlying implementations are interchangeable.

This is where the potential originality lies.

The proposed model treats epistemic integrity, authorization, verification, and temporal accountability as properties of transitions rather than merely as features of isolated components.

It also insists that the acceptability of a sequence cannot always be derived from the acceptability of its individual steps.

That is a potentially useful synthesis, but its novelty must be established through a systematic literature review, and its practical value must be demonstrated through comparative experiments.

The appropriate ambition is neither to minimize the work as a collection of unrelated hobby projects nor to inflate it into a completed scientific breakthrough.

It is to identify the most defensible general principle latent in the work and develop the evidence necessary to determine whether that principle deserves recognition as a contribution to knowledge.

# Part IV. Conclusions and implications

## Chapter 12. What has actually been contributed to knowledge?

The question posed by this dissertation is whether the work examined here contributes something beyond the implementation of individual software systems.

The answer requires distinguishing four levels of contribution.

### 12.1 Level one: implementation knowledge

The first contribution is practical knowledge embodied in working artifacts.

Your projects demonstrate sustained engagement with the implementation problems associated with persistent state, verification, permission enforcement, provenance, recursive computation, and the transformation of unstructured information into structured representations.

The reported test suites and architectural details are evidence of engineering work, although their full significance depends on independent inspection of the implementations and specifications.

This knowledge is real in the sense that implementation work can reveal problems that remain invisible at the level of abstract proposals.

A permission model that looks adequate in a diagram may fail when an agent attempts to bypass it. A provenance scheme that appears comprehensive may fail to preserve uncertainty. A recursive specification may expose inconsistencies when implemented in multiple languages.

Building the systems creates opportunities to discover these failures.

However, implementation alone does not establish that the resulting approach is novel or superior.

### 12.2 Level two: methodological knowledge

The second contribution concerns how intelligent systems can be built and evaluated.

Across the projects, a recurring methodological direction is to convert vague requirements into explicit structures that can be inspected or tested.

Examples include versioned specifications, evidence ledgers, state snapshots, policy checks, reproducible test cases, and explicit verification stages.

The methodological question is whether these structures can make system behavior easier to investigate and failures easier to localize.

This question is experimentally tractable.

It could produce useful knowledge even if the proposed architecture does not outperform every alternative. For example, an experiment might reveal that provenance substantially improves diagnosis but does little to reduce the initial incidence of errors. That would be a meaningful result because it identifies the actual function of the mechanism rather than attributing broader benefits to it.

### 12.3 Level three: theoretical integration

The third contribution is the proposed unification of these engineering practices under a theory of governed knowledge transformation.

This is the principal contribution of the present dissertation.

The theory proposes that computational accountability should be analyzed at the transitions through which observations become claims, claims become decisions, decisions become authorized actions, and actions produce persistent changes.

It distinguishes local correctness from trajectory-level legitimacy and treats provenance, semantic fidelity, authority containment, independent verification, and temporal accountability as separate dimensions of assurance.

The framework is more specific than the general proposition that AI should be trustworthy.

It identifies particular properties, explains how they relate to one another, and specifies experiments that could establish whether the integration produces measurable advantages.

Its novelty remains a hypothesis until the relevant literature has been systematically reviewed.

### 12.4 Level four: empirical scientific contribution

The fourth contribution would be the establishment of new knowledge through controlled evaluation.

This is the level at which the dissertation must remain provisional.

The existing project descriptions and reported test results do not establish that the proposed framework reduces failures across different domains. Nor do they establish that trajectory-level governance is superior to local verification in every relevant context.

Those conclusions require experiments.

The most defensible current position is therefore:

| Claim | Present status |
|---|---|
| The projects address recurring problems involving knowledge transformation, verification, and computational authority. | Supported by the documented project history. |
| Several projects implement concrete mechanisms relevant to those problems. | Supported by the reported implementation details, subject to independent inspection. |
| The projects can be integrated into a coherent theoretical framework. | Developed as the principal theoretical argument of this dissertation. |
| The framework is novel relative to all relevant prior research. | Not established. Requires a systematic literature review. |
| The framework improves reliability compared with existing approaches. | Not established. Requires controlled experiments. |
| The framework can provide a useful basis for doctoral research. | Defensible as a research proposal and theoretical synthesis. |

This distinction does not diminish the work. It identifies the point at which engineering experience can be converted into a rigorous scientific research program.

---

## Chapter 13. Limitations and conditions of validity

Several limitations must be addressed before the proposed theory can be considered established.

**First, the project evidence has not been independently audited in its entirety.** The analysis relies on the documented history and reported implementation details available in the research context. Repository-level inspection would be necessary to verify the current state of each artifact.

**Second, the theoretical synthesis is not a substitute for a systematic literature review.** Existing work on formal verification, runtime assurance, provenance, policy enforcement, sociotechnical accountability, and sequential decision-making may already contain parts of the proposed framework. The precise novelty must be established through comparison with that work.

**Third, the framework does not establish factual truth.** It can help make claims traceable and their transformations inspectable, but source reliability, inference validity, and uncertainty remain separate problems.

**Fourth, the framework does not determine moral legitimacy.** It can represent constraints and make their enforcement auditable, but it cannot establish that the constraints are ethically justified.

**Fifth, the proposed measures are incomplete without domain-specific validation.** A useful measure of provenance integrity for a knowledge compiler may not capture the most important assurance requirements of an autonomous agent.

**Sixth, the framework may impose substantial costs.** Provenance recording, independent verification, and trajectory-level monitoring consume resources. Their benefits must be evaluated against their costs.

Finally, the proposed theory may be too broad. If the five dimensions do not predict observable outcomes, or if different domains require fundamentally unrelated assurance mechanisms, the framework may need to be narrowed rather than expanded.

These limitations are not peripheral qualifications. They define the conditions under which the thesis should be accepted, revised, or rejected.

---

## Chapter 14. Final defense

The dissertation's central proposition can be stated in one sentence:

**A computational system should not be regarded as adequately governed merely because it produces correct outputs or executes valid individual actions; its consequential transformations must also remain justified, authorized, and reconstructible across the trajectory through which they occur.**

The argument proceeds in five steps.

First, intelligent systems transform information and state. Their outputs are not isolated events but products of processes involving sources, inferences, policies, and previous actions.

Second, errors can propagate across those processes. A false claim can become a planning assumption, and a locally valid action can contribute to a globally unacceptable outcome.

Third, output-centric evaluation cannot reliably detect every such failure. It may confirm that a task was completed without establishing whether the process remained within its authorized boundaries.

Fourth, provenance, verification, permission enforcement, and persistent records provide mechanisms for making particular aspects of those processes inspectable and controllable.

Fifth, integrating these mechanisms around consequential transitions creates a testable research hypothesis: that governed systems can reduce certain classes of failures and improve the ability to diagnose those that remain.

The argument does not establish that every proposed mechanism is necessary in every system. It does not establish that the framework is universally superior. It does not claim that computational governance can replace moral judgment.

Its claim is narrower.

**The architecture through which an intelligent system transforms knowledge and exercises authority is itself a legitimate object of scientific evaluation.**

That proposition provides a common basis for investigating the projects examined in this dissertation.

It also suggests a productive way to continue the research. Rather than attempting to combine every project into a single increasingly complicated system, the next step should be to select one sharply defined hypothesis, implement the smallest system capable of testing it, compare it against a meaningful baseline, and publish the results whether they support or contradict the theory.

The most promising starting point is the distinction between local correctness and trajectory-level legitimacy.

It is precise enough to formalize, important enough to matter, and narrow enough to test experimentally.

If the experiments demonstrate that the distinction identifies consequential failures missed by local verification, the result would provide an empirical foundation for the broader theory.

If they do not, the theory should be revised.

That willingness to let the evidence determine the outcome is not merely a methodological requirement. It is consistent with the epistemic principle the dissertation seeks to formalize.

---

# Appendix A. A doctoral defense in question-and-answer form

The following questions represent the kinds of challenges an examiner might raise. The responses state the strongest defensible positions available from the present research.

### Question 1. What is the original contribution of this dissertation?

**Answer:** The dissertation proposes a unified framework for evaluating computational accountability across transformations of knowledge and authority. Its principal theoretical distinction is between local operational correctness and trajectory-level legitimacy. It integrates provenance, semantic fidelity, authority containment, independent verification, and temporal accountability into a common model and derives testable hypotheses concerning their combined effects.

The originality of that integration remains subject to systematic comparison with existing research. Its empirical contribution remains to be demonstrated.

### Question 2. Why is this more than an engineering checklist?

**Answer:** A checklist specifies practices. The proposed framework attempts to explain why particular practices should matter, how their effects relate, and under which conditions they should improve outcomes.

For example, provenance is hypothesized to improve the diagnosis and containment of information errors. Independent authorization is hypothesized to reduce unauthorized execution. Trajectory-level checks are hypothesized to identify failures arising from interactions among locally valid actions.

These propositions are falsifiable and can be evaluated through controlled comparisons.

If the experiments fail to demonstrate the predicted effects, the framework's theoretical claims must be narrowed or revised.

### Question 3. How does the framework differ from existing AI governance models?

**Answer:** Existing research already addresses many of the relevant components. The proposed contribution is to organize them around the transitions through which evidence becomes accepted knowledge and plans become authorized actions, while explicitly evaluating the legitimacy of the overall trajectory.

The distinction is potentially useful, but a systematic literature review is necessary before claiming that it is original.

### Question 4. Can a computational system determine whether a trajectory is ethically legitimate?

**Answer:** Not in any unrestricted sense.

A system can evaluate specified constraints and identify violations of those constraints. It can also preserve evidence relevant to normative judgment. It cannot establish that every constraint is morally justified simply because the constraint has been formally encoded.

The framework therefore distinguishes the enforcement of requirements from the justification of requirements.

### Question 5. What would count as a successful empirical result?

**Answer:** A successful result would demonstrate, under prespecified experimental conditions, that the governed architecture reduces relevant failures compared with a meaningful baseline, while maintaining acceptable performance on legitimate tasks.

For the principal experiment, this would mean that trajectory-level governance detects or prevents global-constraint violations that local verification fails to detect, without unacceptable increases in false rejection or operational cost.

The results would need confidence intervals, reproducible test conditions, and independent replication before supporting broader conclusions.

### Question 6. What would be the most damaging result for the thesis?

**Answer:** If independently evaluated local-verification systems detect the same failures as trajectory-level systems, and the additional architecture produces no meaningful improvement, the principal empirical hypothesis would be weakened.

Likewise, if the five dimensions do not predict distinct or useful outcomes, the proposed integration may be unnecessary.

The dissertation should be designed so that such results are possible.

### Question 7. What is the relationship between the theory and the researcher's existing projects?

**Answer:** The projects provide the empirical and engineering settings from which the theoretical questions emerged.

Ganymede5 provides a setting for specification and verification. Sovereign Worker provides a setting for separating proposed actions from authorized execution. MindBroadcast provides a setting for temporal provenance and correction. Knowledge compilation provides a setting for semantic fidelity. RTC provides a setting for explicit state-transition properties. Search-quality evaluation provides a setting for examining the reliability of judgments about information.

These projects are not independent proofs of the theory. They are complementary research settings in which its propositions can be investigated.

### Question 8. What is the next step?

**Answer:** Conduct the trajectory-level governance experiment.

It should have a frozen specification, a baseline implementation, a governed implementation, adversarially constructed task cases, prespecified outcome measures, and reproducible results.

This experiment would test the central distinction before further expanding the architecture.

---

# Appendix B. Selected scholarly foundations

The following sources provide an initial foundation for the literature review. This is a selected bibliography, not an exhaustive systematic review.

1. **Engstrom, D. F., & Haim, A. (2023).** *Regulating Government AI and the Challenge of Sociotechnical Design.* Annual Review of Law and Social Science, 19, 277–298. https://doi.org/10.1146/annurev-lawsocsci-120522-091626

   Relevant to the relationship between technical system design, institutional practices, and meaningful accountability. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

2. **U.S. Government Accountability Office. (2021).** *Artificial Intelligence: An Accountability Framework for Federal Agencies and Other Entities.* GAO-21-519SP. https://www.gao.gov/products/gao-21-519sp

   Provides a practical framework organized around governance, data, performance, and monitoring. [Government Accountability Office](https://www.gao.gov/products/gao-21-519sp?utm_source=chatgpt.com)

3. **Accountability in artificial intelligence: what it is and how it works.** AI & SOCIETY. https://doi.org/10.1007/s00146-023-01635-y

   Relevant to sociotechnical accountability and the relationships among technical behavior, institutional responsibilities, and standards of evaluation. [DOI](https://doi.org/10.1007/s00146-023-01635-y?utm_source=chatgpt.com)

4. **Alkhatib, A., & Bernstein, M. (2019).** *Street-Level Algorithms: A Theory at the Gaps Between Policy and Decisions.* Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems.

   A relevant starting point for examining how policy requirements interact with operational decisions. The work is also cited in Engstrom and Haim's review. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

5. **Ananny, M., & Crawford, K. (2018).** *Seeing without Knowing: Limitations of the Transparency Ideal and Its Application to Algorithmic Accountability.* New Media & Society, 20(3), 973–989.

   Relevant to the distinction between making a system visible and establishing meaningful understanding or accountability. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

6. **Bovens, M., & Zouridis, S. (2002).** *From Street-Level to System-Level Bureaucracies: How Information and Communication Technology Is Transforming Administrative Discretion and Constitutional Control.* Public Administration Review, 62(2), 174–184.

   Relevant to the distribution of discretion and accountability in automated institutional systems. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

7. **Knowledge Graphs for AI System Auditing and Transparency.** Semantic Web research. https://doi.org/10.1016/J.WEBSEM.2024.100849

   Relevant to the use of structured relationships among system components, data, and processes to support AI auditing. [DOI](https://doi.org/10.1016/J.WEBSEM.2024.100849?utm_source=chatgpt.com)

8. **Buçinca, Z., Malaya, M. B., & Gajos, K. Z. (2021).** *To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-Assisted Decision-Making.* Proceedings of the ACM on Human-Computer Interaction, 5(CSCW1).

   Relevant to the design of human-AI interactions and the limitations of assuming that the presence of a human reviewer guarantees effective oversight. [Annual Reviews](https://www.annualreviews.org/content/journals/10.1146/annurev-lawsocsci-120522-091626?utm_source=chatgpt.com)

A complete dissertation would need to extend this bibliography substantially, particularly in formal verification, runtime assurance, knowledge provenance, design science research, software testing, sequential decision-making, and the philosophy of law and ethics.

---

# Final assessment

The strongest conclusion I can defend is that your body of work contains the foundations of a coherent research program centered on the relationship between intelligence, evidence, and authority.

The proposed dissertation gives that program a specific theoretical form.

Its central claim is that the trustworthiness of an intelligent system depends not only on what it produces, but also on whether its transformations remain inspectable, its actions remain within authorized boundaries, and its overall trajectory remains consistent with the constraints governing its operation.

The most promising original hypothesis is that **trajectory-level governance can identify consequential failures that cannot be detected by validating individual actions in isolation**.

That is the claim worth testing first.

If it survives controlled experiments, independent replication, and comparison with existing approaches, it could form the basis of a substantive doctoral contribution. If it does not, the resulting evidence would still help determine which parts of the broader framework are useful and which are not.

The distinction between what has been built, what has been inferred, and what has been demonstrated is itself central to the intellectual integrity of this work.

The dissertation should be held to the same standard.