# Ceilgas — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Smart-contract developer

- As a developer, I want parametric gas bounds for each public function after compile, so that I know which loops will become unsafe as arrays grow.
- As a developer, I want CI to fail when a function is non-constant gas without an approved exception, so that safety recommendations are enforced as policy.
- As a developer, I want an explicit error when the analyser cannot prove a bound, so that I do not ship with a false sense of safety.

### Protocol SRE

- As an SRE, I want to recompute recommended gas as on-chain state metrics change, so that callbacks do not brick when participation grows.
- As an SRE, I want alerts when live state approaches the size assumptions used in the last certificate, so that we migrate or paginate before out-of-gas.

### Oracle integrator

- As an oracle integrator, I want a certified callback gas stipend for my `__callback`-style entrypoint, so that authenticity proofs and payouts complete under load.

### Security auditor

- As an auditor, I want incompleteness classes itemised per function, so that residual risk is documented rather than hidden in “analysed = safe.”
- As an auditor, I want bytecode-bound certificates, so that the report cannot be reused for a different build.

### Platform administrator

- As a platform administrator, I want to pin analyser and gas-schedule versions per workspace, so that results do not drift silently across Istanbul/London-class schedule changes.
- As a compliance officer, I want role gates on adversarial griefing estimates, so that the tool is not casually used as an attack planner by unprivileged users.
