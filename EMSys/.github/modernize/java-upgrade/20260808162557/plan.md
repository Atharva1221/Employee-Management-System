n# Upgrade Plan: EMSys (20260808162557)

- **Generated**: 2026-08-08 16:25:57
- **HEAD Branch**: master
- **HEAD Commit ID**: N/A

## Available Tools

**JDKs**
- JDK 25.0.2: F:\Software\JDK\bin (available, required by steps 1, 3, 4)
- JDK 21: not available (baseline will be skipped)

**Build Tools**
- Maven Wrapper: 3.9.11 (`.mvn/wrapper/maven-wrapper.properties`) (current, compatible with Java 25)
- System Maven: not available

## Guidelines

> Note: You can add any specific guidelines or constraints for the upgrade process here if needed, bullet points are preferred.

## Options

- Working branch: appmod/java-upgrade-20260808162557
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade Java runtime to latest LTS: 25

## Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------------------------------------- |
| Java | 21 | 25 | User requested latest LTS runtime |
| Spring Boot Starter Parent | 3.5.5 | 3.5.5 | Compatible with Java 25 and no Spring Boot upgrade required |
| Maven Wrapper | 3.9.11 | 3.9.0 | Compatible with Java 25; wrapper available |
| maven-compiler-plugin | managed by Spring Boot parent | 3.11.0 | Recommended for Java 25 support; managed version is expected to be compatible |
| org.springframework.boot:spring-boot-starter-data-jpa | 3.5.5 (managed) | 3.5.5 | No direct upgrade required for Java 25, compile-time verification required |
| org.springframework.boot:spring-boot-starter-web | 3.5.5 (managed) | 3.5.5 | No direct upgrade required for Java 25, compile-time verification required |

## Derived Upgrades

- Upgrade project runtime configuration from Java 21 to Java 25 in `pom.xml` because the user requested the latest LTS.
- Keep Spring Boot at 3.5.5 because it is already compatible with Java 25 and no Spring Boot upgrade was requested.
- Use Maven Wrapper 3.9.11 for build execution since system Maven is unavailable.

## Impact Analysis

### Dependency Changes

| File | Dependency | Current | Action | Target | Reason |
|------|-----------|---------|--------|--------|--------|
| pom.xml | `<java.version>` | 21 | upgrade | 25 | Upgrade runtime target to latest LTS |

### Source Code Changes

| File | Location | Current | Required Change | Reason |
|------|----------|---------|----------------|--------|
| None identified | N/A | N/A | N/A | No code-level Java 25 compatibility issues detected in source scan |

### Configuration Changes

| File | Property/Setting | Current | Required Change | Reason |
|------|------------------|---------|----------------|--------|
| None identified | N/A | N/A | N/A | No application property changes required for Java runtime upgrade |

### CI/CD Changes

| File | Location | Current | Required Change |
|------|----------|---------|----------------|
| None detected | N/A | N/A | N/A |

### Risks & Warnings

- **Baseline JDK mismatch**: Current project declares Java 21 but system only has JDK 25 installed. Baseline with Java 21 will be skipped; compile and test will be performed on the available Java 25 runtime.
- **Spring Boot 3.5.5 Java 25 compatibility**: The dependency stack is expected to be compatible but relies on actual compile/test verification because Java 25 is newer than the default target for many libraries.
- **Runtime-only issues**: No static JDK-internal imports or reflection patterns were detected, but untested runtime paths may still expose Java 25 behavior differences. Full test execution is required.

## Upgrade Steps

- Step 1: Setup Environment
  - **Rationale**: Confirm the available Java 25 runtime and Maven wrapper before making project changes.
  - **Changes to Make**: None to project files.
  - **Verification**: `./mvnw.cmd -q -version` and `java -version`

- Step 2: Baseline Validation
  - **Rationale**: The current POM targets Java 21, but the matching JDK is not installed. Skip baseline to avoid invalid JDK assumptions.
  - **Changes to Make**: None.
  - **Verification**: skipped because JDK 21 is not available

- Step 3: Upgrade Java Runtime Target
  - **Rationale**: Apply the requested runtime upgrade by updating the project Java version property.
  - **Changes to Make**: Update `pom.xml` `<java.version>` from `21` to `25`.
  - **Verification**: `./mvnw.cmd -q clean test-compile`

- Step 4: CVE Validation & Fix
  - **Rationale**: Scan direct dependencies for known vulnerabilities and fix any reported issues before final validation.
  - **Changes to Make**: Update direct dependency versions if CVEs are reported.
  - **Verification**: direct dependency scan and `./mvnw.cmd -q clean test-compile`

- Step 5: Final Validation
  - **Rationale**: Confirm the Java 25 upgrade succeeds with a clean build and full test pass.
  - **Changes to Make**: None beyond previous steps.
  - **Verification**: `./mvnw.cmd -q clean test`
