# Security policy

Please report vulnerabilities privately using this repository's **Security → Report a vulnerability** feature. Do not put credentials, personal information, lead data, or exploit details in public issues.

If private reporting is unavailable, use the contact page at [khadafidaffa.com](https://khadafidaffa.com/about) to request a secure reporting channel. No response-time or bounty commitments are implied.

## Responsible testing

- Use your own test account and an isolated development environment.
- Do not access or modify another person's records, contact leads, or disrupt services.
- Provide the affected route, expected and observed behavior, and a minimal reproduction privately.

## Maintainer practices

- Keep environment files, private keys, credentials, customer records, and generated diagnostics out of Git.
- Enforce authentication, ownership checks, and database policies on the server.
- Review dependency updates and run relevant checks before deployment.
- Rotate any credential suspected of exposure; removing it from a current file does not remove Git history.

Automated scanning and this policy do not replace a security review.
