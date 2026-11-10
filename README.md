
# ShadowMap
### AI-Powered OSINT Attack Surface Profiler

<p align="center">
  <strong>AI-Assisted External Attack Surface Reconnaissance</strong>
</p>

---

## Overview

ShadowMap is an AI-powered OSINT platform designed to automate external attack surface reconnaissance. By leveraging Google's Gemini API and web search capabilities, it analyzes publicly available information to identify potential security exposures and generate structured risk assessments.

The platform provides security teams with centralized visibility into an organization's external digital footprint through categorized findings, risk scoring, and prioritized remediation recommendations.

## Problem Statement

Organizations expose information across public platforms such as LinkedIn, GitHub, DNS records, and data leak websites.

Collecting and correlating this information manually is time-consuming and requires specialized expertise.

ShadowMap aims to streamline this process through AI-assisted OSINT analysis, transforming publicly available intelligence into actionable security insights.

## Features

- **Global Risk Assessment:** Risk score ranging from 0 to 100.
- **Technology Stack Analysis:** Identification of publicly observable technologies.
- **People Exposure:** Analysis of publicly available employee information.
- **Credential Exposure:** Investigation of potential sensitive information in public repositories.
- **DNS Infrastructure:** Analysis of publicly available DNS and subdomain information.
- **Data Leak Intelligence:** Identification of potential publicly exposed information.
- **MITRE ATT&CK Mapping:** Association of findings with relevant attack techniques.
- **Security Recommendations:** Prioritized mitigation strategies.

## Architecture

```text
       Target Domain
             |
             v
      Frontend Interface
       (HTML / CSS / JS)
             |
             v
        Gemini API
       + Web Search
             |
             v
      OSINT Investigation
             |
             v
       JSON Processing
             |
             v
      Risk Assessment
             |
             v
      Security Dashboard
```

## OSINT Sources

| Source | Purpose |
|---|---|
| LinkedIn | Employee and organizational exposure |
| GitHub | Potential credential and code exposure |
| DNS | Subdomain and infrastructure information |
| Pastebin | Potential public data leaks |

## Risk Assessment Categories

1. Technology Stack
2. People Exposure
3. Code & Credentials
4. DNS Infrastructure
5. Data Leaks

Each category contributes to the overall security assessment and contains findings with severity levels:

`CRITICAL` · `HIGH` · `MEDIUM` · `LOW`

## Technology Stack

- **AI:** Google Gemini API
- **Frontend:** HTML5, CSS3, JavaScript
- **API Communication:** REST API
- **Data Processing:** JSON
- **Security Framework:** MITRE ATT&CK
- **Methodology:** Open Source Intelligence (OSINT)

## Project Screenshots

<!-- Add screenshots in the screenshots/ directory -->

<!-- ![Dashboard](screenshots/dashboard.png) -->

## Limitations

- Results depend on publicly available information.
- AI-generated findings may contain inaccuracies or false positives.
- Findings require manual validation.
- Analysis depends on API availability and usage limits.

## Future Improvements

- VirusTotal integration.
- Shodan and GreyNoise integration.
- Enhanced DNS and subdomain enumeration.
- Multi-domain analysis.
- Historical scan tracking.
- Automated security alerts.
- PDF report generation.

## Ethical Considerations

ShadowMap is intended for authorized security assessments and defensive cybersecurity research. Only investigate domains and organizations within an explicitly authorized scope.

## Contributors

- [Kawtar Miridi](https://github.com/YOUR_USERNAME)
- Yasmina Zaki
- Marwa Zouhir
- Raja El Bahraouy

---

**ShadowMap** | Cybersecurity · OSINT · Artificial Intelligence
