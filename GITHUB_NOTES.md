# GitHub Notes

This repository is pushed to:

```text
https://github.com/khw1085-lgtm/agency.git
```

Use the `khw1085-lgtm` GitHub account for this repository.

The `PDBilly` account is also used on this machine, but it does not have push permission for this repository. If a push fails with a permission error mentioning `PDBilly`, the terminal GitHub credentials are using the wrong account.

## Before Pushing

Check the current repository and login state:

```bash
git remote -v
gh auth status
git status --short --branch
```

Expected remote:

```text
origin  https://github.com/khw1085-lgtm/agency.git
```

Expected account for this repo:

```text
khw1085-lgtm
```

## If Login Is Confused

Remove the wrong or broken CLI auth entries, then log in again as `khw1085-lgtm`:

```bash
gh auth logout -h github.com -u PDBilly
gh auth logout -h github.com -u khw1085-lgtm
gh auth login -h github.com -w
```

During the browser/device login flow, approve the login using the `khw1085-lgtm` account.

## Push Command

Normal push:

```bash
git push origin main
```

If GitHub disconnects during upload with an HTTP/RPC error, use the command that worked for this repo:

```bash
git -c http.version=HTTP/1.1 -c http.postBuffer=157286400 push --verbose origin main
```

## Backup Reminder

Local backups may be stored in:

```text
backups/
```

Do not commit backup archives unless explicitly requested.
